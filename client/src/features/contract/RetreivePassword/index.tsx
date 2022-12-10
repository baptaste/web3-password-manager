import { useRef } from 'react'

interface IRetreivePasswordProps {
	onSubmit: (e: any) => void
	encryptionIdRef: React.MutableRefObject<undefined>
}

export default function RetreivePassword({ onSubmit, encryptionIdRef }: IRetreivePasswordProps) {
	return (
		<form onSubmit={onSubmit} className='HashIdForm w-1/2 h-auto flex flex-col items-center justify-between'>
			<div className='inputContainer w-1/2 flex flex-col items-center justify-between my-4 py-3'>
				<label htmlFor='hashId' className='w-full mb-3 text-left text-2xl'>
					Password ID
				</label>
				<div className='w-full flex items-center justify-between'>
					<input ref={encryptionIdRef} name='hashId' type='text' placeholder='Enter ID' className='w-full h-full rounded-md p-4 text-slate-900' />
				</div>
			</div>
			<button
				type='submit'
				className='w-1/3  py-3 mt-12 rounded-md bg-green-700 text-slate-100 cursor-pointer'
				// disabled={!encryptionIdRef?.current?.value}
			>
				Retreive password
			</button>
		</form>
	)
}
