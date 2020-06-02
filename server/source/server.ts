import express from 'express';

const server = express();

server.get('/users', (request, response) => {
    console.log('Listagem de usuários');

    response.json([
        'Arthur',
        'Carol',
        'Felipe',
        'Karen',
        'Giovana'
    ]);
});

server.listen(3000);