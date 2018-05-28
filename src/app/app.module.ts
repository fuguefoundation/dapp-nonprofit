import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CustomNgMaterialModule } from '../services/custom-ng-material.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

import { Web3Service, BoardService, FFService, TokenService, BeneficiaryService, MessageService,
  TxService, EventsService} from '../services/services'
import { AppRoutingModule } from './routing/app-routing.module';

import { PageNotFoundComponent } from './nav/not-found.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { DappComponent } from './dapp/dapp.component';
import { BoardComponent } from './board/board.component';
import { FFComponent } from './ff/ff.component';
import { TokenComponent } from './token/token.component';
import { BeneficiariesComponent } from './beneficiaries/beneficiaries.component';
import { BeneficiaryDetailComponent } from './beneficiary-detail/beneficiary-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { TxComponent } from './tx/tx.component';
import { EventsComponent } from './events/events.component';

const SERVICES = [
  Web3Service,
  BoardService,
  FFService,
  TokenService,
  BeneficiaryService,
  MessageService,
  TxService,
  EventsService
]

@NgModule({
  imports: [
    BrowserModule,
    CustomNgMaterialModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent, PageNotFoundComponent, NavComponent, HomeComponent, DappComponent,
    BoardComponent, FFComponent, TokenComponent, BeneficiariesComponent, BeneficiaryDetailComponent,
    MessagesComponent, TxComponent, EventsComponent
  ],
  providers: [SERVICES],
  bootstrap: [AppComponent]
})
export class AppModule { }
