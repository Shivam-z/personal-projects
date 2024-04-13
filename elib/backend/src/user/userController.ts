import { HttpStatusCode } from 'axios'
import bcrypt from 'bcrypt'
import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { hashPassword, jwtTokenGeneration } from './jwtService'
import userModel from './userModel'
import { User } from './userTypes'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  let newUser: User

  const { name, email, password } = req.body

  if (!name || !email || !password) {
    const error = createHttpError(
      HttpStatusCode.BadRequest,
      'Name, email, and password are required'
    )
    return next(error)
  }

  //check if user already exists
  const userExists = await userModel.findOne({ email })
  if (userExists) {
    const error = createHttpError(
      HttpStatusCode.Conflict,
      'User already exists'
    )
    return next(error)
  }

  try {
    newUser = await userModel.create({
      name,
      email,
      password: await hashPassword(password),
    })
  } catch (err: any) {
    const error = createHttpError(
      HttpStatusCode.InternalServerError,
      'error while creating user'
    )
    return next(error)
  }

  const jwtToken = jwtTokenGeneration(newUser)

  return res.status(HttpStatusCode.Created).json({
    message: 'User created successfully',
    jwtToken,
    user: newUser,
  })
}

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.body.email || !req.body.password) {
    const error = createHttpError(
      HttpStatusCode.BadRequest,
      'Email and password are required'
    )
    return next(error)
  }

  const { email, password } = req.body
  //find user

  const user = await userModel.findOne({ email })
  if (!user) {
    const error = createHttpError(HttpStatusCode.NotFound, 'User not found')
    return next(error)
  }

  //compare password
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    const error = createHttpError(
      HttpStatusCode.Unauthorized,
      'Invalid email or password'
    )
    return next(error)
  }

  //jwt token generation
  const jwtToken = jwtTokenGeneration(user)
  return res.status(HttpStatusCode.Ok).json({
    message: 'Login successful',
    jwtToken,
  })
}

const fetchAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let page = parseInt(req.query.page as string)
  let limit = parseInt(req.query.limit as string)
  let email = req.query.email as string

  if (email) {
    try {
      const user = await userModel.findOne({ email }).select('-password').exec()

      if (!user) {
        const error = createHttpError(HttpStatusCode.NotFound, 'User not found')
        return next(error)
      }

      return res.status(HttpStatusCode.Ok).json({
        message: 'User fetched successfully',
        user,
      })
    } catch (err: any) {
      const error = createHttpError(
        HttpStatusCode.InternalServerError,
        'Something went wrong'
      )
      return next(error)
    }
  }

  try {
    if (!page) {
      page = 1
    }
    if (!limit) {
      limit = 10
    }

    const users = await userModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .select('-password')
      .exec()

    return res.status(HttpStatusCode.Ok).json({
      message: 'Users fetched successfully',
      users,
    })
  } catch (err: any) {
    const error = createHttpError(
      HttpStatusCode.InternalServerError,
      'Something went wrong'
    )
    return next(error)
  }
}

export { createUser, fetchAllUsers, loginUser }
