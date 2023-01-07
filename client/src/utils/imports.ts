import { lazy } from 'react'

export const lazyImport = (filePath: string, componentName: string) => {
	return lazy(() => import(filePath).then((module) => ({ default: module[componentName] })))
}
