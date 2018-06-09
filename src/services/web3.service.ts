import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { environment } from '../environments/environment';

import {MessageService} from './message.service'

const Web3 = require('web3');

declare var window: any;

@Injectable()
export class Web3Service {

	public web3: any;

  constructor(private messageService: MessageService) {
  	this.checkAndInstantiateWeb3();
  }

  checkAndInstantiateWeb3 = () => {
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof window.web3 !== 'undefined') {
      this.web3 = new Web3(window.web3.currentProvider);
      this.messageService.add('Web3 detected from external source');
    } else {
      this.messageService.add('No web3 detected. Falling back to localhost')
      // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
      this.web3 = new Web3(new Web3.providers.HttpProvider(environment.HttpProvider));
    }
  };

  checkNetwork(): void {
    var netID = this.web3.version.network;
    switch (netID) {
      case "1":
        this.messageService.add("You are using MainNet. Please connect to Rinkeby.");
        break;
      case "2":
        this.messageService.add("You are using Morden. Please connect to Rinkeby.");
      case "3":
        this.messageService.add("You are using Ropsten. Please connect to Rinkeby.");
      case "4":
        this.messageService.add("Rinkeby detected, excellent!");
        break;
      default:
        this.messageService.add("Unknown network. Please connect to Rinkeby in Metamask.")
        break;
    }
  }

  getAccounts(): Observable<any>{
  	return Observable.create(observer => {
  	  this.web3.eth.getAccounts((err, accs) => {
  	    if (err != null) {
  	      //observer.error('There was an error fetching your accounts.')
          this.messageService.add('There was an error fetching your accounts.')
  	    }

  	    if (accs.length === 0) {
  	      //observer.error('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.')
          this.messageService.add('Couldn\'t retrieve accounts! Make sure Metamask is unlocked or that your Ethereum client is configured correctly.')
  	    }
  	    observer.next(accs)
  	    observer.complete()
  	  });
  	});
  }

  getWeb3(): any {
    return this.web3;
  }

}
