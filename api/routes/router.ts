import express from 'express'
import { passwordController } from '../controllers/password.controller'

const router = express.Router()

router.get('/', (_, res) => {
	res.json('Hello from api')
})

router.post('/send-password', passwordController.hash)

export default router
