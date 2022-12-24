import { Route, Navigate, Outlet, useLocation } from 'react-router-dom'
import type { IRouteProps } from './routes.d'

export default function PrivateRoute({ children, redirectTo, isAuthenticated }: IRouteProps) {
	const location = useLocation()

	return isAuthenticated ? (
		children
	) : (
		<Navigate to={redirectTo} state={{ from: location }} replace />
	)
}
