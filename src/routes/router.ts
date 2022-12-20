import express from 'express'
import { userController } from '../controllers/userController'
import { passwordController } from '../controllers/passwordController'
import { authController } from '../controllers/authController'
import { handleAuth } from '../middlewares/auth'

const router = express.Router()

interface IRouterEnpoints {
	[key: string]: string
}

const routerEndpoints: IRouterEnpoints = {
	users: '/api/users',
	passwords: '/api/passwords',
	auth: '/api/auth'
}

//////////////////
// Users routes //
//////////////////

// Get
router.get(routerEndpoints.users, userController.getAll)
router.get(`${routerEndpoints.users}/:id`, handleAuth, userController.getUser)
// Post
router.post(`${routerEndpoints.users}/create`, userController.createUser)

//////////////////
// Auth routes //
//////////////////

// Post
router.post(`${routerEndpoints.auth}/verify`, authController.verify)
router.post(`${routerEndpoints.auth}/login`, authController.login)
router.get(`${routerEndpoints.auth}/refresh`, handleAuth, authController.refresh)

//////////////////////
// Passwords routes //
//////////////////////

// Get
router.get(`${routerEndpoints.passwords}/:userId`, passwordController.getAll)
router.get(`${routerEndpoints.passwords}/count`, passwordController.getCount)
// Post
router.post(`${routerEndpoints.passwords}/create`, passwordController.createPassword)
router.post(`${routerEndpoints.passwords}/retreive`, passwordController.retreivePassword)

export default router
