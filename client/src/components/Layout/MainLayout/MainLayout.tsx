import { HeaderNav, TabNav } from '../../Navigation'

export function MainLayout({ children, title }: { children: React.ReactNode; title: string }) {
	return (
		<div className='MainLayout w-full h-screen flex flex-col flex-1 items-center px-4 py-20 overflow-y-scroll bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50'>
			<HeaderNav title={title} showSettings />
			{children}
			<TabNav />
		</div>
	)
}
