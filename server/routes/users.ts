import express, {
  Request,
  Response,
  Router,
} from 'express';
import {
  genSaltSync,
  hash,
  hashSync,
} from 'bcryptjs';
import {
  findUser,
  connectToDB,
  comparePassword,
} from '../service';
import { connect } from 'http2';

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

    client.close();
    return;
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

      await client.close();

      return res.json({
        msg: 'An account created successfully',
        status: 200,
      });
    }
  }
);

interface PasswordBodyRequest {
  newPassword: string;
  currPassword: string;
  user: User;
}

router.put(
  '/update/password',
  async (
    req: Request<any, any, PasswordBodyRequest>,
    res: Response<ResToApp>
  ) => {
    const { currPassword, newPassword, user } =
      req.body;

    const client = await connectToDB();
    const foundUser = await findUser(
      client,
      user
    );

    if (
      await comparePassword(
        {
          ...user,
          password: currPassword,
        },
        foundUser
      )
    ) {
      await client
        .db('color-cart')
        .collection('admins')
        .updateOne(
          {
            email: foundUser.email,
            name: foundUser.name,
          },
          {
            $set: {
              password: await hash(
                newPassword,
                salt
              ),
            },
          }
        );

      client.close();

      return res.json({
        msg: 'Successful',
        status: 200,
      });
    }

    client.close();
    return res.json({
      msg: 'Invalid password',
      status: 401,
    });
  }
);

interface UserDataBody {
  user: User;
  newData: User;
  password: string;
}

router.put(
  '/update/user-data',
  (
    req: Request<any, any, UserDataBody>,
    res: Response<ResToApp>
  ) => {
    const { user, newData, password } = req.body;
  }
);

export default router;
