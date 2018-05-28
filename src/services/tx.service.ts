import { Injectable } from '@angular/core';
import { Transaction } from '../app/tx/transaction';

@Injectable()
export class TxService {

  //txs: Array<Transaction> = [];
  txs: Array<any> = [];

  constructor() {}

  add(data: any) {
  	// TODO - cast as Transaction object
  	// https://stackoverflow.com/questions/46249472/how-to-push-an-object-into-an-array-with-typescript
    this.txs.push({
		'tx': data.tx,
		'blockHash': data.receipt.blockHash,
		'blockNumber': data.receipt.blockNumber,
		'contractAddress': data.receipt.contractAddress,
		'cumulativeGasUsed': data.receipt.cumulativeGasUsed,
		'gasUsed': data.receipt.gasUsed,
		'logs': data.logs,
    });
    console.log(this.txs);
  }

  addCall(data){
    this.txs.push(data);
  }

  clear() {
    this.txs = [];
  }

  dismiss(index){
    this.txs.splice(index, 1);
  }

  explore(url){
  	console.log(url);
  }

  blockExplorerTx = (tx) => {
    let url = "https://rinkeby.etherscan.io/tx/" + tx;
    window.open(url, "_system");
  }
}