import express from 'express'
import bookRouter, { bookRequestMapping } from './book/bookRouter'
import globalErrorHandlers from './middlewares/globalErrorHandlers'
import userRouter, { userRequestMapping } from './user/userRouter'

const app = express()

app.use(express.json())

app.use(`${userRequestMapping}`, userRouter)
app.use(`${bookRequestMapping}`, bookRouter)

app.use(globalErrorHandlers)

export default app
