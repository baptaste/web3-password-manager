import { ethers } from 'hardhat'
// import '@nomiclabs/hardhat-waffle'
import fs from 'fs'

async function main() {
	const PasswordFactoryContract = await ethers.getContractFactory('PasswordFactory')
	const contract = await PasswordFactoryContract.deploy()
	await contract.deployed()
	fs.writeFileSync('./blockchain-node/scripts/deployed-address.json', JSON.stringify(contract.address))
	console.log('PasswordFactory contract successfully deployed at following address:', contract.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error('CATCH ERROR du deploy:', error)
		process.exit(1)
	})
