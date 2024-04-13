import { HttpStatusCode } from 'axios'
import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import createHttpError from 'http-errors'
import path from 'node:path'
import cloudinary from '../config/cloudinary'
import { AuthRequest } from '../middlewares/auntheticate'
import bookModel from './bookModel'

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  const _req = req as AuthRequest
  const userId = _req.userId

  const files = req.files as { [fieldname: string]: Express.Multer.File[] }

  const coverImageMimeType = files.coverImage[0].mimetype.split('/')[1]
  const fileName = files.coverImage[0].filename
  const filePath = path.resolve(
    __dirname,
    `../../public/data/uploads/${fileName}`
  )

  const uploadResult = await cloudinary.uploader.upload(filePath, {
    filename_override: fileName,
    folder: 'book-covers',
    format: coverImageMimeType,
  })

  const bookFileName = files.file[0].filename
  const bookFilePath = path.resolve(
    __dirname,
    `../../public/data/uploads/${bookFileName}`
  )

  const bookUploadResult = await cloudinary.uploader.upload(bookFilePath, {
    resource_type: 'raw',
    filename_override: bookFileName,
    folder: 'book-files',
    format: 'pdf',
  })

  const newBook = await bookModel.create({
    title: req.body.title,
    genre: req.body.genre,
    author: userId,
    coverImage: uploadResult.secure_url,
    file: bookUploadResult.secure_url,
  })

  // delete the temporary files

  try {
    await fs.promises.unlink(filePath)
    await fs.promises.unlink(bookFilePath)
  } catch (error) {
    console.error('Error deleting file', error)
  }

  return res
    .status(HttpStatusCode.Created)
    .json({ message: 'book created', book: newBook })
}

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  let page = parseInt((req.query.page as string) ?? 1)
  let limit = parseInt((req.query.limit as string) ?? 10)

  const books = await bookModel
    .find()
    .populate('author', 'name email')
    .limit(limit)
    .skip((page - 1) * limit)
    .exec()

  return res.status(HttpStatusCode.Ok).json({ books })
}

const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  const bookId = req.params.id

  const book = await bookModel.findById(bookId)

  if (!book) {
    return res
      .status(HttpStatusCode.NotFound)
      .json({ message: 'book not found' })
  }

  //check access

  const _req = req as AuthRequest

  const userId = _req.userId
  if (userId !== book.author.toString()) {
    return res.status(HttpStatusCode.Forbidden).json({ message: 'forbidden' })
  }

  const publicIdOfCoverImage = book.coverImage
    .split('/')
    .slice(-2)
    .join('/')
    .split('.')[0]

  const publicIdOfBookFile =
    book.file.split('/').slice(-2).join('/').split('.')[0] + '.pdf'

  console.log(publicIdOfBookFile)

  try {
    await cloudinary.uploader.destroy(publicIdOfCoverImage)
    await cloudinary.uploader.destroy(publicIdOfBookFile, {
      resource_type: 'raw',
    })
  } catch (error) {
    const err = new createHttpError.InternalServerError(
      'Error deleting cloud files'
    )
    return next(err)
  }

  await book.deleteOne()

  return res.status(HttpStatusCode.NoContent)
}

export { createBook, deleteBook, getAllBooks }
