import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Web3Service } from './web3.service';
import { TxService } from './tx.service';

const tokenArtifacts = require('../../build/contracts/AdvancedToken.json');
const contract = require('truffle-contract');

@Injectable()
export class TokenService {

	Token = contract(tokenArtifacts);
	accounts: any;

	constructor( private web3Ser: Web3Service, private txService: TxService) {
		this.Token.setProvider(web3Ser.web3.currentProvider);
		console.log(tokenArtifacts);
	}

	getContractDetails = (accounts) => {

		this.accounts = accounts;
	  	let token;
	  	let tokenArray = new Array();
	  	let itemsToAdd = [1, 3, 5, 7, 8, 12, 13, 14, 16, 21, 22, 23, 24, 25, 26];

	  	return Observable.create(observer => {
	  		this.Token
	  		  .deployed()
	  		  .then(instance => {
	  		  	console.log(instance);
	  		    token = instance;
	  		    let funcArray = new Array();
	  		    for (var i = 0; i < itemsToAdd.length; i++) {
	  		    	funcArray.push(tokenArtifacts.abi[itemsToAdd[i]]);
	  		    }
	  		    tokenArray.push(tokenArtifacts.abi);
	  		    tokenArray.push(funcArray);
	  		    tokenArray.push(token.address);
	  		    return token.owner.call();
	  		  })
	  		  .then(value => {
	  		  	tokenArray.push(value);
	  		  	return token.name.call();
	  		  })
	  		  .then(value => {
	  		  	tokenArray.push(value);
	  		  	return token.symbol.call();
	  		  })
	  		  .then(value => {
	  		  	tokenArray.push(value);
	  		  	return token.totalSupply.call();
	  		  })
	  		  .then(value => {
	  		  	tokenArray.push(value);
	  		    observer.next(tokenArray)
	  		    observer.complete()
	  		  })
	  		  .catch(e => {
	  		    console.log(e);
	  		    observer.error(e)
	  		  });
	  	})
	};

	approve(_spender, _value): Observable<any>{

		let token;
		return Observable.create(observer => {
		  this.Token
		    .deployed()
		    .then(instance => {
		      token = instance;
		      return token.approve(_spender, _value, {
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

	approveAndCall(_spender, _value, _extraData): Observable<any>{

		let token;
		return Observable.create(observer => {
		  this.Token
		    .deployed()
		    .then(instance => {
		      token = instance;
		      return token.approveAndCall(_spender, _value, _extraData, {
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

	transfer(_to, _value): Observable<any>{

		let token;
		return Observable.create(observer => {
		  this.Token
		    .deployed()
		    .then(instance => {
		      token = instance;
		      return token.transfer(_to, _value, {
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

	transferFrom(_from, _to, _value): Observable<any>{

		let token;
		return Observable.create(observer => {
		  this.Token
		    .deployed()
		    .then(instance => {
		      token = instance;
		      return token.transferFrom(_from, _to, _value, {
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

	mintToken(target, amount): Observable<any>{

		let token;
		return Observable.create(observer => {
		  this.Token
		    .deployed()
		    .then(instance => {
		      token = instance;
		      return token.mintToken(target, amount, {
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

	setPrices(sell, buy): Observable<any>{

		let token;
		return Observable.create(observer => {
		  this.Token
		    .deployed()
		    .then(instance => {
		      token = instance;
		      return token.setPrices(sell, buy, {
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

	freezeAccount(target, freeze): Observable<any>{

		let token;
		return Observable.create(observer => {
		  this.Token
		    .deployed()
		    .then(instance => {
		      token = instance;
		      return token.freezeAccount(target, freeze, {
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

	burn(_value): Observable<any>{

		let token;
		return Observable.create(observer => {
		  this.Token
		    .deployed()
		    .then(instance => {
		      token = instance;
		      return token.burn(_value, {
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

		let token;
		return Observable.create(observer => {
		  this.Token
		    .deployed()
		    .then(instance => {
		      token = instance;
		      return token.transferOwnership(addr, {
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

	buy(amount): Observable<any>{

		let token;
		return Observable.create(observer => {
		  this.Token
		    .deployed()
		    .then(instance => {
		      token = instance;
		      return token.buy({
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

	sell(amount): Observable<any>{

		let token;
		return Observable.create(observer => {
		  this.Token
		    .deployed()
		    .then(instance => {
		      token = instance;
		      return token.sell(amount, {
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

		let token;
		return Observable.create(observer => {
		  this.Token
		    .deployed()
		    .then(instance => {
		      token = instance;
		      return token.endContract({
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

	balanceOf = (addr) => {

	  	let token;

	  	return Observable.create(observer => {
	  		this.Token
	  		  .deployed()
	  		  .then(instance => {
	  		  	console.log(instance);
	  		    token = instance;
	  		    return token.balanceOf.call(addr);
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

	frozenAccount = (condition) => {

	  	let token;

	  	return Observable.create(observer => {
	  		this.Token
	  		  .deployed()
	  		  .then(instance => {
	  		  	console.log(instance);
	  		    token = instance;
	  		    return token.frozenAccount.call(condition);
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
