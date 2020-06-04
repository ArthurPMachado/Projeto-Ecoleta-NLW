import express, { request } from 'express';

// Controllers Import
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/itemsController';

// listAll, listSingle, create, update, delete

const routes = express.Router();
const pointsController = new PointsController();
const itemsController = new ItemsController();

// GET Routes
routes.get('/items', itemsController.listAll);
routes.get('/points/:id', pointsController.listSingle);


// POST Routes
routes.post('/points', pointsController.create);


// PUT Routes



// DELETE Routes


export default routes;