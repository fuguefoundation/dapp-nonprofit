import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { BENEFICIARIES } from '../app/beneficiaries/mock-beneficiary';
import { Beneficiary } from '../app/beneficiaries/beneficiary';

@Injectable()
export class BeneficiaryService {

	constructor() {

	}

	getBeneficiary(id: number): Observable<Beneficiary> {
	  // TODO: send the message _after_ fetching the beneficiary
	  //this.messageService.add(`BeneficiaryService: fetched beneficiary id=${id}`);
	  return of(BENEFICIARIES.find(b => b.id === id));
	}

	getBeneficiaries(): Observable<Beneficiary[]> {
	  return of(BENEFICIARIES);
	}
}
