import fastify from "fastify";
import crypto from "node:crypto"
import { knex } from "./database";


const app = fastify();

//GET, POST, PUT, PATCH, DELETE

// https://localhost:3333/hello

app.get('/hello', async () => {
    const transactions = await knex('transactions').insert({
        id: crypto.randomUUID(),
        title: 'Transaçao de texte',
        amount: 1000,
    }).returning('*')

    return transactions
})

app.get('/busca', async () => {
    const transactionss = await knex('transactions').select('*')

    return transactionss
})

app.listen({
    port: 3333,
}).then(() => {
    console.log('HTTP Server Running!')
})