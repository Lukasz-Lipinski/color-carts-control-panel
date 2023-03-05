import { MongoClient, ObjectId } from 'mongodb';
import { User } from '../routes/users';
import { compare } from 'bcryptjs';
import { Product } from '../routes/products';

export async function connectToDB() {
  return new MongoClient(
    `${process.env.DB_API}`
  ).connect();
}

export async function getUsersFromDB(
  client: MongoClient
) {
  return await client
    .db('color-cart')
    .collection<User>('admins')
    .find()
    .toArray();
}

export async function getAllProductsFromDB(
  client: MongoClient
) {
  return await client
    .db('color-cart')
    .collection<Product>('products')
    .find()
    .toArray();
}

export async function saveUserData(
  client: MongoClient,
  user: User
) {}

export async function findUser(
  client: MongoClient,
  user: User
) {
  const users = (await getUsersFromDB(
    client
  )) as User[];

  return users.find(
    (data) =>
      data.email === user.email &&
      data.name === user.name
  );
}

export async function comparePassword(
  user: User,
  foundUser: User
) {
  return await compare(
    user.password,
    foundUser.password
  );
}

export async function checkIfProductExsists(
  client: MongoClient,
  details: { id?: string; ean: number }
) {
  const allProducts = (await getAllProductsFromDB(
    client
  )) as Product[];

  return details.id
    ? allProducts.find(
        (product) =>
          product.ean === details.ean &&
          product.id === details.id
      )
    : allProducts.find(
        (product) => product.ean === details.ean
      );
}

export const updateProduct = async (
  client: MongoClient,
  updatedProduct: Product
) => {
  client
    .db('color-cart')
    .collection('products')
    .updateOne(
      {
        id: updatedProduct.id,
        ean: updatedProduct.ean,
      },
      {
        $set: {
          ...updatedProduct,
        },
      },
      {
        upsert: true,
      }
    );
};
