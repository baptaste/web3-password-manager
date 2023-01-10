import { HeaderNav } from '../../Navigation'

export function VisiterLayout({ children, title }: { children: React.ReactNode; title: string }) {
	return (
		<div className='VisiterLayout w-full h-screen flex flex-col flex-1 items-center px-4 py-20 overflow-y-scroll bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50'>
			<HeaderNav title={title} />
			{children}
		</div>
	)
}
