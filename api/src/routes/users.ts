import express from 'express';
const usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/', function (req, res) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  res.send('respond with a resource');
});

export default usersRouter;
