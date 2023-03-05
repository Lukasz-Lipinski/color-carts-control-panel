import express, {
  Request,
  Response,
} from 'express';
import userRoutes from './routes/users';
import productsRoutes from './routes/products';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(
  cors(),
  bodyParser.urlencoded({ extended: true }),
  bodyParser.json()
);
app.use(
  express.static(
    path.join(
      process.cwd(),
      '/dist/color-carts-control-panel'
    )
  )
);

//Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productsRoutes);

// app.get('/', (req: Request, res: Response) => {
//   return res.json({ greet: 'Helo!' });
// });

app.get('**', (req: Request, res: Response) => {
  return res.sendFile(
    path.join(
      process.cwd(),
      '/dist/color-carts-control-panel/index.html'
    ),
    (err) => {
      console.log(err);
    }
  );
});

app.listen(PORT, () => {
  console.log('It works at ' + PORT);
});
