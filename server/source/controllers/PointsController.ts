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
            imagem: request.file.filename,
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
    
        const pointItems = items
                              .split(',')
                              .map((item: string) => Number(item.trim()))
                              .map((item_id: number) => {
            return {
                item_id,
                point_id
            };
        });
    
        await transaction('point_items').insert(pointItems);
    
        await transaction.commit();

        return response.json({
            id: point_id,
            ...point
         });
    }

    async listSingle(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('points').where('id', id).first();

        if(!point) {
            return response.status(400).json({ message: 'Point not found.'});
        }
        
        const serilizedPoint = {
          ...point,
          image_url: `http://192.168.1.101:3300/uploads/${point.imagem}`
        };
        
        const items = await knex('items')
            .join('point_items', 'items.id', '=', 'point_items.item_id')
            .where('point_items.point_id', id)
            .select('items.titulo');


        return response.json({ point: serilizedPoint, items });
    }
    
    async listAll(request: Request, response: Response) {
        const { cidade, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex('points')
            .join('point_items', 'points.id', '=', 'point_items.point_id')
            .whereIn('point_items.item_id', parsedItems)
            .where('cidade', String(cidade))
            .where('uf', String(uf))
            .distinct()
            .select('points.*');

        const serilizedPoints = points.map(point => {
          return {
            ...point,
            image_url: `http://192.168.1.101:3300/uploads/${point.imagem}`
          }
        });
      
        return response.json(serilizedPoints);
    }
}