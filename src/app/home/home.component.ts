import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations';
import { ActivatedRoute, Params } from '@angular/router'
import { Ctrl } from '../app.controle';
import { Bd } from '../bd.service';
import { CarrinhoService } from '../carrinho.service'
import { ItemCarrinho } from '../shared/item-carrinho.model'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
    ]),trigger('pedido', [
      state('criado', style({
        opacity: 0 //estado final, original da div
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate( 0)' }),
        animate('3000ms 0s ease-in-out', keyframes([
          style({ offset: 0, opacity:1,    marginTop:0}),
          style({ offset: 0.93, opacity:1,   marginTop:0}),
          style({ offset: 1, opacity:1,   marginTop:90}),
 

        ]))// duração, delay e aceleração
      ])

    ]),

    
  ]
})
export class HomeComponent implements OnInit {
  //controle Animações
  public oferta:String = 'ID_Oferta'
  public stEstado:string = 'visivel'
  public stFundo:string = 'visivel'
  public stPedido:string = ''
  public desliza = 1
  public Ctrlpag : any
  public pagina: string = 'Refrigerante'
  public itensCarrinho: any = '231'
  public email: string


    //controle de horario
    public hora: any
    public fechado:boolean
    public abertura :string
    public fechamento :string
    public aberturaf :string
    public fechamentof :string
    public aberturad :string
    public fechamentod :string

  //
  public itemCadastrados : any 
  constructor(public ctrl: Ctrl, private bd : Bd, private route: ActivatedRoute, public carrinhoservice : CarrinhoService) { }


  ngOnInit() {
      this.ctrl.lojaPainel = false
      this.atualizarTimeLIne()
      this.atualizarTime()

      this.mostraItemCarrinho()
      this.route.params.subscribe((parametros: Params) => {
      console.log(parametros)
      this.Ctrlpag = parametros.key

      if(parametros.pedido == 'add'){
        this.stPedido = 'criado'
        setTimeout(()=>{   this.stPedido = ''
        }, 3050);
      }

    })
      
  }

  public atualizarTimeLIne(): void{
    this.bd.consultaItemCadastrado('')
    .then((itemCadastrados: any) =>{
      this.itemCadastrados = itemCadastrados
    })
  }


  mostraBebidas(pag:string){
    this.pagina = pag
    console.log(pag)
  }


  mostraItemCarrinho(){
    this.itensCarrinho = this.carrinhoservice.exibirItens()
    console.log(this.itensCarrinho)
  }




  //  controlador de horario
  public atualizarTime(): void{
    this.bd.consultaHora(this.email)
    .then((hora: any) =>{
      this.hora = hora
     console.log(this.hora)
     this.abertura = this.hora[0].abre
     this.fechamento = this.hora[0].fechamento
     this.aberturaf = this.hora[0].abref
     this.fechamentof = this.hora[0].fechamentof
     this.aberturad = this.hora[0].abred
     this.fechamentod = this.hora[0].fechamentod

     let s1 = parseInt(this.hora[0].abre.replace(":",""))
     let s2 = parseInt(this.hora[0].fechamento.replace(":",""))
     let ss1 = parseInt(this.hora[0].abref.replace(":",""));
     let ss2 = parseInt(this.hora[0].fechamentof.replace(":",""))
     let sss1 = parseInt(this.hora[0].abred.replace(":",""));
     let sss2 = parseInt(this.hora[0].fechamentod.replace(":",""))


     var data = new Date();
     var diaSemana = parseInt(data.getDay().toString())
     var hr   = data.getHours().toString()         // 0-23
     var min  = data.getMinutes().toString()
      
     if(parseInt(min) <10){
       min = "0" + min
     }
     var hrAtual = parseFloat(hr+min)
     
     //controle de dia, e qual hora vai abrir e fechar o carinho de compras
     if(diaSemana >= 1 || diaSemana <= 5){
      console.log(min)
       console.log(hrAtual ,' = ', s1 ,' = ', sss2)
       if(hrAtual >= s1 && hrAtual <= s2 ){
      this.fechado = false
        }else{
          this.fechado = true
        }
     }else if(diaSemana == 6){
      if(hrAtual >= ss1 && hrAtual <= ss2 ){
        this.fechado = false
          }else{
            this.fechado = true
          }
     }else{
      if(hrAtual >= sss1 && hrAtual <= sss2 ){
        this.fechado = false
          }else{
            this.fechado = true
          }
     }
     
    })



  }
}
