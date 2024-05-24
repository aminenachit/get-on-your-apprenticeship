import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import realRouter from '../src/routes/real';
import userRouter from '../src/routes/users';
import errorHandler from '../src/error-handler'; 
const app = express();

app.use(cors());
app.use(express.json());
app.use('/real', realRouter);
app.use('/users', userRouter);

app.use(errorHandler);

if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports.handler = serverless(app);
