import { FastifyInstance } from "fastify"
import { z } from 'zod'
import { knex } from "../database"
import { randomUUID } from "node:crypto"

// Request Body

export async function transactionsRoutes(app: FastifyInstance){
    app.get('/summary', async () => {
        const summary = await knex('transactions').sum('amount', { as: 'amount' })

        return {summary}
    })

    app.get('/', async (req, res) => {
        const transactions = await knex('transactions').select()

        return { transactions }
    })

    app.get('/:id', async (request) => {
        const getTransactionsParamsSchame = z.object({
            id: z.string().uuid(),
        })

        const { id } = getTransactionsParamsSchame.parse(request.params)

        const transaction = await knex('transactions').where('id', id).first()

        return { transaction }
    })

    app.post('/', async (request, reply) => {
        // { title, amount, type: credit or debit }

        const createTransactionBodySchema = z.object({
            title: z.string(),
            amount: z.number(),
            type: z.enum(['credit', 'debit']),
        })

        const { title, amount, type } = createTransactionBodySchema.parse(request.body)
    
        await knex('transactions').insert({
            id: randomUUID(),
            title,
            amount: type === 'credit' ? amount : amount * -1,
        })
    
        // 201 - recurso criado com sucesso

        return reply.status(201).send()
    })
}