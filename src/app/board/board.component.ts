import { Component, NgZone } from '@angular/core';
import {Web3Service, BoardService} from '../../services/services'
import { canBeNumber } from '../../util/validation';
const devdoc = require('../../assets/docs/board-devdoc.json');
const userdoc = require('../../assets/docs/board-userdoc.json');

declare var window: any;

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent {

	account: any;
	accounts: any;
	canBeNumber = canBeNumber;
	status: string;
	functionSelected: string;
	boardInfo = new Array();
	functionParams = new Array();
	functionIndex: any;
	docs: any;

  constructor(
    private _ngZone: NgZone,
    private web3Service: Web3Service,
    private boardService: BoardService
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
    this.boardService.getContractDetails(this.accounts)
      .subscribe(value => {
      	this.boardInfo = value;
        console.log(value);
      }, e => {this.setStatus('Error getting contract details; see log.')});
  }

  onFunctionSelected = f => {
  	this.functionIndex = f;
  	this.functionParams = [];
  	let functionSelected = this.boardInfo[1][f].name;
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
  	let condition = this.boardInfo[1][f].name;
  	console.log(condition);

	switch (condition) {
		case "addMember":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.boardService.addMember(this.functionParams[0], this.functionParams[1])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error adding member; see log.'))
		  break;

		case "removeMember":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.boardService.removeMember(this.functionParams[0])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error removing member; see log.'))
		  break;

		case "members":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.boardService.members(this.functionParams[0])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		      }, e => this.setStatus('Error checking member; see log.'))
		  break;

		case "proposals":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.boardService.proposals(this.functionParams[0])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		      }, e => this.setStatus('Error checking proposals; see log.'))
		  break;

		case "newProposal":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.boardService.newProposal(this.functionParams[0], this.functionParams[1])
		      .subscribe(() =>{
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error adding new proposal; see log.'))
		  break;

		case "changeVotingRules":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.boardService.changeVotingRules(this.functionParams[0], this.functionParams[1], this.functionParams[2])
		      .subscribe(() =>{
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error changing voting rules; see log.'))
		  break;

		case "vote":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.boardService.vote(this.functionParams[0], this.functionParams[1], this.functionParams[2])
		      .subscribe(() =>{
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error voting; see log.'))
		  break;

		case "executeProposal":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.boardService.executeProposal(this.functionParams[0])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error transferring ownership; see log.'))
		  break;

		case "transferOwnership":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.boardService.transferOwnership(this.functionParams[0])
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error transferring ownership; see log.'))
		  break;

		case "endContract":
		    this.setStatus('Initiating transaction... (please wait)');
		    this.boardService.endContract()
		      .subscribe(res =>{
		      	console.log(res);
		        this.setStatus('Transaction complete!');
		        this.getContractDetails();
		      }, e => this.setStatus('Error on self-destruct; see log.'))
		  break;

		default:
		  console.log('default');
		  break;
	}
  	console.log(f);
  }

  blockExplorerAdr = address => {
	let url = "https://rinkeby.etherscan.io/address/" + address;
	window.open(url, "_system");
  }

  setStatus = message => {
    this.status = message;
  };

}
