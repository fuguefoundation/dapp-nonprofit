import { Component, OnInit } from '@angular/core';
import {TxService} from '../../services/tx.service'

@Component({
  selector: 'app-tx',
  templateUrl: './tx.component.html',
  styleUrls: ['./tx.component.css']
})
export class TxComponent implements OnInit {

  constructor(public txService: TxService) { }

  ngOnInit() {
  }

}
