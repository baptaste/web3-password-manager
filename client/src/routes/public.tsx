import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

const LoginPage = lazy(() => import('../features/login'))
const RegisterPage = lazy(() => import('../features/register'))

function PublicRoutes() {
	return (
		<Routes>
			<Route path='login' element={<LoginPage />} />
			<Route path='register' element={<RegisterPage />} />
		</Routes>
	)
}

export const publicRoutes = [
	{
		path: '/auth/*',
		element: <PublicRoutes />
	}
]
