import express, { request } from 'express';
import multer from 'multer';
import MulterConfig from './config/multer';

// Controllers Import
import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

// listAll, listSingle, create, update, delete

const routes = express.Router();
const upload = multer(MulterConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();

// GET Routes
routes.get('/items', itemsController.listAll);
routes.get('/points', pointsController.listAll);
routes.get('/points/:id', pointsController.listSingle);


// POST Routes
routes.post('/points', upload.single('imagem'), pointsController.create);


// PUT Routes



// DELETE Routes


export default routes;