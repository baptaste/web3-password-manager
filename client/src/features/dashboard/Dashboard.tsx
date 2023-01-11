import { MainLayout } from '../../components/Layout'
import { useAuth } from '../../providers/auth'
import { lazyImport } from '../../utils/imports'

const PasswordList = lazyImport('../features/passwords', 'PasswordList')

export function Dashboard() {
	const { user } = useAuth()

	return (
		<MainLayout title='Dashboard'>
			<section id='passwords' className='w-full my-10 bg-zinc-800 rounded-xl py-4 px-6'>
				<p className='text-2xl font-black mb-8'>Passwords</p>
				<PasswordList user={user} />
			</section>
		</MainLayout>
	)
}
