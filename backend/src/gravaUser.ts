/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { Schema, model } from 'mongoose'

const router = Router()
interface User {
  _id?: string
  name: string
  email: string
  password: string
}

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
    default: 'João das Couves'
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

const userModel = model<User>('User', userSchema)

router.get('/user', async (_req, res) => {
  try {
    const response = await userModel.find({}, { password: 0 })
    res.status(200).json(response)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.get('/user/:id', async (req, res) => {
  try {
    const { id } = req.params
    const response = await userModel.findById({ _id: id }, { password: 0 })
    res.status(200).json(response)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.post('/user', async (req, res) => {
  try {
    const user = req.body

    const response = await userModel.create(user)
    res.status(201).json(response)
  } catch (error) {
    // console.log(error)
    res.status(400).json({ error })
  }
})

export default router
