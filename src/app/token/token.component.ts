import { Component, NgZone } from '@angular/core';
import {Web3Service, TokenService} from '../../services/services'
import { canBeNumber } from '../../util/validation';
const devdoc = require('../../assets/docs/token-devdoc.json');
const userdoc = require('../../assets/docs/token-userdoc.json');
declare var window: any;

@Component({
  selector: 'token',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.css']
})
export class TokenComponent {

	account: any;
	accounts: any;
	canBeNumber = canBeNumber;
	status: string;
	functionSelected: string;
	tokenInfo = new Array();
	functionParams = new Array();
	functionIndex: any;
	docs: any;

  constructor(
    private _ngZone: NgZone,
    private web3Service: Web3Service,
    private tokenService: TokenService,
    ) {
    this.onReady();
  }

  onReady = () => {

    // Get the initial account balance so it can be displayed.
    this.web3Service.getAccounts().subscribe(accs => {
      this.accounts = accs;
      this.account = this.accounts[0];

      this._ngZone.run(() =>
        this.getContractDetails()
      );
    }, err => alert(err))
  };

  getContractDetails = () => {
    this.tokenService.getContractDetails(this.accounts)
      .subscribe(value => {
      	this.tokenInfo = value;
        console.log(value);
      }, e => {this.setStatus('Error getting contract details; see log.')});
  }


  onFunctionSelected = f => {
  	this.functionIndex = f;
  	this.functionParams = [];
  	let functionSelected = this.tokenInfo[1][f].name;
  	let docArray: Array<string> = [];

	if (devdoc.methods.hasOwnProperty(functionSelected)) {
		docArray.push(devdoc.methods[functionSelected])
	}

	if (userdoc.methods.hasOwnProperty(functionSelected)) {
		docArray.push(userdoc.methods[functionSelected])
	}
	this.docs = docArray;
  }

  executeContract = f => {
  	let condition = this.tokenInfo[1][f].name;
  	console.log(condition);

	switch (condition) {
		case "approve":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.tokenService.approve(this.functionParams[0], this.functionParams[1])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error approving; see log.'))
		  break;

		case "approveAndCall":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.tokenService.approveAndCall(this.functionParams[0], this.functionParams[1], this.functionParams[2])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error approve and call; see log.'))
		  break;

		case "transfer":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.tokenService.transfer(this.functionParams[0], this.functionParams[1])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error tranferring; see log.'))
		  break;

		case "transferFrom":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.tokenService.transferFrom(this.functionParams[0], this.functionParams[1], this.functionParams[2])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error tranferring from; see log.'))
		  break;

		case "mintToken":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.tokenService.mintToken(this.functionParams[0], this.functionParams[1])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error minting token; see log.'))
		  break;

		case "freezeAccount":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.tokenService.freezeAccount(this.functionParams[0], this.functionParams[1])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error freezing account; see log.'))
		  break;

		case "setPrices":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.tokenService.setPrices(this.functionParams[0], this.functionParams[1])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error setting prices; see log.'))
		  break;

		case "burn":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.tokenService.burn(this.functionParams[0])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error burning token; see log.'))
		  break;

		case "buy":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.tokenService.buy(this.functionParams[0])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error buying token; see log.'))
		  break;

		case "sell":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.tokenService.sell(this.functionParams[0])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error selling token; see log.'))
		  break;

		case "transferOwnership":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.tokenService.transferOwnership(this.functionParams[0])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error transferring ownership; see log.'))
		  break;

		case "endContract":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.tokenService.endContract()
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error ending contract; see log.'))
		  break;

		case "balanceOf":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.tokenService.balanceOf(this.functionParams[0])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		      }, e => this.setStatus('Error checking balance; see log.'))
		  break;

		case "frozenAccount":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.tokenService.frozenAccount(this.functionParams[0])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		      }, e => this.setStatus('Error checking frozen account; see log.'))
		  break;

		default:
		  console.log('default');
		  break;
	}
  	console.log(f);
  }

  setStatus = message => {
    this.status = message;
  };

  blockExplorerAdr = address => {
	let url = "https://rinkeby.etherscan.io/address/" + address;
	window.open(url, "_system");
  }
}





