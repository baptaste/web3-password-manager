import { useState } from 'react'
import { Spinner } from '../../../../components/Common'
import { LockOpenIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { retreivePassword } from '../../api'
import type { IPassword } from '../../types.d'

interface IPasswordProps {
	data: IPassword
	userId: string
	onChange: (type: string, id: string, value?: string) => void
}

export function Password({ data, userId, onChange }: IPasswordProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false)

	const onRetreivePassword = async () => {
		setIsLoading(true)
		const { success, decrypted, error } = await retreivePassword(userId, data.encryption_id)
		if (success) {
			onChange('decryption', data._id, decrypted)
			setIsLoading(false)
		}
	}

	const togglePasswordVisibility = () => onChange('visibility', data._id)

	const displayIcon = () => {
		// loading plaintext data
		if (isLoading) return <Spinner size='small' />

		if (data.plaintext) {
			if (data.visible) {
				return (
					<LockOpenIcon
						className='w-6 h-6 text-zinc-50 cursor-pointer'
						onClick={togglePasswordVisibility}
					/>
				)
			}
			return (
				<LockClosedIcon
					className='w-6 h-6 text-zinc-50 cursor-pointer'
					onClick={togglePasswordVisibility}
				/>
			)
		}

		return (
			<LockOpenIcon
				className='w-6 h-6 text-zinc-50 cursor-pointer'
				onClick={onRetreivePassword}
			/>
		)
	}

	return (
		<li key={data._id} className='w-full mb-8 border-b border-solid border-1 border-zinc-600'>
			<div className='flex flex-col'>
				<p className='text-lg font-bold pb-2'>{data.title}</p>
				<div className='flex items-center justify-between'>
					{data.plaintext !== null && data.visible ? (
						<p className='h-fit text-green-600 text-lg font-bold pb-2 pr-6 break-all'>
							{data.plaintext}
						</p>
					) : (
						<p className='text-zinc-600 text-lg font-bold pb-2'>***************</p>
					)}
					<div className='pb-3'>{displayIcon()}</div>
				</div>
			</div>
		</li>
	)
}
