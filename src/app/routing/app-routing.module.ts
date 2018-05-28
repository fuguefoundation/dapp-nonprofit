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
		component: HomeComponent
	},
	{
		path: 'dapp',
		component: DappComponent
	},
	{
		path: 'beneficiaries',
		component: BeneficiariesComponent
	},
	{
		path: 'beneficiary/:id',
		component: BeneficiaryDetailComponent
	},
	{
		path: 'events',
		component: EventsComponent
	},
	{
		path: '**',
		component: PageNotFoundComponent
	}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
