import { NgModule }      from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { DappComponent } from '../dapp/dapp.component';
import { HomeComponent } from '../home/home.component';
import { BeneficiariesComponent } from '../beneficiaries/beneficiaries.component';
import { BeneficiaryDetailComponent } from '../beneficiary-detail/beneficiary-detail.component';
import { EventsComponent } from '../events/events.component';
import { PageNotFoundComponent } from '../nav/not-found.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/dapp',
		pathMatch: 'full'
	},
	{
		path: 'home',
		component: HomeComponent,
		data: {title: "Home | Fugue Foundation"}
	},
	{
		path: 'dapp',
		component: DappComponent,
		data: {title: "dApp | Fugue Foundation"}
	},
	{
		path: 'beneficiaries',
		component: BeneficiariesComponent,
		data: {title: "Beneficiaries | Fugue Foundation"}
	},
	{
		path: 'beneficiary/:id',
		component: BeneficiaryDetailComponent,
		data: {title: "Beneficiary | Fugue Foundation"}
	},
	{
		path: 'events',
		component: EventsComponent,
		data: {title: "Events | Fugue Foundation"}
	},
	{
		path: '**',
		component: PageNotFoundComponent,
		data: {title: "404 | Fugue Foundation"}
	}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
