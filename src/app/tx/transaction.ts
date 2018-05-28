export class Transaction {
	tx: string;
	blockHash: string;
	blockNumber: number;
	contractAddress: string;
	cumulativeGasUsed: number;
	gasUsed: number;
	logs: Array<any>;
}