import { Router } from 'express'
import multer from 'multer'
import path from 'node:path'
import aunthenticate from '../middlewares/auntheticate'
import { createBook, deleteBook, getAllBooks } from './bookController'

const bookRouter = Router()

const upload = multer({
  dest: path.resolve(__dirname, '../../public/data/uploads'),
  limits: { fileSize: 1e7 }, // 10MB
})

export const bookRequestMapping = '/api/v1/books'

// book routes

bookRouter.post(
  '/',
  aunthenticate,
  upload.fields([
    { name: 'coverImage', maxCount: 1 },
    { name: 'file', maxCount: 1 },
  ]),
  createBook
)

bookRouter.get('/', aunthenticate, getAllBooks)

bookRouter.delete('/:id', aunthenticate, deleteBook)

export default bookRouter
