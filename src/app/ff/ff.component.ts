import { Component, NgZone } from '@angular/core';
import {Web3Service, FFService} from '../../services/services'
import { canBeNumber } from '../../util/validation';
const devdoc = require('../../assets/docs/ff-devdoc.json');
const userdoc = require('../../assets/docs/ff-userdoc.json');
declare var window: any;

@Component({
  selector: 'ff',
  templateUrl: './ff.component.html',
  styleUrls: ['./ff.component.css']
})
export class FFComponent {
	account: any;
	accounts: any;
	canBeNumber = canBeNumber;
	status: string;
	functionSelected: string;
	ffInfo = new Array();
	functionParams = new Array();
	functionIndex: any;
	docs: any;

  constructor(
    private _ngZone: NgZone,
    private web3Service: Web3Service,
    private ffService: FFService,
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
    this.ffService.getContractDetails(this.accounts)
      .subscribe(value => {
      	this.ffInfo = value;
        console.log(value);
      }, e => {this.setStatus('Error getting contract details; see log.')});
  }

  onFunctionSelected = f => {
  	this.functionIndex = f;
  	let functionSelected = this.ffInfo[1][f].name;
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
  	let condition = this.ffInfo[1][f].name;
  	console.log(condition);

	switch (condition) {
		case "addBeneficiary":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.ffService.addBeneficiary(this.functionParams[0], this.functionParams[1])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error adding beneficiary; see log.'))
		  break;

		case "removeBeneficiary":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.ffService.removeBeneficiary(this.functionParams[0])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error removing beneficiary; see log.'))
		  break;

		case "donate":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.ffService.donate(this.functionParams[0], this.functionParams[1], this.functionParams[2])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error donating; see log.'))
		  break;

		case "blockDonor":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.ffService.blockDonor(this.functionParams[0])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error removing beneficiary; see log.'))
		  break;

		case "stopStartDonations":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.ffService.stopStartDonations(this.functionParams[0])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error removing beneficiary; see log.'))
		  break;

		case "transferOwnership":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.ffService.transferOwnership(this.functionParams[0])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error removing beneficiary; see log.'))
		  break;

		case "endContract":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.ffService.endContract()
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error removing beneficiary; see log.'))
		  break;

		case "beneficiaries":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.ffService.beneficiaries(this.functionParams[0])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		      }, e => this.setStatus('Error checking beneficiaries; see log.'))
		  break;

		case "donations":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.ffService.donations(this.functionParams[0])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		      }, e => this.setStatus('Error checking donations; see log.'))
		  break;

		case "donors":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.ffService.donors(this.functionParams[0])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		      }, e => this.setStatus('Error checking donors; see log.'))
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



