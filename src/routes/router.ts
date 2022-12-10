import express from 'express'
import { authController } from '../controllers/authController'
import { passwordController } from '../controllers/passwordController'

const router = express.Router()

router.get('/', (_, res) => {
	console.log('Hello from api')
	res.json('Hello from api')
})

router.get('/password-count', passwordController.getCount)

router.get('/passwords', passwordController.getAll)

router.post('/retreive-password', passwordController.retreivePassword)

router.post('/save-password', passwordController.savePassword)

router.post('/owner/master-password/create', authController.createMasterPassword)

router.post('/owner/master-password/verify', authController.verifyMasterPassword)

export default router
