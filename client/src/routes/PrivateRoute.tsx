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

// function RequireAuth({ children, redirectTo }) {
// 	let isAuthenticated = getAuth();
// 	return isAuthenticated ? children : <Navigate to={redirectTo} />;
//   }

//   function RequireAuth({ children }: { children: JSX.Element }) {
// 	// let auth = useAuth();
// 	const location = useLocation();

// 	if (!auth.user) {
// 	  // Redirect them to the /login page, but save the current location they were
// 	  // trying to go to when they were redirected. This allows us to send them
// 	  // along to that page after they login, which is a nicer user experience
// 	  // than dropping them off on the home page.
// 	  return <Navigate to="/login" state={{ from: location }} replace />;
// 	}

// 	return children;
//   }
