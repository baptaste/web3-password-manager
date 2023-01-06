import type { IInputProps } from './Input.d'

const defaultClassName = 'w-full rounded-md px-4 py-8 text-lg text-slate-900 bg-transparent'

const errorClassName =
	defaultClassName.replace('text-slate-900', 'text-red-600') +
	' border-solid border-2 border-red-500'

const validatedClassName =
	defaultClassName.replace('text-slate-900', 'text-green-600') +
	' border-solid border-2 border-green-500'

export function Input({
	type = 'text',
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
}: IInputProps) {
	const getClassName = () => {
		if (error) return errorClassName
		if (validated) return validatedClassName
		return defaultClassName
	}

	const className = getClassName()

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
					type={type}
					value={value}
					name={name}
					placeholder={placeholder}
					className={className}
					disabled={disabled}
					required={required}
					onClick={onClick}
					onChange={onChange}
				/>
			</div>
		</div>
	)
}
