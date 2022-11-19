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
