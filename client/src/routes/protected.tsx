import { Routes, Route } from 'react-router-dom'
import { lazyImport } from '../utils/imports'

const Dashboard = lazyImport('../features/dashboard', 'Dashboard')

function ProtectedRoutes() {
	return (
		<Routes>
			<Route path='dashboard' element={<Dashboard />} />
		</Routes>
	)
}

export const protectedRoutes = [
	{
		path: '/*',
		element: <ProtectedRoutes />
	}
]
