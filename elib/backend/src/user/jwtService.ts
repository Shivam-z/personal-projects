import { HttpStatusCode } from 'axios'
import bcrypt from 'bcrypt'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import { config } from '../config/config'
import { User } from './userTypes'

export const jwtTokenGeneration = (user: User) => {
  const payload = {
    userId: user._id,
  }

  const secret = config.jwtSecret as string

  const options = {
    expiresIn: '1d',
  }

  try {
    return jwt.sign(payload, secret, options)
  } catch (err: any) {
    throw createHttpError(
      HttpStatusCode.InternalServerError,
      'error while creating jwt token'
    )
  }
}
export const hashPassword = async (password: string) => {
  const saltRounds = 10
  const salt = await bcrypt.genSalt(saltRounds)
  return await bcrypt.hash(password, salt)
}
