import { useRef, useState } from 'react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

interface ICreatePasswordProps {
	onSubmit: (e: any) => void
	passwordNameRef: React.MutableRefObject<undefined>
	passwordRef: React.MutableRefObject<undefined>
}

export default function CreatePassword({
	onSubmit,
	passwordNameRef,
	passwordRef
}: ICreatePasswordProps) {
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false)

	return (
		<form
			onSubmit={onSubmit}
			className='CreatePasswordForm w-1/2 h-1/2 flex flex-col items-center justify-start'
		>
			<div className='inputContainer w-full flex flex-col items-center justify-between my-4 py-3'>
				<label htmlFor='name' className='w-full mb-3 text-left text-2xl'>
					Name
				</label>
				<div className='w-full flex items-center justify-between'>
					<input
						ref={passwordNameRef}
						name='name'
						type='text'
						placeholder='Enter a name'
						className='w-full h-full rounded-md p-4 text-slate-900'
					/>
				</div>
			</div>

			<div className='inputContainer w-full flex flex-col items-center justify-between my-4 py-3'>
				<label htmlFor='password' className='w-full mb-3 text-left text-2xl'>
					Password
				</label>
				<div className='w-full flex items-center justify-between relative'>
					<input
						ref={passwordRef}
						type={isPasswordVisible ? 'text' : 'password'}
						name='password'
						placeholder='Enter a password'
						className='w-full h-full rounded-md p-4 text-slate-900'
					/>
					{isPasswordVisible ? (
						<EyeSlashIcon
							className='h-6 w-6 text-blue-500 cursor-pointer absolute right-5'
							onClick={() => setIsPasswordVisible(false)}
						/>
					) : (
						<EyeIcon
							className='h-6 w-6 text-blue-500 cursor-pointer absolute right-5'
							onClick={() => setIsPasswordVisible(true)}
						/>
					)}
				</div>
			</div>

			<button
				type='submit'
				className='w-full p-3 mt-12 rounded-md bg-sky-500 text-slate-100'
				disabled={!passwordRef?.current?.value || !passwordNameRef?.current?.value}
			>
				Create password
			</button>
		</form>
	)
}
