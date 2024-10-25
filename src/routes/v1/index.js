import express from 'express';
import { StatusCodes } from 'http-status-codes';
import { boardRouters } from './boardRoutes';

const Router = express.Router();

Router.get('/status', (req, res) => {
    res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use.' });
});

Router.use('/boards', boardRouters)
export const APIs_V1 = Router;
