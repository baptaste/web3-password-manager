import { HeaderNav } from '../../Navigation'
import TabNav from '../../Navigation/TabNav/TabNav'

export function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className='MainLayout flex flex-col flex-1 items-center px-4 py-20 overflow-y-scroll bg-slate-50 text-slate-900'>
			<HeaderNav />
			{children}
			<TabNav />
		</div>
	)
}
