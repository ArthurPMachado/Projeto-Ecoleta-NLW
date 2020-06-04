import knex from '../database/connection';
import { Request, Response } from 'express';

export default class ItemsController {
    async listAllItems(request: Request, response: Response) {
        const items = await knex('items').select('*'); 
    
        const serilizedItems = items.map(item => {
            return {
                id: item.id,
                title: item.titulo,
                image_url: `http://localhost:3300/uploads/${item.imagem}`
            }
        })
    
        return response.json(serilizedItems);
    }
}