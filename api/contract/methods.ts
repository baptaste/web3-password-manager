import { BigNumber } from 'ethers'
import { getContract } from './interact'

export async function getPasswordCount(): Promise<number> {
	let count: number = 0

	try {
		const contract = await getContract()

		if (contract) {
			const data: BigNumber = await contract.passwordsCount()
			const countInHex: string = data._hex
			count = Number(countInHex.replace(/0x0/i, ''))
		}
	} catch (error) {
		console.error(error)
	}
	return count
}

export async function sendPasswordToContract(hash: string, id: string): Promise<void> {
	try {
		const contract = await getContract()

		if (contract) {
			const transaction = await contract.storePassword(hash, id)
			await transaction.wait()
			console.log('sendPasswordToContract, all good')
		}
	} catch (error) {
		console.error('sendPasswordToContract, error:', error)
	}
}

export async function getPasswordHashFromContract(hashId: string): Promise<string> {
	let passwordHash: string = ''

	try {
		const contract = await getContract()

		if (contract) {
			const hash = await contract.retreivePassword(hashId)
			passwordHash = hash
		}
	} catch (error) {
		console.error(error)
	}

	return passwordHash
}
