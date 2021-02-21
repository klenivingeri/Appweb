import { Component, OnInit,  } from '@angular/core';
import { trigger, state, style, transition, animate} from '@angular/animations';
import { Ctrl } from '../app.controle'

@Component({
  selector: 'app-alto',
  templateUrl: './alto.component.html',
  styleUrls: ['./alto.component.css'],
  animations:[
    trigger('banner',[
      state('escondido', style({
        opacity: 0,
        height: 0,
        marginTop:-50,
        
        'position': 'absolute',
        'z-index': '-99'
      })),
      state('visivel', style({
        opacity: 1
      })),
      transition('escondido <=> visivel', animate('0.5s ease-in'))
    ]),
    trigger('conteudo',[
      state('escondido', style({
        opacity: 0,
        marginTop:-50,
        'position': 'absolute',
        'z-index': '-99'
      })),
      state('visivel', style({
        opacity: 1
      })),
      transition('escondido <=> visivel', animate('0.5s ease-in'))
    ]),
    trigger('botao',[
      state('escondido', style({
        opacity: 1,
        border: '1px solid rgb(241, 241, 241);',
        

      })),
      state('visivel', style({
        opacity: 1,
        
      })),
      transition('escondido <=> visivel', animate('0.5s ease-in'))
    ])
  ]
})

export class AltoComponent implements OnInit {

  public estado: string = 'visivel'
  public stConteudo: string = 'visivel'
  public stBotao: string = 'visivel'
  public ctrlBotao: boolean = true

  constructor(public ctrl : Ctrl) { 
    setTimeout(()=>{   
      this.estado = 'escondido'
      this.stConteudo = 'escondido'
      this.stBotao = 'escondido'
      this.ctrlBotao = false
    }, 2500);
  }

  ngOnInit() {
  }

   toggleButton():void{
    this.estado = this.estado === 'visivel' ? 'escondido' : 'visivel'
    this.stConteudo = this.stConteudo === 'visivel' ? 'escondido' : 'visivel'
    this.stBotao = this.stBotao === 'visivel' ? 'escondido' : 'visivel'
    this.ctrlBotao = this.ctrlBotao === true ? false : true
    console.log(this.stBotao)
  }

}
