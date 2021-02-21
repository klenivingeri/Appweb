import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { FormGroup, FormControl } from '@angular/forms';
import { Autenticacao } from '../../autenticacao.service';
import { Usuario } from '../usuario.model'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [ 
    trigger('luzbotao',[
      state('escondido', style({
        opacity: 1,
        backgroundImage: "url('../../../assets/interface/reflexo.png')",
        background: 'no-repeat',
        'background-position': 'left 500px center',
        backgroundColor:  '#343a40',
        borderRadius: '3px',
        backgroundSize: 'cover',
        height: 50

        
      })),
      state('visivel', style({
        opacity: 1,
        backgroundImage: "url('../../../assets/interface/reflexo.png')",
        background: 'no-repeat',
        'background-position': 'left -500px center',
        backgroundColor:  '#343a40',
        borderRadius: '3px',
        backgroundSize: 'cover',
        height: 50
      })),
      transition('visivel => escondido', animate('800ms  ease-in'))
    ])
  ]
})
export class LoginComponent implements OnInit {
  public luzbtn: string ='visivel'
  public formulario : FormGroup = new FormGroup({
    'email': new FormControl(null),
    'senha': new FormControl(null)
  })
  constructor(public autenticacao: Autenticacao) { }

  ngOnInit() {
    setInterval(() => {
      this.luzbtn = this.luzbtn === 'visivel' ? 'escondido' : 'visivel'
      }, 3000);

  }
  
  
  public autenticar():void{
    this.autenticacao.autenticar(this.formulario.value.email,this.formulario.value.senha)
   
    
  }
  public cadastrarUsuario():void{
    let usuario: Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.senha
    )
    this.autenticacao.cadastrarUsuario(usuario)

  }

}
