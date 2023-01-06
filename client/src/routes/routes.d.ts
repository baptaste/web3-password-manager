import * as React from 'react'

export interface IRoute {
	path: string
	name: string
	component: React.ReactNode
	restricted: boolean
}

export interface IRouteProps {
	children: JSX.Element
	redirectTo: string
	isAuthenticated: boolean
}
