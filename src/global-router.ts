import { Router } from 'express';
import authRouter from './auth/auth-router';
import testMindRouter from './test/route';

const globalRouter = Router();

globalRouter.use(authRouter);
globalRouter.use(testMindRouter)
export default globalRouter;
