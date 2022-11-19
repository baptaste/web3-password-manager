import { ethers, Contract } from 'ethers'
import ABI from './abi.json'

declare let window: any
// const provider = new ethers.providers.Web3Provider(window.ethereum)
const provider = new ethers.providers.JsonRpcProvider()
export const CONTRACT_ADDRESS: string = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

// Returns provider injected by Metamask in browser
// export function getProvider() {
// 	return provider
// }

// Returns Contract
export function getContract(options?: any): Contract {
	let signature
	// const provider = getProvider()
	const signer = provider.getSigner()

	if (options !== undefined && options.withTransaction) signature = signer
	else signature = provider

	const contract: Contract = new ethers.Contract(CONTRACT_ADDRESS, ABI.abi, signature)
	console.log('contract:', contract)

	return contract
}

export async function getCurrentAccount(): Promise<string> {
	let currentAccount: string = ''

	// const provider = getProvider()
	const signer = provider.getSigner()

	try {
		// MetaMask requires requesting permission to connect users accounts
		const accounts = await provider.send('eth_requestAccounts', [])

		if (accounts.length > 0) {
			currentAccount = accounts[0]
		}

		/* double check these contract code if (Error): call revert exception happens */

		const code = await provider.getCode(CONTRACT_ADDRESS)
		console.log('provider contract code:', code)
		const signerCode = await signer.provider.getCode(CONTRACT_ADDRESS)
		console.log('signer contract code:', signerCode)

		console.log('currentAccount:', currentAccount)
	} catch (error) {
		console.error(error)
	}

	return currentAccount
}

// Returns the address of the current owner
export async function getOwner(): Promise<string> {
	let ownerAddress: string = ''

	const contract = getContract()

	try {
		const owner = await contract.owner()
		ownerAddress = owner
	} catch (error) {
		console.error(error)
	}

	return ownerAddress
}
