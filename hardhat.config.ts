import dotenv from 'dotenv'
import { HardhatUserConfig } from 'hardhat/config'
// import '@nomicfoundation/hardhat-toolbox'
import '@nomiclabs/hardhat-ethers'

dotenv.config()

const { ALCHEMY_ETHEREUM_HTTP_API_URL, ALCHEMY_POLYGON_HTTP_API_URL, METAMASK_ACCOUNT1_PRIVATE_KEY } = process.env

const config: HardhatUserConfig = {
	solidity: {
		version: '0.8.9',
		settings: {
			optimizer: {
				enabled: true,
				runs: 200
			}
		}
	},

	// defaultNetwork: 'goerli',
	defaultNetwork: 'polygon_mumbai',
	// defaultNetwork: 'matic',

	networks: {
		hardhat: {
			// 	chainId: 31337
			// allowUnlimitedContractSize: true
		},

		goerli: {
			url: ALCHEMY_ETHEREUM_HTTP_API_URL,
			accounts: [`0x${METAMASK_ACCOUNT1_PRIVATE_KEY}`]
		},

		polygon_mumbai: {
			url: ALCHEMY_POLYGON_HTTP_API_URL,
			accounts: [`0x${METAMASK_ACCOUNT1_PRIVATE_KEY}`],
			// gasPrice: 8000000000
		}

		// matic: {
		// 	url: 'https://rpc-mumbai.maticvigil.com',
		// 	accounts: [`0x${METAMASK_ACCOUNT1_PRIVATE_KEY}`]
		// 	// gasPrice: 8000000000
		// }
	}
}

export default config
