import { useEffect, useState } from 'react'
import { Spinner } from '../../../../components/Common'
import { getUserPassords, retreivePassword } from '../../api'
import { LockOpenIcon, LockClosedIcon } from '@heroicons/react/24/outline'

interface IPasswordListProps {
	user: any
}

export function PasswordList({ user }: IPasswordListProps) {
	console.log('PasswordList - user:', user)
	const [passwords, setPasswords] = useState<any[]>([])
	const [isLoadingList, setIsLoadingList] = useState<boolean>(false)
	const [loadingPasswordId, setLoadingPasswordId] = useState<string | null>(null)
	const [clearPassword, setClearPassword] = useState<any>(null)

	const testUserId = '639878749179d3bf8bfd088c' // just for test

	const displayPasswordValue = (encryptionId: string) => {
		if (clearPassword !== null && clearPassword.encryptionId === encryptionId) {
			return clearPassword.value
		}
		return '***************'
	}

	const displayIcon = (passwordId: string, encryptionId: string) => {
		if (clearPassword !== null && clearPassword.encryptionId === encryptionId) {
			return (
				<LockClosedIcon
					className='w-6 h-6 text-zinc-50 self-end mb-2 cursor-pointer'
					onClick={() => setClearPassword(null)}
				/>
			)
		}
		return (
			<LockOpenIcon
				className='w-6 h-6 text-zinc-50 self-end mb-2 cursor-pointer'
				onClick={() => onRetreivePassword(passwordId, user.id, encryptionId)}
			/>
		)
	}

	const onRetreivePassword = async (passwordId: string, userId: string, encryptionId: string) => {
		console.log('onRetreivePassword called')
		setLoadingPasswordId(passwordId)
		const { success, decrypted, error } = await retreivePassword(testUserId, encryptionId)
		console.log('onRetreivePassword res')

		if (success) {
			setClearPassword((prev: any) => (prev = { encryptionId, value: decrypted }))
			setLoadingPasswordId(null)
		}
	}

	useEffect(() => {
		if (user) {
			setIsLoadingList(true)
			getUserPassords(testUserId) // user.id
				.then((res) => {
					setPasswords(res.passwords)
				})
				.catch((err) => {
					console.error('PasswordList - getUserPasswords err:', err)
				})
				.finally(() => setIsLoadingList(false))
		}
	}, [user])

	useEffect(() => {
		console.log('passwords:', passwords)
	}, [passwords])

	return (
		<div className='PasswordList w-full'>
			{isLoadingList ? (
				<Spinner />
			) : (
				<ul className='flex flex-col items-center'>
					{passwords.map(({ _id, title, encryption_id }: any) => (
						<li
							key={encryption_id}
							className='w-full flex items-center justify-between mb-8 border-b border-solid border-1 border-zinc-600'
						>
							<div className='flex flex-col'>
								<p className='text-lg font-bold pb-2'>{title}</p>

								<p className='text-zinc-600 text-lg font-bold'>
									{displayPasswordValue(encryption_id)}
								</p>
							</div>

							{loadingPasswordId === _id ? (
								<Spinner />
							) : (
								displayIcon(_id, encryption_id)
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}
