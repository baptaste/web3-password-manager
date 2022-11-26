import express from 'express'
import { passwordController } from '../controllers/password.controller'

const router = express.Router()

router.get('/', (_, res) => {
	console.log('Hello from api')
	res.json('Hello from api')
})

router.get('/password-count', passwordController.getCount)

router.post('/password-hash', passwordController.getPasswordHash)

router.post('/send-password', passwordController.hash)

export default router
