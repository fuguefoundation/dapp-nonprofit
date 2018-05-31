import { Component, NgZone, OnDestroy } from '@angular/core';
import {Web3Service, MessageService} from '../../services/services'

declare var window: any;

@Component({
  selector: 'app-dapp',
  templateUrl: './dapp.component.html',
  styleUrls: ['./dapp.component.css']
})
export class DappComponent implements OnDestroy {

  account: any;
  accounts: any;
  network: any;
  contractSelected: any;

  constructor(
    private _ngZone: NgZone,
    private web3Service: Web3Service,
    private messageService: MessageService
    ) {

    this.onReady();
  }

  onReady = () => {

    // Get the initial account balance so it can be displayed.
    this.web3Service.getAccounts().subscribe(accs => {
      this.accounts = accs;
      this.account = this.accounts[0];

      // This is run from window:load and ZoneJS is not aware of it we
      // need to use _ngZone.run() so that the UI updates on promise resolution
      this._ngZone.run(() =>
        this.web3Service.checkNetwork()
      );
    }, err => alert(err))
  };

  accessContract (c){
  	console.log(c);
    //this.contractService.getContractArtifacts(this.contractSelected, this.accounts);
  };

  ngOnDestroy(){
    this.messageService.clear();
  }

  doSomething(){

  }

}
