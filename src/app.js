import express from 'express';
import cors from 'cors';

import catRouter from './api/routes/cat-router.js';
import userRouter from './api/routes/user-router.js';
import authRouter from './api/routes/auth-router.js';
import { notFoundHandler, errorHandler } from './middlewares/error-handlers.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api/v1/cats', catRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use(notFoundHandler);

app.use(errorHandler);

export default app;
