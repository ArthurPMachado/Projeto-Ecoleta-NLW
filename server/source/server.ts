import express, { request, response } from 'express';

const server = express();

// Rota: endereço completo da requisição
// Recursos: qual entidade estamos acessando do sistema

const users = [
    'Arthur',
    'Carol',
    'Felipe',
    'Karen',
    'Giovana'
];

server.get('/users', (request, response) => {
    console.log('Listagem de usuários');

    response.json(users);
});

server.get('/users/:id', (request, response) => {
    const id = Number(request.params.id);

    const user = users[id];

    return response.json(user);
});

server.post('/users', (request, response) => {
    const user = {
        name: 'Arthur',
        surname: 'Machado',
        email: 'arthurpereiramachado01@gmail.com',
        age: 20
    }

    return response.json(user);
})

server.listen(3300);