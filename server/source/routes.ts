import express, { request } from 'express';
import knex from './database/connection';

// Controllers Import
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/itemsController';

// listAll, listSingle, create, update, delete

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

routes.get('/items', itemsController.listAllItems);
routes.post('/points', pointsController.create);

export default routes;