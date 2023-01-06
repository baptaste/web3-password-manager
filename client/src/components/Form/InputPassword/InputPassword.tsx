import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import type { IInputPasswordProps } from './InputPassword.d'

const defaultClassName = 'w-full rounded-md px-4 py-8 text-lg text-slate-900 bg-transparent'

const errorClassName =
	defaultClassName.replace('text-slate-900', 'text-red-600') +
	' border-solid border-2 border-red-500'

const validatedClassName =
	defaultClassName.replace('text-slate-900', 'text-green-600') +
	' border-solid border-2 border-green-500'

export function InputPassword(props: IInputPasswordProps) {
	const {
		type = 'password',
		placeholder,
		value = '',
		label = null,
		name = type,
		error = false,
		validated = false,
		disabled = false,
		required = false,
		onClick,
		onChange
	} = props

	const getClassName = () => {
		if (error) return errorClassName
		if (validated) return validatedClassName
		return defaultClassName
	}

	const className = getClassName()

	const [visible, setVisible] = useState<boolean>(false)

	return (
		<div className='Input w-full flex flex-col items-stretch justify-between mb-6 rounded-md'>
			{label ? (
				<label htmlFor={name} className='w-full mb-3 font-bold text-left text-lg'>
					{label}
				</label>
			) : null}

			<div className='w-full relative flex flex-col items-stretch justify-between bg-slate-200 rounded-md'>
				{label === null ? (
					<p
						className={`w-fit absolute left-4 top-2 text-md text-slate-400 ${
							value && value.length ? 'visible' : 'invisible'
						}`}
					>
						{placeholder}
					</p>
				) : null}

				<input
					type={visible ? 'text' : 'password'}
					value={value}
					name={name}
					placeholder={placeholder}
					className={className}
					disabled={disabled}
					required={required}
					onClick={onClick}
					onChange={onChange}
				/>

				{visible ? (
					<EyeSlashIcon
						className='h-6 w-6 pt-0.5 text-slate-400 cursor-pointer absolute right-4 top-8'
						onClick={() => setVisible(false)}
					/>
				) : (
					<EyeIcon
						className='h-6 w-6 pt-0.5 text-slate-400 cursor-pointer absolute right-4 top-8'
						onClick={() => setVisible(true)}
					/>
				)}
			</div>
		</div>
	)
}
