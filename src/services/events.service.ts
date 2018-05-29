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
	    obj["hash"] = this.txUrl + data.result[i].transactionHash
	    obj["name"] = this.web3.toAscii(data.result[i].data.substring(194, 258));
	    obj["address"] = '0x' + data.result[i].data.substring(26, 66);
	    obj["timestamp"] = this.timeConverter(this.web3.toDecimal(data.result[i].timeStamp));
	    logArray.push(obj);
	  }
	  console.log(logArray);
	  return logArray;
	}

	processEventData(data): Array<Object>{
	  var logArray = [];
	  for (var i = 0; i < data.result.length; i++) {
	    var obj = {};
	    obj["hash"] = this.txUrl + data.result[i].transactionHash
	    obj["info1"] = this.web3.toAscii(data.result[i].data.substring(194, 258));
	    obj["info2"] = this.web3.toDecimal(data.result[i].data.substring(0, 66));
	    obj["info3"] = this.web3.fromWei(this.web3.toDecimal(data.result[i].data.substring(0, 66)));
	    obj["timestamp"] = this.timeConverter(this.web3.toDecimal(data.result[i].timeStamp));
	    logArray.push(obj);
	  }
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
