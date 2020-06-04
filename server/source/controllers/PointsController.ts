import knex from '../database/connection';
import { Request, Response } from 'express';

export default class PointsController {
    async create(request: Request, response: Response) {
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
    
        const transaction = await knex.transaction();

        const point = {
            imagem: 'image-tmp',
            nome,
            email,
            whatsapp,
            latitude,
            longitude,
            cidade,
            uf
        }
    
        const insertedIds = await transaction('points').insert(point);
    
        const point_id = insertedIds[0];
    
        const pointItems = items.map((item_id: number) => {
            return {
                item_id,
                point_id
            };
        });
    
        await transaction('point_items').insert(pointItems);
    
        return response.json({
            id: point_id,
            ...point
         });
    }
}