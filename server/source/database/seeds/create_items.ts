import Knex from 'knex';

export async function seed(knex: Knex) {
    knex("items").insert([
        { title: 'Lâmpadas', image: 'lampadas.svg'},
        { title: 'Lâmpadas', image: 'lampadas.svg'}
    ])
}