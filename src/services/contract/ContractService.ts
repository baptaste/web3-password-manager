import { getContract } from '../../contract/config'
import type { IContractEventFilterHandler, IStoreReturnData, IRetreiveReturnData } from './ContractService.d'
import { Utils } from 'alchemy-sdk'

const { CONTRACT_ADDRESS } = process.env

const contractEventFilterHandler: IContractEventFilterHandler = {
	password: {
		address: CONTRACT_ADDRESS as string,
		topics: [Utils.id('NewPassword(hashId, stored)')]
	}
	// ... more to come
}

export default class ContractService {
	// store encrypted password and its id on contract
	static store(password: string, encryptionId: string): Promise<IStoreReturnData> {
		return new Promise((resolve, reject) => {
			getContract()
				.then((contract) => {
					if (contract) {
						console.log('ContractService store - we got the contract')
						contract
							.storePassword(password, encryptionId)
							.then((transaction: any) => {
								if (transaction) {
									console.log('ContractService store - we got a transaction')
									transaction
										.wait()
										.then((res?: any) => {
											console.log('ContractService store - transaction successful, res :', res)
											resolve({ stored: true })
										})
										.catch((err: any) => {
											console.error('ContractService store - contract transaction error:', err)
											reject(err)
										})
								}
							})
							.catch((err: any) => {
								console.error('ContractService store - couldnt store password in contract error:', err)
								reject(err)
							})
					}
				})
				.catch((err) => {
					console.error('ContractService store - couldnt get contract error:', err)
					reject(err)
				})
		})
	}

	// retreive encrypted password
	static retreive(encryptionId: string): Promise<IRetreiveReturnData> {
		return new Promise((resolve, reject) => {
			getContract()
				.then((contract) => {
					if (contract) {
						console.log('ContractService retreive - we got the contract')
						contract
							.retreivePassword(encryptionId)
							.then((password: string) => {
								console.log('ContractService retreive - retreivePassword successful, password :', password)
								resolve({ password })
							})
							.catch((err: any) => {
								console.error('ContractService retreive - couldnt retreive password , error:', err)
								reject(err)
							})
					}
				})
				.catch((err) => {
					console.error('ContractService retreive - couldnt get contract error:', err)
					reject(err)
				})
		})
	}
}
