import dotenv from 'dotenv';

import express from 'express';
import userRouter from './src/routes/userRoute';
import authRouter from './src/routes/authRoute';
import toolRouter from './src/routes/toolRoute';

import './src/database/index';

dotenv.config();

class App {
  constructor() {
    this.app = express();
    this.middleware();
    this.routes();
  }

  middleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/users/', userRouter);
    this.app.use('/auth/', authRouter);
    this.app.use('/tools/', toolRouter);
  }
}

export default new App().app;
