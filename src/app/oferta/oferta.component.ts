import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router'
import { trigger, state, style, transition, animate, keyframes} from '@angular/animations'
import { CarrinhoService } from '../carrinho.service'
import { Bd } from '../bd.service'
import { Router } from '@angular/router' 
import { Produto } from '../shared/produto.model'
import { connectableObservableDescriptor } from 'rxjs/observable/ConnectableObservable';


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  animations: [
    trigger('luzbotao',[
      state('escondido', style({
        backgroundImage: "url('../../assets/interface/reflexo.png')",
        opacity: 1,
        'background-position': 'left 500px center',
        background: 'no-repeat',
        backgroundColor:  '#ff4136',
        borderRadius: '3px'
        
      })),
      state('visivel', style({
        
        backgroundImage: "url('../../assets/interface/reflexo.png')",
        background: 'no-repeat',
        'background-position': 'left -500px center',
        backgroundColor:  '#ff4136',
        borderRadius: '3px'
      })),
      transition('visivel => escondido', animate('800ms  ease-in'))
    ]),
    trigger('menu', [
      state('visivel', style({
        opacity: 1
      })),
      transition('void => visivel', [
        style({
        opacity: 0,
        marginBottom: -20,
        'height':'50px' ,
        'width':'100%'
       }),
        animate('300ms 300ms ease-in-out')// duração, delay e aceleração
      ])
    ]),
    trigger('inicio', [
      state('visivel', style({
        opacity: 1
      })),
      transition('void => visivel', [
        style({
          opacity: 0,
          marginTop: 20
        }),
        animate('300ms 300ms ease-in-out')// duração, delay e aceleração
      ])
    ]),
    trigger('capa', [
      state('visivel', style({
        opacity: 1
      })),
      transition('void => visivel', [
        style({
        opacity: 0,
        marginTop: -20
       }),
        animate('300ms 300ms ease-in-out')// duração, delay e aceleração
      ])
    ]),trigger('animacao-bag', [
      state('criado', style({
        opacity: 1 //estado final, original da div
      })),
      transition('void => criado', [
        style({ opacity: 1, transform: 'translate( 0)' }),
        animate('500ms 0s ease-in-out', keyframes([
          style({ offset: 0.10, opacity:1, transform:'translateX(0)'}),

          style({ offset: 0.35, opacity:1, transform:'translateX(10px)',}),
          style({ offset: 0.45, opacity:1, transform:'translateY(-5px)'}),
          style({ offset: 0.65, opacity:1, transform:'rotate(15deg)'}),
          style({ offset: 0.75, opacity:1, transform:'translateX(-10px)',}),
          style({ offset: 0.85, opacity:1, transform:'rotate(-15deg)'}),
          style({ offset: 0.90, opacity:1, transform:'translateY(-5px)'}),
          style({ offset: 0.95, opacity:1, transform:'rotate(0deg)'}),

          style({ offset: 1, opacity:1, transform:'translateX(0)'})

        ]))// duração, delay e aceleração
      ])

    ]),
    trigger('adicionado', [
      state('criado', style({
        opacity: 0 //estado final, original da div
      })),
      transition('void => criado', [
        style({ opacity: 0, transform: 'translate( 0)' }),
        animate('1000ms 0s ease-in-out', keyframes([
          style({ offset: 0.30, opacity:1,  'font-size':'25px' , marginTop:-90}),
          style({ offset: 0.40, opacity:1,  'font-size':'25px' , marginTop:-85}),
          style({ offset: 0.50, opacity:1,  'font-size':'25px' , marginTop:-90}),
          style({ offset: 0.60, opacity:1,  'font-size':'25px' , marginTop:-85}),
          style({ offset: 0.70, opacity:1,  'font-size':'25px' , marginTop:-90}),
          style({ offset: 0.99, opacity:1,  'font-size':'25px' , marginTop:-90}),
          style({ offset: 1, opacity:0, transform:'translateX(0)'})

        ]))// duração, delay e aceleração
      ])

    ]),
    

  ]
})
export class OfertaComponent implements OnInit {
  //controle de animação
  public stMenu: string ='visivel'
  public stInicio: string ='visivel'
  public stCapa: string ='visivel'
  public stBag: string ='criado'
  public luzbtn: string ='visivel'
  
  public adcNoCarrinho: boolean = true
  public adcNoCarrinhox: boolean = true


  // dados
  public oferta: any
  public valorOferta: number
  public valorOfertaAdd: number = 0
  public totalAdd: any = 0
  constructor(private bd: Bd, private route: ActivatedRoute, public carrinhoService:CarrinhoService, public router: Router ) {

    
   }



  ngOnInit() {
    window.scroll({  top: 0,   left: 0,  behavior: 'smooth'   });
    
    this.route.params.subscribe((parametros: Params) => {
        
      console.log(parametros)
      this.bd.consultaItemCadastrado(parametros.key)
        .then((oferta: Produto[]) => {
          
          oferta.map((item: any) =>{
            if(item.key == parametros.key ){
              this.oferta = item
              if(this.oferta.oferta != 0){
                this.valorOferta = parseFloat(this.oferta.oferta)
              }else{
                this.valorOferta = parseFloat(this.oferta.valor)
              }
              this.valorOfertaAdd = this.valorOferta
              console.log()
            }
          })
        })
    })


    setInterval(() => {
      this.luzbtn = this.luzbtn === 'visivel' ? 'escondido' : 'visivel'
      }, 3000);


  }

  maisLanche(){
    this.oferta.quantidade += 1

     this.totalAdicionais()
     

  }

  menosLanche(){
    this.oferta.quantidade -= 1
  
    if(this.oferta.quantidade <= 1){
      this.oferta.quantidade = 1
      this.totalAdicionais()
    }
    this.totalAdicionais()
  }


  maisAdicionais(add:any){
   add.quantidade += 1
   this.totalAdd = 0
   this.totalAdicionais()
  }

  totalAdicionais(){
    this.totalAdd = 0
    let add:number
    this.oferta.adicionais.map((item: any) =>{
    this.totalAdd += this.oferta.quantidade *(item.quantidade * item.valor)
    })
    //console.log(this.totalAdd)
    let valor = this.oferta.quantidade * this.valorOferta 
    this.valorOfertaAdd = valor + this.totalAdd
  }


  menosAdicionais(add:any){
    if(add.quantidade <= 0){
      add.quantidade = 0
    }else{
      add.quantidade -=1
    }
    this.totalAdd = 0
    this.totalAdicionais()
  }


  public adicionarItemCarrinho(modelo:string): void{
   
    this.oferta.valor = this.valorOferta
    this.oferta.oferta = this.valorOfertaAdd
    this.carrinhoService.incluirItem(this.oferta)
    this.carrinhoService.totalCarrinhoCompras()
    //console.log(this.carrinhoService.exibirItens())
  this.adicionarNoCarrinho(modelo)
  }








  //Controle de botões
  adicionarNoCarrinho(modelo:string){
    this.adcNoCarrinho = this.adcNoCarrinho === true ? false : true 
    this.adcNoCarrinhox = this.adcNoCarrinhox === true ? false : true 
    setTimeout(()=>{   this.adcNoCarrinho = true
      this.adcNoCarrinhox = true
      this.router.navigate(['/home',modelo,'add']);
    }, 1000);
  }



}
