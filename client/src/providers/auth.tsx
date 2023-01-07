import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react'
import { getAccessToken } from '../features/auth/api'

interface IAuthContext {
	accessToken: string | null
	setAccessToken: (data: string | null) => void
	loggedIn: boolean
	error: any
	isLoading: boolean
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
	const [accessToken, setAccessToken] = useState<string | null>(null)
	const [error, setError] = useState<any>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	useEffect(() => {
		console.log('App mount')
		setIsLoading(true)

		getAccessToken()
			.then(({ token }) => {
				setAccessToken(token)
			})
			.catch((err) => {
				console.error('getAccessToken err:', err)
				setError(err)
			})

		setIsLoading(false)

		return () => {
			setError(null)
		}
	}, [])

	const authValue = useMemo(() => {
		const loggedIn = accessToken !== null
		return { accessToken, setAccessToken, loggedIn, error, isLoading }
	}, [accessToken, setAccessToken, error, isLoading])

	return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
