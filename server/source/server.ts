import express, { request, response } from 'express';

const server = express();

server.use(express.json());

const users = [
    'Arthur',
    'Carol',
    'Felipe',
    'Karen',
    'Giovana'
];

server.get('/users', (request, response) => {
    const search = String(request.query.search);

    const filterUsers = search ? users.filter(user => user.includes(search)) : users;

    return response.json(filterUsers);
});

server.get('/users/:id', (request, response) => {
    const id = Number(request.params.id);

    const user = users[id];

    return response.json(user);
});

server.post('/users', (request, response) => {
    const data = request.body;

    console.log(data);

    const user = {
        name: data.name,
        surname: data.surname,
        email: data.email,
        age: data.age
    }

    return response.json(user);
})

server.listen(3300);