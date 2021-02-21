import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { ItemCarrinho } from '../shared/item-carrinho.model'
import { CarrinhoService } from '../carrinho.service'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Bd } from '../bd.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css'],
  animations: [ 
    trigger('luzbotao',[
      state('escondido', style({
        opacity: 1,
        backgroundImage: "url('../../assets/interface/reflexo.png')",
        background: 'no-repeat',
        'background-position': 'left 500px center',
        backgroundColor:  '#343a40',
        borderRadius: '3px'
        
      })),
      state('visivel', style({
        opacity: 1,
        backgroundImage: "url('../../assets/interface/reflexo.png')",
        background: 'no-repeat',
        'background-position': 'left -500px center',
        backgroundColor:  '#343a40',
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
    ])
  ]
})
export class CarrinhoComponent implements OnInit {
  //controle Animação
  public produto: any = [1,2,3,4]
  public stMenu: string = 'visivel'
  public stInicio: string = 'visivel'
  public luzbtn: string ='visivel'

  //dados
  public dadosJSONObj: any = ''
  public textowhatsap : string = ''
  public avisoDomingo: string
  public email: string

  //dados carrinho
  public itensCarrinho: ItemCarrinho[]
  public valorOfertaAdd: number
  public totalAdd: any = 0
  public itensDoCarrinho: string = ''
  public pagCarrinho = true
  public somaItensCarrinho:number = 0
  public contaItem:number = 0


  //hora
  public hora: any
  public fechado:boolean
  public abertura :string
  public fechamento :string
  public aberturaf :string
  public fechamentof :string
  public aberturad :string
  public fechamentod :string


  public formulario : FormGroup = new FormGroup({
    'nome': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(120)]),
    'modalidade': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(120)]),
    'retirada': new FormControl(null, [Validators.required, Validators.minLength(2), Validators.maxLength(120)]),
    'bairro': new FormControl(null),
    'rua': new FormControl(null),
    'numero': new FormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(10)]),
    'troco': new FormControl(null, Validators.required),
    'trocoSN' : new FormControl(null,Validators.required),
    'complemento': new FormControl(null),
    'cep': new FormControl(null),
    'formaPagamento': new FormControl(null, Validators.required),
  })

  constructor(public carrinhoService: CarrinhoService, private bd: Bd) { }

  ngOnInit() {
    window.scroll({  top: 0,   left: 0,  behavior: 'smooth'   });

    this.itensCarrinho = this.carrinhoService.exibirItens().reverse()
    this.somaItens()
    
  
    setInterval(() => {
      this.luzbtn = this.luzbtn === 'visivel' ? 'escondido' : 'visivel'
      }, 3000);
  }

  maisAdicionais(add:any, oferta:any){
    add.quantidade += 1
    this.totalAdd = 0
    this.totalAdicionais(oferta)
   }
 
   totalAdicionais(oferta:any){
    this.totalAdd = 0
     let add:number
     oferta.adicionais.map((item: any) =>{
     this.totalAdd += oferta.quantidade *(item.quantidade * item.valor)
     })
     console.log(this.totalAdd)
     let valor =  oferta.quantidade * oferta.valor
     console.log(oferta.quantidade)
     console.log(oferta.valor)
     oferta.oferta = valor +  this.totalAdd

     this.somaItens()
   }
 
 
   menosAdicionais(add:any, oferta:any){
     if(add.quantidade <= 0){
       add.quandidade = 0
     }else{
       add.quantidade -=1
     }
     this.totalAdd = 0
     this.totalAdicionais(oferta)
   }

   maisLanche(oferta:any){
    oferta.quantidade += 1
    this.totalAdicionais(oferta)
  }

  menosLanche(oferta:any){
    oferta.quantidade -= 1
  
    if(oferta.quantidade == 0){
      oferta.quantidade = 0
      this.remover(oferta)
    }
    this.totalAdicionais(oferta)
  }
   
  remover(item: ItemCarrinho):void{
    this.carrinhoService.removeritem(item)
  

  }

  public getDadosEnderecoPorCEP(cep:any):void{
    let url = 'https://viacep.com.br/ws/'+cep+'/json/unicode/'
  
    let xmlHttp = new XMLHttpRequest()
    xmlHttp.open('GET', url)
  
    xmlHttp.onreadystatechange = () =>{
      //Verifica se estamos pegando o dado no retorno 4, e se não ouve erros 200
      if( xmlHttp.readyState == 4  && xmlHttp.status == 200){
        
        let dadosJSONText = xmlHttp.responseText // retorna um texto
        this.dadosJSONObj = JSON.parse(dadosJSONText) //transforma em objeto 
  
  
      }
    }
    xmlHttp.send()
  }

  /******************************************************************************************
   * ***************************** Controle do formullario **********************************
   ******************************************************************************************/

  public trocaPag(){
    this.pagCarrinho = false
  }

  public whatsapEnvio(){
    let celular: number = 5516993140835;
    let texto: any = "Texto que eu vou enviar \n com quebras de \n texto.";
    window.location.href = "https://api.whatsapp.com/send?phone=" + celular + "&text=" + this.textowhatsap, "_blank";

  }

  public imprimeItens(){
    var contador = 0
    this.itensDoCarrinho = encodeURIComponent(`\n`)
    this.itensCarrinho.map((item:ItemCarrinho) =>{

      
      if(item.oferta != 0){
      this.itensDoCarrinho  += encodeURIComponent(` *${item.quantidade}* - *${item.titulo}* \n`)

      this.itensCarrinho[contador].adicionais.map((item:ItemCarrinho) =>{
      
        if(item.quantidade != 0){
        this.itensDoCarrinho  += encodeURIComponent(`    + _${item.quantidade}_ - _${item.titulo}_ \n`)
        }
        
      })
    }
      contador++
      
    })

  }


  
  public somaItens(){
    var contador = 0
    this.contaItem=0
    this.somaItensCarrinho = 0
    this.itensCarrinho.map((item:ItemCarrinho) =>{
      this.contaItem++
      this.somaItensCarrinho  += item.quantidade * item.valor

      console.log(item.quantidade ,' *',item.valor)
      this.itensCarrinho[contador].adicionais.map((item:ItemCarrinho) =>{
      
        if(item.quantidade != 0){
          this.somaItensCarrinho  += item.quantidade * item.valor
        }
        console.log(item.quantidade ,'*',item.valor)
      })
      
      contador++

      
    })

  }


  // Se tentar em viar vai sinalizar ao usuario que esses campos ainda não foram preenchidos
  public confirmarCompra(): void {

    console.log(this.formulario)

    if(this.formulario.value.modalidade == 'Entregar pedido'){
      if( this.formulario.get('nome').valid &&
          this.formulario.get('modalidade').valid &&
          this.formulario.get('bairro').valid &&
          this.formulario.get('rua').valid &&
          this.formulario.get('numero').valid &&
          this.formulario.get('formaPagamento').valid){
            if(!this.formulario.value.complemento){
              this.formulario.value.complemento ='sem complemento'
              console.log(this.formulario.value.complemento)
            }
            if(this.formulario.value.cep && this.formulario.value.cep.length >= 8){
              
              this.formulario.value.rua = this.dadosJSONObj.logradouro
              this.formulario.value.bairro = this.dadosJSONObj.bairro
            }

              if(!this.formulario.value.trocoSN || this.formulario.value.trocoSN == 'nao'){
                  this.formulario.value.trocoSN = 'Não'
                }else{
                  this.formulario.value.trocoSN = this.formulario.value.troco
                }

                if( !this.formulario.value.bairro ||
                    this.formulario.value.bairro.length < 2 &&
                    !this.formulario.value.rua ||
                    this.formulario.value.rua.length < 2){
                      alert('Por favor verificar os campos Bairro: e Rua:')
                  }else{
                
                  this.imprimeItens()    
                  this.textowhatsap  += encodeURIComponent(`*Nova solicitação de pedido via site*\n-----------------------------------------------------\n*Nome: ${this.formulario.value.nome.trim()}*\n*Pagamento:* ${this.formulario.value.formaPagamento}\n-----------------------------------------------------\n*Lista de Pedidos:*\n`) + this.itensDoCarrinho + encodeURIComponent(`\n-----------------------------------------------------\n*${ this.formulario.value.modalidade}:*\n ${this.formulario.value.rua} *nº${this.formulario.value.numero}*\n *Bairro:* ${this.formulario.value.bairro}\n*Complemento:* ${this.formulario.value.complemento}\n*Vai precisar de troco:* ${this.formulario.value.trocoSN}\n-----------------------------------------------------\n*Valor Total:* ${(this.somaItensCarrinho + 10.00).toFixed(2).replace(".",",")}\n `)
                  this.whatsapEnvio()
              
        }
      } 
    }else if(this.formulario.value.modalidade == 'Retirar pedido no local'){
      if( this.formulario.get('nome').valid  &&
          this.formulario.get('modalidade').valid  &&
          this.formulario.get('retirada').valid &&
          this.formulario.get('formaPagamento').valid){
            this.imprimeItens()  
            this.textowhatsap  += encodeURIComponent(`*Nova solicitação de pedido via site*\n-----------------------------------------------------\n*Nome: ${this.formulario.value.nome.trim()}*\n*Pagamento:* ${this.formulario.value.formaPagamento}\n-----------------------------------------------------\n*Lista de Pedidos:*\n`) + this.itensDoCarrinho + encodeURIComponent(`\n-----------------------------------------------------\n*${ this.formulario.value.modalidade}:*\n${this.formulario.value.retirada}\n-----------------------------------------------------\n*Valor Total:* ${(this.somaItensCarrinho).toFixed(2).replace(".",",")}\n`)
            this.whatsapEnvio()
        }
    }


    this.formulario.get('nome').markAsTouched()
    this.formulario.get('modalidade').markAsTouched()
    this.formulario.get('retirada').markAsTouched()
    this.formulario.get('bairro').markAsTouched()
    this.formulario.get('rua').markAsTouched()
    this.formulario.get('numero').markAsTouched()
    this.formulario.get('troco').markAsTouched()
    this.formulario.get('trocoSN').markAsTouched()
    this.formulario.get('complemento').markAsTouched()
    this.formulario.get('formaPagamento').markAsTouched()

  }

    
   
  public duvidas():void{

    let celular: number = 5516993140835;
    let texto: any = "Texto que eu vou enviar \n com quebras de \n texto.";
    window.location.href = "https://api.whatsapp.com/send?phone=" + celular + "&text=" + "Eu tenho uma duvida", "_blank";


  }

  public atualizarTime(): void{
    this.bd.consultaHora(this.email)
    .then((hora: any) =>{
      this.hora = hora
     console.log(this.hora.length)
     this.abertura = this.hora[0].abre
     this.fechamento = this.hora[0].fechamento
     this.aberturaf = this.hora[0].abref
     this.fechamentof = this.hora[0].fechamentof
     this.aberturad = this.hora[0].abred
     this.fechamentod = this.hora[0].fechamentod

     let s1 = parseInt(this.hora[0].abre.replace(":","").substring(1, 4))
     let s2 = parseInt(this.hora[0].fechamento.replace(":",""))
     let ss1 = this.hora[0].abref.replace(":","").substring(1, 4);
     let ss2 = this.hora[0].fechamentof.replace(":","")
     let sss1 = this.hora[0].abred.replace(":","").substring(1, 4);
     let sss2 = this.hora[0].fechamentod.replace(":","")


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
        console.log(hrAtual)
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

