import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const DashboardPage = lazy(() => import('../features/dashboard'))
const ProfilePage = lazy(() => import('../features/profile'))

function ProtectedRoutes() {
	return (
		<Routes>
			<Route path='dashboard' element={<DashboardPage />} />
			<Route path='profile' element={<ProfilePage />} />
		</Routes>
	)
}

export const protectedRoutes = [
	{
		path: '/*',
		element: <ProtectedRoutes />
	}
]
