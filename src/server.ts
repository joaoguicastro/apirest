import fastify from "fastify";
import crypto from "node:crypto"
import { knex } from "./database";
import { env } from "./env";
import { transactionsRoutes } from "./routes/transactions";


const app = fastify();

//GET, POST, PUT, PATCH, DELETE

// https://localhost:3333/hello

app.register(transactionsRoutes, {
    prefix: 'transactions'
})

app.get('/busca', async () => {
    const transactionss = await knex('transactions').select('*')

    return transactionss
})

app.listen({
    port: env.PORT,
}).then(() => {
    console.log('HTTP Server Running!')
})