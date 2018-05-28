import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Web3Service } from './web3.service'
import {MessageService} from './message.service'
import {TxService} from './tx.service'

const boardArtifacts = require('../../build/contracts/BoardOfDirectors.json');
const contract = require('truffle-contract');

@Injectable()
export class BoardService {

	Board = contract(boardArtifacts);
	accounts: any;

	constructor(private web3Ser: Web3Service, private messageService: MessageService,
		private txService: TxService) {
		this.Board.setProvider(web3Ser.web3.currentProvider);
		console.log(boardArtifacts);
	}

	getContractDetails = (accounts) => {

		this.accounts = accounts;
	  	let board;
	  	let boardArray = new Array();
	  	let itemsToAdd = [0, 3, 8, 15, 16, 17, 18, 19, 20, 21];

	  	return Observable.create(observer => {
	  		this.Board
	  		  .deployed()
	  		  .then(instance => {
	  		  	console.log(instance);
	  		    board = instance;
	  		    let funcArray = new Array();
	  		    for (var i = 0; i < itemsToAdd.length; i++) {
	  		    	funcArray.push(boardArtifacts.abi[itemsToAdd[i]]);
	  		    }
	  		    boardArray.push(boardArtifacts.abi);
	  		    boardArray.push(funcArray);
	  		    boardArray.push(board.address);
	  		    return board.owner.call();
	  		  })
	  		  .then(value => {
	  		  	boardArray.push(value);
	  		  	return board.minimumQuorum.call();
	  		  })
	  		  .then(value => {
	  		  	boardArray.push(value.c[0]);
	  		  	return board.debatingPeriodInMinutes.call();
	  		  })
	  		  .then(value => {
	  		  	boardArray.push(value.c[0]);
	  		  	return board.majorityMargin.call();
	  		  })
	  		  .then(value => {
	  		  	boardArray.push(value.c[0]);
	  		  	return board.numProposals.call();
	  		  })
	  		  .then(value => {
	  		  	boardArray.push(value.c[0]);
	  		    observer.next(boardArray)
	  		    observer.complete()
	  		  })
	  		  .catch(e => {
	  		    console.log(e);
	  		    observer.error(e)
	  		  });
	  	})
	};

	members = (index) => {

	  	let board;

	  	return Observable.create(observer => {
	  		this.Board
	  		  .deployed()
	  		  .then(instance => {
	  		  	console.log(instance);
	  		    board = instance;
	  		    return board.members.call(index);
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

	proposals = (index) => {

	  	let board;

	  	return Observable.create(observer => {
	  		this.Board
	  		  .deployed()
	  		  .then(instance => {
	  		  	console.log(instance);
	  		    board = instance;
	  		    return board.proposals.call(index);
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

	addMember(target, name): Observable<any>{

		let board;
		return Observable.create(observer => {
		  this.Board
		    .deployed()
		    .then(instance => {
		      board = instance;
		      return board.addMember(target, name, {
		        from: this.accounts[0]
		      });
		    })
		    .then(result => {
		    	this.txService.add(result);
		    	console.log(result);
		      observer.next(result)
		      observer.complete()
		    })
		    .catch(e => {
		    	console.log(e);
		      observer.error(e)
		    });
		})
	}

	removeMember(target): Observable<any>{

		let board;
		return Observable.create(observer => {
		  this.Board
		    .deployed()
		    .then(instance => {
		      board = instance;
		      return board.removeMember(target, {
		        from: this.accounts[0]
		      });
		    })
		    .then(result => {
		    	this.txService.add(result);
		    	console.log(result);
		      observer.next(result)
		      observer.complete()
		    })
		    .catch(e => {
		    	console.log(e);
		      observer.error(e)
		    });
		})
	}

	newProposal(target, name): Observable<any>{

		let board;
		return Observable.create(observer => {
		  this.Board
		    .deployed()
		    .then(instance => {
		      board = instance;
		      return board.newProposal(target, name, {
		        from: this.accounts[0]
		      });
		    })
		    .then(result => {
		    	this.txService.add(result);
		    	console.log(result);
		      observer.next(result)
		      observer.complete()
		    })
		    .catch(e => {
		    	console.log(e);
		      observer.error(e)
		    });
		})
	}

	changeVotingRules(quorum, minutes, margin): Observable<any>{

		let board;
		return Observable.create(observer => {
		  this.Board
		    .deployed()
		    .then(instance => {
		      board = instance;
		      return board.changeVotingRules(quorum, minutes, margin, {
		        from: this.accounts[0]
		      });
		    })
		    .then(result => {
		    	this.txService.add(result);
		    	console.log(result);
		      observer.next(result)
		      observer.complete()
		    })
		    .catch(e => {
		    	console.log(e);
		      observer.error(e)
		    });
		})
	}

	vote(id, support, justification): Observable<any>{

		let board;
		return Observable.create(observer => {
		  this.Board
		    .deployed()
		    .then(instance => {
		      board = instance;
		      return board.vote(id, support, justification, {
		        from: this.accounts[0]
		      });
		    })
		    .then(result => {
		    	this.txService.add(result);
		    	console.log(result);
		      observer.next(result)
		      observer.complete()
		    })
		    .catch(e => {
		    	console.log(e);
		      observer.error(e)
		    });
		})
	}

	executeProposal(id): Observable<any>{

		let board;
		return Observable.create(observer => {
		  this.Board
		    .deployed()
		    .then(instance => {
		      board = instance;
		      return board.executeProposal(id, {
		        from: this.accounts[0]
		      });
		    })
		    .then(result => {
		    	this.txService.add(result);
		    	console.log(result);
		      observer.next(result)
		      observer.complete()
		    })
		    .catch(e => {
		    	console.log(e);
		      observer.error(e)
		    });
		})
	}

	transferOwnership(target): Observable<any>{

		let board;
		return Observable.create(observer => {
		  this.Board
		    .deployed()
		    .then(instance => {
		      board = instance;
		      return board.transferOwnership(target, {
		        from: this.accounts[0]
		      });
		    })
		    .then(result => {
		    	this.txService.add(result);
		    	console.log(result);
		      observer.next(result)
		      observer.complete()
		    })
		    .catch(e => {
		    	console.log(e);
		      observer.error(e)
		    });
		})
	}

	endContract(): Observable<any>{

		let board;
		return Observable.create(observer => {
		  this.Board
		    .deployed()
		    .then(instance => {
		      board = instance;
		      return board.endContract({
		        from: this.accounts[0]
		      });
		    })
		    .then(result => {
		    	this.txService.add(result);
		    	console.log(result);
		      observer.next(result)
		      observer.complete()
		    })
		    .catch(e => {
		    	console.log(e);
		      observer.error(e)
		    });
		})
	}
}
