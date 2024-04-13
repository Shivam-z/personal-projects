import { NextFunction, Request, Response } from 'express'
import { HttpError } from 'http-errors'
import { config } from '../config/config'

const globalErrorHandlers = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500
  return res.status(statusCode).json({
    message: err.message,
    statusCode: statusCode,
    errorStack: config.env === 'development' ? err.stack : '🤫',
  })
}

export default globalErrorHandlers
