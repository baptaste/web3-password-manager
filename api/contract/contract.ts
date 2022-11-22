import { ethers, Contract } from 'ethers'
import { abi } from './abi.json'

// const provider = new ethers.providers.Web3Provider(window.ethereum)
// const provider = new ethers.providers.JsonRpcProvider(process.env.LOCAL_RPC_URL)
// const provider = new ethers.providers.JsonRpcProvider()

const { ALCHEMY_POLYGON_API_KEY, CONTRACT_ADDRESS, METAMASK_ACCOUNT1_PRIVATE_KEY } = process.env

const NETWORK: string = 'matic' // ex: matic | goerli

const ADDRESS: string = CONTRACT_ADDRESS || '' // ex: 0xNNNNNN...NNN

const WALLET_PRIVATE_KEY: string = `0x${METAMASK_ACCOUNT1_PRIVATE_KEY}` || '' // ex: 0xNNNNNN...NNN

const alchemyProvider = new ethers.providers.AlchemyProvider(NETWORK, ALCHEMY_POLYGON_API_KEY)

const signer = new ethers.Wallet(WALLET_PRIVATE_KEY, alchemyProvider);

// Returns Contract
export function getContract(): Contract {
	return new ethers.Contract(ADDRESS, abi, signer)
}

// export async function getCurrentAccount(): Promise<string> {
// 	let currentAccount: string = ''

// 	// const provider = getProvider()
// 	// const signer = provider.getSigner()

// 	try {
// 		// MetaMask requires requesting permission to connect users accounts
// 		const accounts = await provider.send('eth_requestAccounts', [])

// 		if (accounts.length > 0) {
// 			currentAccount = accounts[0]
// 		}

// 		/* double check these contract code if (Error): call revert exception happens */

// 		const code = await provider.getCode(ADDRESS)
// 		console.log('provider contract code:', code)
// 		const signerCode = await signer.provider.getCode(ADDRESS)
// 		console.log('signer contract code:', signerCode)

// 		console.log('currentAccount:', currentAccount)
// 	} catch (error) {
// 		console.error(error)
// 	}

// 	return currentAccount
// }

// Returns the address of the current owner
export async function getOwner(): Promise<string> {
	let ownerAddress: string = ''

	try {
		const contract = getContract()
		const owner = await contract.owner()
		ownerAddress = owner
	} catch (error) {
		console.error(error)
	}

	return ownerAddress
}
