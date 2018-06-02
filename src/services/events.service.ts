import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { catchError, map, tap } from 'rxjs/operators';
import { EVENTSDATA } from '../app/events/events-data';
import { Event } from '../app/events/event';
import { MessageService } from './message.service'
import { Web3Service } from './web3.service'
import { etherscan } from '../../constants/constants';

@Injectable()
export class EventsService {

	private apiKey = etherscan.key; //replace
	private apiUrl: Array<string> = ["https://api-rinkeby.etherscan.io/api?module=logs&action=getLogs&fromBlock=", "&toBlock=latest&address=", "&topic0=", "&apikey="];
	private txUrl: string = "https://rinkeby.etherscan.io/tx/";
	private web3;

	constructor(private http: HttpClient, private messageService: MessageService,
		private web3Service: Web3Service) {
		this.web3 = this.web3Service.getWeb3();
	}

	getEventData (data): Observable<any> {
		let url = this.apiUrl[0] + data[0] + this.apiUrl[1] + data[1] + this.apiUrl[2] + data[2] + this.apiUrl[3] + this.apiKey;
	    return this.http.get<any>(url).pipe(
	  	  tap(events => this.log(`fetched events`)),
	      catchError(this.handleError('getEventData', []))
	    );
	}

	getEvents(): Observable<Event[]> {
	  return of(EVENTSDATA);
	}

	processBeneficiaryAdded(data): Array<Object>{
		console.log(data);
	  var logArray = [];
	  for (var i = 0; i < data.result.length; i++) {
	    var obj = {};
	    obj["tx"] = this.txUrl + data.result[i].transactionHash
	    obj["name"] = this.web3.toAscii(data.result[i].data.substring(194, 258));
	    obj["address"] = '0x' + data.result[i].data.substring(26, 66);
	    obj["timestamp"] = this.timeConverter(this.web3.toDecimal(data.result[i].timeStamp));
	    logArray.push(obj);
	  }
	  console.log(logArray);
	  return logArray;
	}

	processDonorAdded(data): Array<Object>{
		console.log(data);
	  var logArray = [];
	  for (var i = 0; i < data.result.length; i++) {
	    var obj = {};
	    obj["tx"] = this.txUrl + data.result[i].transactionHash
	    obj["amountWei"] = this.web3.toDecimal('0x' + data.result[i].data.substring(130, 194));
	    obj["amountEther"] = this.web3.fromWei(this.web3.toDecimal('0x' + data.result[i].data.substring(130, 194)));
	    obj["address"] = '0x' + data.result[i].data.substring(26, 66);
	    obj["timestamp"] = this.timeConverter(this.web3.toDecimal(data.result[i].timeStamp));
	    logArray.push(obj);
	  }
	  console.log(logArray);
	  return logArray;
	  //return logArray;
	}

	processDonationAdded(data): Array<Object>{
		console.log(data);
	  var logArray = [];
	  for (var i = 0; i < data.result.length; i++) {
	    var obj = {};
	    obj["tx"] = this.txUrl + data.result[i].transactionHash
	    obj["donorAddr"] = '0x' + data.result[i].data.substring(90, 130);
	    obj["beneficiaryAddr"] = '0x' + data.result[i].data.substring(154, 194);
	    obj["amountWei"] = this.web3.toDecimal('0x' + data.result[i].data.substring(194, 258));
	    obj["amountEther"] = this.web3.fromWei(this.web3.toDecimal('0x' + data.result[i].data.substring(194, 258)));
	    obj["message"] = this.web3.toAscii(data.result[i].data.substring(450, 514));
	    obj["timestamp"] = this.timeConverter(this.web3.toDecimal(data.result[i].timeStamp));
	    logArray.push(obj);
	  }
	  console.log(logArray);
	  return logArray;
	}

	processVotingRulesChanged(data): Array<Object>{
		console.log(data);
	  var logArray = [];
	  for (var i = 0; i < data.result.length; i++) {
	    var obj = {};
	    obj["tx"] = this.txUrl + data.result[i].transactionHash
	    obj["quorum"] = this.web3.toDecimal(data.result[i].data.substring(0, 66));
	    obj["minutes"] = this.web3.toDecimal('0x' + data.result[i].data.substring(66, 130));
	    obj["margin"] = this.web3.toDecimal('0x' + data.result[i].data.substring(130, 194));
	    obj["timestamp"] = this.timeConverter(this.web3.toDecimal(data.result[i].timeStamp));
	    logArray.push(obj);
	  }
	  return logArray;
	}

	processMemberAdded(data): Array<Object>{
		console.log(data);
	  var logArray = [];
	  for (var i = 0; i < data.result.length; i++) {
	    var obj = {};
	    obj["tx"] = this.txUrl + data.result[i].transactionHash
	    obj["memberAddr"] = '0x' + data.result[i].data.substring(26, 66);
	    var temp = this.web3.toDecimal('0x' + data.result[i].data.substring(66, 130));
	    temp == 1 ? obj["isMember"] = "true" : obj["isMember"] = "false";
	    obj["timestamp"] = this.timeConverter(this.web3.toDecimal(data.result[i].timeStamp));
	    logArray.push(obj);
	  }
	  console.log(logArray);
	  return logArray;
	}

	processProposalAdded(data): Array<Object>{
		console.log(data);
	  var logArray = [];
	  for (var i = 0; i < data.result.length; i++) {
	    var obj = {};
	    obj["tx"] = this.txUrl + data.result[i].transactionHash
	    obj["proposalID"] = this.web3.toDecimal(data.result[i].data.substring(0, 66));
	    obj["proposalAddr"] = '0x' + data.result[i].data.substring(90, 130);
	    var strLength = data.result[i].length;
	    obj["description"] = this.web3.toAscii(data.result[i].data.substring(258, strLength));
	    obj["timestamp"] = this.timeConverter(this.web3.toDecimal(data.result[i].timeStamp));
	    logArray.push(obj);
	  }
	  console.log(logArray);
	  return logArray;
	}

	processVoteCast(data): Array<Object>{
		console.log(data);
	  var logArray = [];
	  for (var i = 0; i < data.result.length; i++) {
	    var obj = {};
	    obj["tx"] = this.txUrl + data.result[i].transactionHash
	    obj["address"] = '0x' + data.result[i].data.substring(90, 130);
	    obj["proposalID"] = this.web3.toDecimal('0x' + data.result[i].data.substring(194, 258));
	    obj["position"] = this.web3.toAscii(data.result[i].data.substring(450, 514));
	    obj["justification"] = this.web3.toAscii(data.result[i].data.substring(450, 514));
	    obj["timestamp"] = this.timeConverter(this.web3.toDecimal(data.result[i].timeStamp));
	    logArray.push(obj);
	  }
	  console.log(logArray);
	  return logArray;
	}

	processTokenTransfer(data): Array<Object>{
		console.log(data);
	  var logArray = [];
	  for (var i = 0; i < data.result.length; i++) {
	    var obj = {};
	    obj["tx"] = this.txUrl + data.result[i].transactionHash
	    obj["fromAddr"] = '0x' + data.result[i].topics[1].substring(26, 66);
	    obj["toAddr"] = '0x' + data.result[i].topics[2].substring(26, 66);
	    obj["tokenAmount"] = this.web3.toDecimal(data.result[i].data);
	    obj["timestamp"] = this.timeConverter(this.web3.toDecimal(data.result[i].timeStamp));
	    logArray.push(obj);
	  }
	  console.log(logArray);
	  return logArray;
	}

	timeConverter(UNIX_timestamp){
		var a = new Date(UNIX_timestamp * 1000);
		var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
		var year = a.getFullYear();
		var month = months[a.getMonth()];
		var date = a.getDate();
		var hour = a.getHours();
		var min = a.getMinutes() < 10 ? '0' + a.getMinutes() : a.getMinutes();
		var sec = a.getSeconds() < 10 ? '0' + a.getSeconds() : a.getSeconds();
		var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
		return time;
	}

	private handleError<T> (operation = 'operation', result?: T) {
	  return (error: any): Observable<T> => {

	    // TODO: send the error to remote logging infrastructure
	    console.error(error);

	    // TODO: better job of transforming error for user consumption
	    this.log(`${operation} failed: ${error.message}`);

	    // Let the app keep running by returning an empty result.
	    return of(result as T);
	  };
	}

	private log(message: string) {
	  this.messageService.add('EventService: ' + message);
	}
}
