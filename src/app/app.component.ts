import { Component } from '@angular/core';
import { Ctrl } from './app.controle'
import * as firebase from 'firebase'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public lojaPainel:any
  constructor(public ctrl:Ctrl ){ }

  title = 'app';

  ngOnInit(): void{
    



    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig =  {
     
      //Banco de dados

   };// faz a conexão com o banco no firebase
 
   firebase.initializeApp(firebaseConfig) //inicia a conexão
   //as regras de negocio fica em autenticacao.service
 
   }

   
 }
 