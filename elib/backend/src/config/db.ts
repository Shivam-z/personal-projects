import mongoose from 'mongoose'
import { config } from './config'

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongoUri as string)
    console.log(`MongoDB Connected: ${conn.connection.host}`)

    mongoose.connection.on('error', (error) => {
      console.error(`MongoDB Error: ${error.message}`)
    })
  } catch (error: any) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
