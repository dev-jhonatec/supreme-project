import cors from 'cors'
import dayjs from 'dayjs'
import { configDotenv } from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import router from './gravaUser'

// executa a leitura do arquivo .env
configDotenv()

const DB_URL = process.env.DB_URL
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_CLUSTER = process.env.DB_CLUSTER
const DB_COLLETION = process.env.DB_COLLETION
const PORT = process.env.PORT

const MONGODB_URI = encodeURI(
  `${DB_URL}://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/${DB_COLLETION}?retryWrites=true&w=majority`
)

const app = express()

async function startServer (): Promise<void> {
  try {
    await mongoose.connect(MONGODB_URI)

    app.use(cors())
    app.use(express.json())

    app.use(router)

    app.get('/', (_req, res) => {
      res.send('Estou vivo! ' + dayjs().format('DD/mm/YYYY hh:mm:ss'))
    })

    // Listening
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta: ${PORT}`)
    })
  } catch (error) {
    console.log('ERRO NO START SERVER: ', error)
  }
}

startServer().catch((err) => {
  console.log('ERRO GERAL', err)
})
