import { Router } from 'express'
import { createUser, fetchAllUsers, loginUser } from './userController'

const userRouter = Router()

export const userRequestMapping = '/api/v1/users'

// user routes

userRouter.post('/register', createUser)

userRouter.post('/login', loginUser)

userRouter.get('/', fetchAllUsers)

export default userRouter
