declare interface IContractEvent {
	address: string
	topics: string[]
}

export declare interface IContractEventFilterHandler {
	[type: string]: IContractEvent
}

export declare interface IStoreReturnData {
	stored: boolean
}

export declare interface IRetreiveReturnData {
	encrypted: string
}
