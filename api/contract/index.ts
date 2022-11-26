import { abi } from './abi.json'
import { Network, Alchemy, Wallet, Utils, Contract, AlchemyProvider } from 'alchemy-sdk';
// import { hre } from 'hardhat'

const { ALCHEMY_POLYGON_API_KEY, CONTRACT_ADDRESS, METAMASK_ACCOUNT1_PRIVATE_KEY } = process.env

const settings = {
    apiKey: ALCHEMY_POLYGON_API_KEY,
    network: Network.MATIC_MUMBAI,
};

const alchemy = new Alchemy(settings);

const NETWORK: string = 'matic' // ex: matic | goerli

const ADDRESS: string = CONTRACT_ADDRESS ?? '' // ex: 0xNNNNNN...NNN

const WALLET_PRIVATE_KEY: string = `0x${METAMASK_ACCOUNT1_PRIVATE_KEY}` ?? '' // ex: 0xNNNNNN...NNN

const wallet = new Wallet(WALLET_PRIVATE_KEY);

// Returns Alchemy Provider
async function _getProvider(): Promise<AlchemyProvider | null> {
	let provider = null

	try {
		provider = await alchemy.config.getProvider()
	} catch (error) {
		console.error(error);
	}

	return provider
}

// Returns Signer
async function _getSigner(): Promise<any> {
	let signer = null

	try {
		const provider = await _getProvider()

		if (provider) {
			signer = provider.getSigner(ADDRESS)
		}
	} catch (error) {
		console.error(error);
	}

	return signer
}

// Returns Contract
export async function getContract(): Promise<Contract | null> {
	let contract = null
	const signer = await _getSigner()

	if (signer) {
		contract = new Contract(ADDRESS, abi, signer)
		const owner = await contract.owner();
		console.log('getContract, owner:', owner);
	}

	return contract
}

// Returns object with deployment infos
export async function verifyContractDeployed(): Promise<any> {
	let deployed = false
	let address = ''

	try {
		const provider = await _getProvider()

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