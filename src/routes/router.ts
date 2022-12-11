import express from 'express'
import { userController } from '../controllers/userController'
import { passwordController } from '../controllers/passwordController'

const router = express.Router()

const endpoints = {
	users: '/api/users',
	passwords: '/api/passwords'
}

//////////////////
// Users routes //
//////////////////

// Get
router.get(endpoints.users, userController.getAll)
router.get(`${endpoints.users}/:id`, userController.getUser)
// Post
router.post(`${endpoints.users}/create`, userController.createUser)
router.post(`${endpoints.users}/verify`, userController.verifyMasterPassword)

//////////////////////
// Passwords routes //
//////////////////////

// Get
router.get(endpoints.passwords, passwordController.getAll)
router.get(`${endpoints.passwords}/count`, passwordController.getCount)
// Post
router.post(`${endpoints.passwords}/create`, passwordController.createPassword)
router.post(`${endpoints.passwords}/retreive`, passwordController.retreivePassword)

export default router
