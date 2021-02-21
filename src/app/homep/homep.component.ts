import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate} from '@angular/animations';
import { Ctrl } from '../app.controle';
import { Bd } from '../bd.service';
import { ActivatedRoute, Params } from '@angular/router'
import { Horario } from '../shared/horario.model'


@Component({
  selector: 'app-homep',
  templateUrl: './homep.component.html',
  styleUrls: ['./homep.component.css'],
  animations: [ 
    trigger('entrada', [
      state('visivel', style({
        opacity: 1
      })),
      transition('void => visivel', [
        style({ opacity: 0,


       }),
        animate('800ms 300ms ease-in-out')// duração, delay e aceleração
      ])
    ]),

    
  ]
})
export class HomepComponent implements OnInit {
  //controle Animações
  public oferta:String = 'ID_Oferta'
  public stEstado:string = 'visivel'
  public stFundo:string = 'visivel'
  public deslize:number = 1
  public Ctrlpag: any 

  public abertura: any     = '00:00'
  public fechamento: any   = '00:00'
  public aberturaf: any    = '00:00'
  public fechamentof: any  = '00:00'
  public aberturad: any    = '00:00'
  public fechamentod: any  = '00:00'
  public hora: any
  public controlaform: any = true
  public email: string
  

  //
  public itemCadastrados : any 
  constructor(public ctrl: Ctrl, private bd : Bd, private route: ActivatedRoute) { }


  ngOnInit() {
      this.ctrl.lojaPainel = true
      this.atualizarTimeLIne()
      this.atualizarTime()
      
      this.route.params.subscribe((parametros: Params) => {
        console.log(parametros)
        this.Ctrlpag = parametros.key
    
      })
        
    
      
  }

  public atualizarTimeLIne(): void{
    this.bd.consultaItemCadastrado('')
    .then((itemCadastrados: any) =>{
      this.itemCadastrados = itemCadastrados
    })
  }


  
  

  public desliza(item:any):void{
    this.bd.ativaPedido(item)
    

  //  let ok = confirm("Deletar arquivo?");
   // if(ok){
     // this.bd.excluirProduto(key)
      //this.atualizarTimeLIne()
    //}

  }










//Controla hora
public Abertura(num: string):void{
  this.abertura = num
  console.log(this.abertura)
}
public Fechamento(num: string):void{
  this.fechamento = num
  console.log(this.fechamento)
}
public AberturaF(num: string):void{
  this.aberturaf = num
  console.log(this.aberturaf)
}
public FechamentoF(num: string):void{
  this.fechamentof = num
  console.log(this.fechamentof)
}

public AberturaD(num: string):void{
  this.aberturad = num
  console.log(this.aberturad)
}
public FechamentoD(num: string):void{
  this.fechamentod = num
  console.log(this.fechamentod)
}

  public confirmaTime(){
    alert('Gravado')
  
    
    if(this.hora.length == 1){

      this.hora.map((hora:any) =>{
        if(this.abertura == '00:00'){
          this.abertura = hora.abre
        }
        if(this.fechamento == '00:00'){
          this.fechamento = hora.fechamento
        }
        if(this.aberturaf == '00:00'){
          this.aberturaf = hora.abref
        }
        if(this.fechamentof == '00:00'){
          this.fechamentof = hora.fechamentof
        }
        if(this.aberturad == '00:00'){
          this.aberturad = hora.abred
        }
        if(this.fechamentod == '00:00'){
          this.fechamentod = hora.fechamentod
        }
      })


      this.bd.uploadHr({
        email: this.email,
        key: this.hora[0].key,
        abre:this.abertura,
        fecha:this.fechamento,
        abref:this.aberturaf,
        fechaf:this.fechamentof,
        abred:this.aberturad,
        fechad:this.fechamentod
      })
      console.log('entrei')
    }else{
    this.bd.horario({
      email:this.email,
      abre:this.abertura,
      fecha:this.fechamento,
      abref:this.aberturaf,
      fechaf:this.fechamentof,
      abred:this.aberturad,
      fechad:this.fechamentod,})
    }
      
  }


  public atualizarTime(): void{
    this.bd.consultaHora(this.email)
    .then((hora: any) =>{
      this.hora = hora
     console.log(this.hora.length)
     
     
     this.hora.length == 0 ? this.controlaform = true : this.controlaform = false
    })



  }


}