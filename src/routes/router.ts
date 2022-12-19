import express from 'express'
import { userController } from '../controllers/userController'
import { passwordController } from '../controllers/passwordController'
import { authController } from '../controllers/authController'
import { verifyAccessToken, verifyRefreshToken } from '../middlewares/auth'

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
router.get(`${routerEndpoints.users}/:id`, verifyAccessToken, userController.getUser)
// Post
router.post(`${routerEndpoints.users}/create`, verifyAccessToken, userController.createUser)

//////////////////
// Auth routes //
//////////////////

// Post
router.post(`${routerEndpoints.auth}/verify`, authController.verifyUser)
router.post(`${routerEndpoints.auth}/login`, authController.loginUser)
router.get(`${routerEndpoints.auth}/refresh`, verifyRefreshToken, authController.refreshToken)

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
