import { Component } from '@angular/core';

@Component({
	selector: 'nav',
	template: `
		<mat-toolbar color="primary">
			<button mat-button routerLink="/home">Home</button>
			<button mat-button routerLink="/dapp">dApp</button>
			<button mat-button routerLink="/events">Events</button>
			<button mat-button routerLink="/beneficiaries">Beneficiary</button>
		</mat-toolbar>
	`
})

export class NavComponent {

	constructor(){

	}

}