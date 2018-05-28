import { Component } from '@angular/core';

@Component({
	selector: 'nav',
	template: `
		<mat-toolbar color="primary">
			<button mat-button routerLink="/home">Home</button>
			<button mat-button routerLink="/dapp">dApp</button>
			<button mat-button routerLink="/events">Contract events</button>
			<button mat-button routerLink="/beneficiaries">Who we help</button>
		</mat-toolbar>
	`
})

export class NavComponent {

	constructor(){

	}

}