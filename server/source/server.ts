import express from 'express';

const server = express();

server.get('/users', () => {
    console.log('Listagem de usuários')
});

server.listen(3000);