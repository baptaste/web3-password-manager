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
	static store(encrypted: string, hashId: string): Promise<IStoreReturnData> {
		return new Promise((resolve, reject) => {
			getContract()
				.then((contract) => {
					if (contract) {
						console.log('ContractService store - we got the contract')
						contract
							.storePassword(encrypted, hashId)
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
	static retreive(hashId: string): Promise<IRetreiveReturnData> {
		return new Promise((resolve, reject) => {
			getContract()
				.then((contract) => {
					if (contract) {
						console.log('ContractService retreive - we got the contract')
						contract
							.retreivePassword(hashId)
							.then((encrypted: string) => {
								console.log('ContractService retreive - retreivePassword successful, encrypted :', encrypted)
								resolve({ encrypted })
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
