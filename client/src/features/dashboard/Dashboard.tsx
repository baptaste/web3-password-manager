import { MainLayout } from '../../components/Layout'
import { lazyImport } from '../../utils/imports'

const PasswordList = lazyImport('../features/passwords', 'PasswordList')

export function Dashboard() {
	return (
		<MainLayout title='Dashboard'>
			<section id='passwords' className='w-full my-10 bg-zinc-800 rounded-xl py-4 px-6'>
				<p className='text-2xl font-black mt-5 mb-8'>Passwords</p>
				<PasswordList />
			</section>
		</MainLayout>
	)
}
