import { BrowserRouter as Router } from 'react-router-dom'
import { ReactNode, Suspense } from 'react'
import { Spinner } from '../components/Common'
import { AuthProvider } from './auth'

export function AppProvider({ children }: { children: ReactNode }) {
	return (
		<Suspense fallback={<Spinner />}>
			<AuthProvider>
				<Router>{children}</Router>
			</AuthProvider>
		</Suspense>
	)
}
