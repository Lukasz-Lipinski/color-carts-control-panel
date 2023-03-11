import {
  BackendRes,
  NewUser,
  UserData,
} from '../components/auth/auth.service';
import {
  Category,
  Field,
} from '../components/create-product-form/create-product.service';
import { ModalDetails } from '../components/modal/modal.component';
import { Link } from '../components/navigation/navigation.service';
import { PasswordFields } from '../components/password-form/password-form.service';
import { Product } from '../components/products-list/product-item/product-item.component';
import { UserDataEmitterProps } from '../components/update-user-data-from/update-user-data-from.component';
import { UpdateUserFormProps } from '../components/update-user-data-from/update-user-data.service';

export const mockedUser: NewUser = {
  email: 'test@email.com',
  name: 'test-name',
  password: 'test-password',
};

export const mockedEmitterData: UserDataEmitterProps =
  {
    newData: mockedUser,
    confirmingPassword: 'test12435',
  };

export const mockedUpdateUserFields: UpdateUserFormProps[] =
  [
    {
      name: 'test',
      type: 'text',
      placeholder: 'test',
    },
  ];

export const mockedPasswordFields: PasswordFields[] =
  [
    {
      paragraph: 'Test',
      formControl: 'test',
      placeholder: 'test',
      type: 'password',
      hidden: true,
    },
  ];

export const mockedProduct: Product = {
  name: 'test',
  brand: 'test',
  ean: 1324,
  price: 44,
  amount: 12,
  model: 'test',
  category: 'test',
  subcategory: 'test',
  description: 'test',
};

export const mockedRes: BackendRes = {
  msg: 'success',
  status: 200,
};

export const mockedLinks: Link[] = [
  {
    href: 'test',
    label: 'test',
    icon: 'test-icon',
  },
];

export const mockedUserData: UserData = {
  email: 'test@test.com',
  isLogged: true,
  name: 'Test',
};

export const mockedProducts: Product[] = [
  {
    amount: 1,
    brand: 'brand product 1',
    category: 'brand category 1',
    description: 'super extra-ordinary product',
    ean: 123412432134,
    model: 'test 1',
    name: 'Product ',
    price: 23.33,
    subcategory: 'sub category product 1',
  },
  {
    amount: 3,
    brand: 'brand product 2',
    category: 'brand category 12',
    model: 'test 2',
    description: 'super extra-ordinary product 2',
    ean: 434341,
    name: 'Product 2',
    price: 434.33,
    subcategory: 'sub category product 2',
  },
  {
    amount: 6,
    brand: 'brand product 3',
    category: 'brand category 3',
    description: 'super extra-ordinary product 3',
    ean: 73847291,
    model: 'test 3',
    name: 'Product 3',
    price: 12.43,
    subcategory: 'sub category product 3',
  },
];

export const details: BackendRes = {
  msg: 'test',
  status: 200,
};

export const mockedSubcategories: string[] = [
  'subcategory1',
  'subcategory2',
];

export const mockedCategories: Category[] = [
  {
    mainCategory: 'test-category-1',
    subcategories: mockedSubcategories,
  },
];

export const mockedModal: ModalDetails = {
  title: 'modal-test',
};

export const mockedFields: Field[] = [
  {
    label: 'product name',
    name: 'name',
    type: 'text',
  },
];
