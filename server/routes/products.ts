import express, {
  Request,
  Response,
  Router,
} from 'express';
import {
  checkIfProductExsists,
  connectToDB,
  getAllProductsFromDB,
  updateProduct,
} from '../service';
import { ResToApp } from './users';
import { ObjectId } from 'mongodb';

export interface Product {
  id: string;
  name: string;
  brand: string;
  model: string;
  ean: number;
  price: number;
  amount: number;
  category: string;
  subcategory: string;
  description: string;
}

const router = Router();

router.get(
  '/',
  async (
    req: Request,
    res: Response<{ products: Product[] }>
  ) => {
    const client = await connectToDB();

    const products = await getAllProductsFromDB(
      client
    );

    return res.json({
      products,
    });
  }
);

router.post(
  '/add',
  async (
    req: Request<Product>,
    res: Response<ResToApp>
  ) => {
    const newProduct = req.body;
    const client = await connectToDB();
    const isAdded = await checkIfProductExsists(
      client,
      {
        ean: newProduct.ean,
      }
    );

    !isAdded &&
      (await client
        .db('color-cart')
        .collection<Product>('products')
        .insertOne({
          _id: new ObjectId().toString(),
          id: new ObjectId().toString(),
          ...newProduct,
        }));

    isAdded
      ? res.json({
          msg: 'This product exists already',
          status: 401,
        })
      : res.json({
          msg: 'Product added successfully',
          status: 200,
        });
  }
);

router.patch(
  '/update',
  async (
    req: Request,
    res: Response<ResToApp>
  ) => {
    const updatedProduct = req.body as Product;

    const client = await connectToDB();
    await updateProduct(client, updatedProduct);

    res.json({
      msg: 'Product updated successfully',
      status: 200,
    });
  }
);

router.delete(
  '/remove',
  async (
    req: Request<{ id: string; ean: number }>,
    res: Response<ResToApp>
  ) => {
    const client = await connectToDB();
    client
      .db('color-cart')
      .collection('products')
      .deleteOne({
        id: req.body.id,
      });

    (await checkIfProductExsists(
      client,
      req.body
    ))
      ? res.json({
          msg: 'Something went wrong',
          status: 400,
        })
      : res.json({
          msg: 'Product removed successfully!',
          status: 200,
        });
  }
);

export default router;
