import { useState, useEffect } from 'react'
import { Spinner } from '../../../../components/Common'
import { getUserPassords } from '../../api'
import { IPassword, IPasswords } from '../../types.d'
import { Password } from '../Password'
import { useAuth } from '../../../../providers/auth'

const FAKE_USER_ID = '639878749179d3bf8bfd088c' // user.id in real situation

export function PasswordList() {
	const { user } = useAuth()
	const [userPasswords, setUserPasswords] = useState<IPasswords>([])
	const [isLoadingList, setIsLoadingList] = useState<boolean>(false)

	useEffect(() => {
		if (user) {
			setIsLoadingList(true)
			getUserPassords(FAKE_USER_ID)
				.then(({ passwords }) => setUserPasswords(passwords))
				.catch((err) => console.error(err))
				.finally(() => setIsLoadingList(false))
		}
	}, [user])

	const updatePasswords = (type: string, id: string, value?: string): void => {
		let result = userPasswords
		const target = result.filter((item) => item._id === id)[0]

		if (type === 'decryption') {
			if (!value) return
			result = result.map((password, i) => {
				if (password._id === target._id) {
					delete result[i] // remove outdated
					return { ...target, plaintext: value, visible: true }
				}
				return password
			})
		} else if (type === 'visibility') {
			result = result.map((password) => {
				if (password._id === target._id) {
					return { ...target, visible: !target.visible }
				}
				return password
			})
		}

		setUserPasswords((prev) => (prev = result))
	}

	return (
		<div className='PasswordList w-full'>
			{isLoadingList ? (
				<Spinner />
			) : (
				<ul className='flex flex-col items-center'>
					{userPasswords.map((password: IPassword) => (
						<Password
							key={password._id}
							data={password}
							userId={FAKE_USER_ID}
							onChange={updatePasswords}
						/>
					))}
				</ul>
			)}
		</div>
	)
}
