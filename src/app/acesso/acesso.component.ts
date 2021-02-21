import { Component, OnInit, } from '@angular/core';
import { Ctrl } from '../app.controle'
@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css']
})
export class AcessoComponent implements OnInit {

  constructor(public ctrl : Ctrl) { }

  ngOnInit() {
      
  }

}
