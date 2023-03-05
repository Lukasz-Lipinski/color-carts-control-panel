import express, {
  Request,
  Response,
  Router,
} from 'express';
import {
  compare,
  genSaltSync,
  hash,
} from 'bcryptjs';
import {
  findUser,
  connectToDB,
  comparePassword,
} from '../service';

const salt = genSaltSync();

export interface User {
  email: string;
  password: string;
  name: string;
}

export interface ResToApp {
  status: number;
  msg: string;
}

const router = Router();

router.get('/', (req: Request, res: Response) => {
  return res.json({ msg: 'hello' });
});

router.post(
  '/login',
  async (
    req: Request<User>,
    res: Response<ResToApp>
  ) => {
    const user = req.body;

    const client = await connectToDB();
    const isFoundUser = await findUser(
      client,
      user
    );

    isFoundUser &&
      (await comparePassword(
        user,
        isFoundUser
      )) &&
      res.json({
        status: 200,
        msg: 'User logged successfully',
      });

    !isFoundUser &&
      res.json({
        msg: 'Invalid data',
        status: 402,
      });
  }
);

router.post(
  '/registration',
  async (
    req: Request<User>,
    res: Response<ResToApp>
  ) => {
    const user = req.body;
    const client = await connectToDB();

    (await findUser(client, user)) &&
      res.json({
        msg: 'User already exsists',
        status: 401,
      });

    if (!(await findUser(client, user))) {
      const hashedPassword = await hash(
        user.password,
        salt
      );

      await client
        .db('color-cart')
        .collection('admins')
        .insertOne({
          ...user,
          password: hashedPassword,
        });

      res.json({
        msg: 'An account created successfully',
        status: 200,
      });
    }
  }
);

export default router;
