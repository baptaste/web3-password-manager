import { abi } from './abi.json'
import { Network, Alchemy, Wallet, Contract, AlchemyProvider } from 'alchemy-sdk'

const { ALCHEMY_POLYGON_API_KEY, CONTRACT_ADDRESS, METAMASK_ACCOUNT1_PRIVATE_KEY } = process.env

const alchemySettings = {
	apiKey: ALCHEMY_POLYGON_API_KEY,
	network: Network.MATIC_MUMBAI
}

const alchemy = new Alchemy(alchemySettings)

const NETWORK: string = 'matic' // ex: matic | goerli

const ADDRESS: string = CONTRACT_ADDRESS ?? '' // ex: 0xNNNNNN...NNN

const WALLET_PRIVATE_KEY: string = `0x${METAMASK_ACCOUNT1_PRIVATE_KEY}` ?? '' // ex: 0xNNNNNN...NNN

// Returns Alchemy Provider
export async function getProvider(): Promise<AlchemyProvider | null> {
	let provider = null

	try {
		provider = await alchemy.config.getProvider()
	} catch (error) {
		console.error(error)
	}

	return provider
}

// Returns Signer
function _getSigner(): Wallet {
	return new Wallet(WALLET_PRIVATE_KEY, alchemy)
}

// Returns Contract
export async function getContract(): Promise<Contract | null> {
	let contract = null
	const signer = _getSigner()

	if (signer) {
		contract = new Contract(ADDRESS, abi, signer)
		const ownerAddress = await contract.owner()

		if (ownerAddress) {
			const isCallerOwner: boolean = signer.address === ownerAddress
			console.log('isCallerOwner:', isCallerOwner)
		}
	}

	return contract
}

// Returns object with deployment infos
export async function verifyContractDeployed(): Promise<any> {
	let deployed = false
	let address = ''

	try {
		const provider = await getProvider()

		if (provider) {
			const deployedContractCode = await provider.getCode(ADDRESS)

			if (deployedContractCode.length > 2) {
				deployed = true
				address = deployedContractCode
			}
		}
	} catch (error) {
		console.error(error)
		throw error
	}

	return { deployed, address }
}
