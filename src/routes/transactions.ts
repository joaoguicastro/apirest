import { FastifyInstance } from "fastify"
import { knex } from "../database"

export async function transactionsRoutes(app: FastifyInstance){
    app.get('/hello', async () => {
        const transactions = await knex('transactions').insert({
            id: crypto.randomUUID(),
            title: 'Transaçao de texte',
            amount: 1000,
        }).returning('*')
    
        return transactions
    })
}