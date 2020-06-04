import express, { request } from 'express';
import knex from './database/connection';

const routes = express.Router();

routes.get('/items', async (request, response) => {
    const items = await knex('items').select('*'); 

    const serilizedItems = items.map(item => {
        return {
            title: item.titulo,
            image_url: `http://localhost:3300/uploads/${item.imagem}`
        }
    })

    return response.json(serilizedItems);
});

routes.post('/points', async (request, response) => {
    const {
        nome,
        email,
        whatsapp,
        latitude,
        longitude,
        cidade,
        uf,
        items
    } = request.body;

    await knex('points').insert({
        image: 'image-tmp',
        nome,
        email,
        whatsapp,
        latitude,
        longitude,
        cidade,
        uf
    })
});

export default routes;