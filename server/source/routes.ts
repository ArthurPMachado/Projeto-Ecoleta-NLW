import express, { request } from 'express';
import multer from 'multer';
import MulterConfig from './config/multer';
import { celebrate, Joi } from 'celebrate';

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
routes.post(
  '/points', 
  upload.single('imagem'), 
  celebrate({
    body: Joi.object().keys({
      nome: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required(),
      latitude: Joi.number().required(),
      longitude: Joi.number().required(),
      cidade: Joi.string().required(),
      uf: Joi.string().required().max(2),
      items: Joi.string()
    })
  }, {
    abortEarly: false
  }),
  pointsController.create
);


// PUT Routes



// DELETE Routes


export default routes;