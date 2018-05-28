import { Component, OnInit } from '@angular/core';
import {BeneficiaryService} from '../../services/services'
import { Beneficiary } from './beneficiary';

@Component({
  selector: 'app-beneficiaries',
  templateUrl: './beneficiaries.component.html',
  styleUrls: ['./beneficiaries.component.css']
})
export class BeneficiariesComponent implements OnInit {

	bs: Beneficiary[];

  constructor(private bService: BeneficiaryService) {

  }

  ngOnInit() {
  	this.getBeneficiaries();
  }

  getBeneficiaries(): void {
  	this.bService.getBeneficiaries().subscribe(b => this.bs = this.randomizeArray(b));
  }

  randomizeArray(array){
  	var currentIndex = array.length, tempVal, randomIndex;
  	while (0 !== currentIndex){
  		randomIndex = Math.floor(Math.random() * currentIndex);
  		currentIndex -= 1;
  		tempVal = array[currentIndex];
  		array[currentIndex] = array[randomIndex];
  		array[randomIndex] = tempVal;
  	}
  	return array;
  }

  blockExplorerAdr = address => {
    let url = "https://rinkeby.etherscan.io/address/" + address;
    window.open(url, "_system");
  }
}
