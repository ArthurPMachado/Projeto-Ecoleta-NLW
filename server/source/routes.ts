import express, { request } from 'express';
import knex from './database/connection';

const routes = express.Router();

routes.get('/items', async (request, response) => {
    const items = await knex('items').select('*'); 

    const serilizedItems = items.map(item => {
        return {
            id: item.id,
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

    // const nome = request.body.nome;
    // const email = request.body.email;

    const insertedIds = await knex('points').insert({
        imagem: 'image-tmp',
        nome,
        email,
        whatsapp,
        latitude,
        longitude,
        cidade,
        uf
    });

    const point_id = insertedIds[0];

    const pointItems = items.map((item_id: number) => {
        return {
            item_id,
            point_id
        };
    });

    await knex('point_items').insert(pointItems);

    return response.json({ success: true })
});

export default routes;