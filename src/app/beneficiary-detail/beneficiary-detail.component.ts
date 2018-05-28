import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { BeneficiaryService } from '../../services/services'
import { Beneficiary } from '../beneficiaries/beneficiary';

@Component({
  selector: 'beneficiary-detail',
  templateUrl: './beneficiary-detail.component.html',
  styleUrls: ['./beneficiary-detail.component.css']
})
export class BeneficiaryDetailComponent implements OnInit {

	@Input() b: Beneficiary;

  constructor(private route: ActivatedRoute, private bService: BeneficiaryService,
  	private location: Location) {

  }

  ngOnInit() {
  	this.getBeneficiary();
  }

  getBeneficiary(): void {
	  const id = +this.route.snapshot.paramMap.get('id');
	  this.bService.getBeneficiary(id)
	    .subscribe(b => this.b = b);
  }

}
