import { BigNumber } from 'ethers'
import { getContract } from './contract'

export async function getPasswordCount(): Promise<string> {
	let count: string = ''
	const contract = getContract()

	try {
		const data: BigNumber = await contract.passwordsCount()
		const countInHex: string = data._hex
		count = countInHex.replace(/0x0/i, '')
		console.log('------------- API, getPasswordCount, count:', count)
	} catch (error) {
		console.error(error)
	}
	return count
}

export async function sendPasswordToContract(hash: string, id: string): Promise<void> {
	const contract = getContract()
	try {
		const transaction = await contract.storePassword(hash, id)
		await transaction.wait();
		console.log('sendPasswordToContract, all good')
	} catch (error) {
		console.error('sendPasswordToContract, CATCH ERROR:', error)
	}
}

export async function getPasswordHashFromContract(hashId: string): Promise<string> {
	let passwordHash: string = ''

	const contract = getContract()

	try {
		const hash = await contract.retreivePassword(hashId)
		passwordHash = hash
	} catch (error) {
		console.error(error)
	}

	return passwordHash
}
