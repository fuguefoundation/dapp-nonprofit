import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../../services/services'
import { Event } from './event';
declare var window: any;

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, OnDestroy {

	events: Event[];
  eventsArray = new Array();
	eventData = new Array();
	web3: any;
  contract: string;

  constructor(private eventsService: EventsService) {

  }

  ngOnInit(){
  	this.eventsService.getEvents().subscribe(events => {
  		this.events = events;
  		console.log(this.events);
  	});
  }

  onContractSelected(c){
    this.contract = c;
    this.eventsArray = [];
    let eventsArray: Array<Event> = [];

    for (var i = 0; i < this.events.length; i++) {
      if (this.events[i].contract == c) {
        eventsArray.push(this.events[i]);
      }
    }
    this.eventsArray = eventsArray;
    console.log(this.eventsArray);
  }

  onEventSelected(e){
    let data : Array<string> = [this.eventsArray[e].fromBlock, this.eventsArray[e].address, this.eventsArray[e].topic];
  	if(this.eventData.length == 0){
	  	this.eventsService.getEventData(data).subscribe(events => {
	  		this.eventData = this.eventsService.processEventData(events);
	  		console.log(events);
	  		console.log(this.eventData);
	  	});
  	}
  }

  ngOnDestroy(){
  	this.eventData = [];
  }

}
