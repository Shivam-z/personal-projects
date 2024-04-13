import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import { config } from '../config/config'

export interface AuthRequest extends Request {
  userId: string
}

const aunthenticate = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization

  if (!token) {
    const error = createHttpError(401, 'JWT token is required')
    return next(error)
  }

  const parsedToken = token.split(' ')[1]

  try {
    const decodedToken = jwt.verify(parsedToken, config.jwtSecret as string)
    const _req = req as AuthRequest
    _req.userId = (decodedToken as { userId: string }).userId
  } catch (error) {
    return next(createHttpError(401, 'Unauthorized'))
  }

  next()
}

export default aunthenticate
