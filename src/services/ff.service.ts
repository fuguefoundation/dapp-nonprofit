import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Web3Service } from './web3.service'
import { TxService } from './tx.service';

const ffArtifacts = require('../../build/contracts/FugueFoundation.json');
const contract = require('truffle-contract');

@Injectable()
export class FFService {

	FF = contract(ffArtifacts);
	accounts: any;

	constructor( private web3Ser: Web3Service, private txService: TxService) {
		this.FF.setProvider(web3Ser.web3.currentProvider);
		console.log(ffArtifacts);
	}

	getContractDetails = (accounts) => {

		this.accounts = accounts;
	  	let ff;
	  	let ffArray = new Array();
	  	let itemsToAdd = [1, 6, 8, 15, 16, 17, 18, 19, 20, 21];

	  	return Observable.create(observer => {
	  		this.FF
	  		  .deployed()
	  		  .then(instance => {
	  		  	console.log(instance);
	  		    ff = instance;
	  		    let funcArray = new Array();
	  		    for (var i = 0; i < itemsToAdd.length; i++) {
	  		    	funcArray.push(ffArtifacts.abi[itemsToAdd[i]]);
	  		    }
	  		    ffArray.push(ffArtifacts.abi);
	  		    ffArray.push(funcArray);
	  		    ffArray.push(ff.address);
	  		    return ff.owner.call();
	  		  })
	  		  .then(value => {
	  		  	ffArray.push(value);
	  		  	return ff.numDonations.call();
	  		  })
	  		  .then(value => {
	  		  	ffArray.push(value.c[0]);
	  		  	return ff.totalAmountDonated.call();
	  		  })
	  		  .then(value => {
	  		  	ffArray.push(value.c[0]);
	  		    observer.next(ffArray)
	  		    observer.complete()
	  		  })
	  		  .catch(e => {
	  		    console.log(e);
	  		    observer.error(e)
	  		  });
	  	})
	};

	addBeneficiary(addr, name): Observable<any>{

		let ff;
		return Observable.create(observer => {
		  this.FF
		    .deployed()
		    .then(instance => {
		      ff = instance;
		      return ff.addBeneficiary(addr, name, {
		        from: this.accounts[0]
		      });
		    })
		    .then(result => {
		    	console.log(result);
		    	this.txService.add(result);
		      observer.next(result)
		      observer.complete()
		    })
		    .catch(e => {
		    	console.log(e);
		      observer.error(e)
		    });
		})
	};

	removeBeneficiary(addr): Observable<any>{

		let ff;
		return Observable.create(observer => {
		  this.FF
		    .deployed()
		    .then(instance => {
		      ff = instance;
		      return ff.removeBeneficiary(addr, {
		        from: this.accounts[0]
		      });
		    })
		    .then(result => {
		    	console.log(result);
		    	this.txService.add(result);
		      observer.next(result)
		      observer.complete()
		    })
		    .catch(e => {
		    	console.log(e);
		      observer.error(e)
		    });
		})
	};

	donate(id, amount, comment): Observable<any>{

		let ff;
		return Observable.create(observer => {
		  this.FF
		    .deployed()
		    .then(instance => {
		      ff = instance;
		      return ff.donate(id, amount, comment, {
		        from: this.accounts[0],
		        value: amount
		      });
		    })
		    .then(result => {
		    	console.log(result);
		    	this.txService.add(result);
		      observer.next(result)
		      observer.complete()
		    })
		    .catch(e => {
		    	console.log(e);
		      observer.error(e)
		    });
		})
	};

	blockDonor(id): Observable<any>{

		let ff;
		return Observable.create(observer => {
		  this.FF
		    .deployed()
		    .then(instance => {
		      ff = instance;
		      return ff.blockDonor(id, {
		        from: this.accounts[0]
		      });
		    })
		    .then(result => {
		    	console.log(result);
		    	this.txService.add(result);
		      observer.next(result)
		      observer.complete()
		    })
		    .catch(e => {
		    	console.log(e);
		      observer.error(e)
		    });
		})
	};

	stopStartDonations(condition): Observable<any>{

		let ff;
		return Observable.create(observer => {
		  this.FF
		    .deployed()
		    .then(instance => {
		      ff = instance;
		      return ff.stopStartDonations(condition, {
		        from: this.accounts[0]
		      });
		    })
		    .then(result => {
		    	console.log(result);
		    	this.txService.add(result);
		      observer.next(result)
		      observer.complete()
		    })
		    .catch(e => {
		    	console.log(e);
		      observer.error(e)
		    });
		})
	};

	transferOwnership(addr): Observable<any>{

		let ff;
		return Observable.create(observer => {
		  this.FF
		    .deployed()
		    .then(instance => {
		      ff = instance;
		      return ff.transferOwnership(addr, {
		        from: this.accounts[0]
		      });
		    })
		    .then(result => {
		    	console.log(result);
		    	this.txService.add(result);
		      observer.next(result)
		      observer.complete()
		    })
		    .catch(e => {
		    	console.log(e);
		      observer.error(e)
		    });
		})
	};

	endContract(): Observable<any>{

		let ff;
		return Observable.create(observer => {
		  this.FF
		    .deployed()
		    .then(instance => {
		      ff = instance;
		      return ff.endContract( {
		        from: this.accounts[0]
		      });
		    })
		    .then(result => {
		    	console.log(result);
		    	this.txService.add(result);
		      observer.next(result)
		      observer.complete()
		    })
		    .catch(e => {
		    	console.log(e);
		      observer.error(e)
		    });
		})
	};

	beneficiaries = (id) => {
	  	let ff;
	  	return Observable.create(observer => {
	  		this.FF
	  		  .deployed()
	  		  .then(instance => {
	  		  	console.log(instance);
	  		    ff = instance;
	  		    return ff.beneficiaries.call(id);
	  		  })
	  		  .then(value => {
	  		  	this.txService.addCall(value);
	  		    observer.next(value)
	  		    observer.complete()
	  		  })
	  		  .catch(e => {
	  		    console.log(e);
	  		    observer.error(e)
	  		  });
	  	})
	};

	donors = (id) => {
	  	let ff;
	  	return Observable.create(observer => {
	  		this.FF
	  		  .deployed()
	  		  .then(instance => {
	  		  	console.log(instance);
	  		    ff = instance;
	  		    return ff.donors.call(id);
	  		  })
	  		  .then(value => {
	  		  	this.txService.addCall(value);
	  		    observer.next(value)
	  		    observer.complete()
	  		  })
	  		  .catch(e => {
	  		    console.log(e);
	  		    observer.error(e)
	  		  });
	  	})
	};

	donations = (id) => {
	  	let ff;
	  	return Observable.create(observer => {
	  		this.FF
	  		  .deployed()
	  		  .then(instance => {
	  		  	console.log(instance);
	  		    ff = instance;
	  		    return ff.donations.call(id);
	  		  })
	  		  .then(value => {
	  		  	this.txService.addCall(value);
	  		    observer.next(value)
	  		    observer.complete()
	  		  })
	  		  .catch(e => {
	  		    console.log(e);
	  		    observer.error(e)
	  		  });
	  	})
	};
}
