import { ethers } from 'hardhat'

const { ALCHEMY_API_KEY, METAMASK_PRIVATE_KEY } = process.env

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider('goerli', ALCHEMY_API_KEY)

// Signer
// const signer = new ethers.Wallet(METAMASK_PRIVATE_KEY, alchemyProvider)

// Contract
// const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer)
