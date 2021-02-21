import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms'
import { Bd } from '../bd.service'
import { Adicionais } from '../shared/adicionais.model'
import { Progresso } from '../progresso.service'

import { ActivatedRoute, Router } from '@angular/router'


import { Observable } from 'rxjs/Observable' 
import { Subject } from 'rxjs/Subject'
import 'rxjs/RX'  // para utilizar o interval

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  public email:string
  private imagem: any
  public valor: string = null
  public progressoPublicacao: string = 'pendente'
  public porcentagemUpload: number
  public adicionais: any
  public checkAdicionais: any = [{quantidade: 0, titulo: "", valor: "", vendidos: 0, key: ""}]

  public formulario: FormGroup = new FormGroup({
    'nome': new FormControl(null ,[Validators.required]),
    'descricao': new FormControl(null,[Validators.required]),
    'modelo': new FormControl(null,[Validators.required]),
    'valor': new FormControl(null,[Validators.required]),
    'img': new FormControl(null,[Validators.required]),
    'oferta': new FormControl(null,[Validators.required]),

  })

  constructor(private bd :Bd, public progresso:Progresso,private route: ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.atualizarTimeLIne()


  }

  buildAdicionais(add : Adicionais){

    let buildAdicionaisEncontrado = this.checkAdicionais.find((item: Adicionais) => item.key === add.key)
    if(buildAdicionaisEncontrado){
      console.log('entramos')
      this.checkAdicionais.splice(this.checkAdicionais.indexOf(buildAdicionaisEncontrado),1)
    }else{
    this.checkAdicionais.push(add)
    }
    console.log(this.checkAdicionais)
  }

  public atualizarTimeLIne(): void{
    this.bd.consultaAdicionais('')
    .then((itemCadastrados: any) =>{
      this.adicionais = itemCadastrados
      console.log( this.adicionais)
    })
  }
  
  public cadastrarProduto(): void{
    this.formulario.get('img').markAsTouched()
    if( this.formulario.get('nome').valid &&
    this.formulario.get('descricao').valid &&
    this.formulario.get('modelo').valid &&
    this.formulario.get('valor').valid &&
    this.formulario.get('img').touched){
      
      if(this.formulario.value.oferta == null || this.formulario.value.oferta == 0 ){
        this.formulario.value.oferta = 0
      }
          

    this.formulario.value.img = this.imagem[0]
      let troca = this.formulario.value.valor.replace(",",".")
      
      this.bd.publicar({
        email: this.email,
        titulo: this.formulario.value.nome,
        modelo: this.formulario.value.modelo,
        valor: troca,
        descricao: this.formulario.value.descricao,
        img: this.formulario.value.img,
        quantidade: 1,
        oferta: this.formulario.value.oferta,
        adicionais: this.checkAdicionais
      })
        

 

      let acompanhamentoUplod = Observable.interval(1500)
      let continua =  new Subject() // passar valores para Observable
      continua.next(true)
      acompanhamentoUplod
      .takeUntil(continua)// enquanto for true faça, se for false pare
      .subscribe(() => {

        console.log( this.progressoPublicacao)
        this.progressoPublicacao =  'andamento'
        this.porcentagemUpload = Math.round((this.progresso.estado.bytesTransferred / this.progresso.estado.totalBytes) * 100)
        if(this.progresso.status === 'concluido'){
          this.progressoPublicacao =  'concluido'
          //emitir um evento do componente parent(home)
          console.log( this.progressoPublicacao)
          continua.next(false)
          this.progresso.status = null
        
          
          this.router.navigate(['/homep']);
          alert('Produto cadastrado com Sucesso')

          
        }
    }) 
  }    else{
    // console.log('formulario esta INVALIDO')
    this.formulario.get('nome').markAsTouched()
    this.formulario.get('modelo').markAsTouched()
    this.formulario.get('valor').markAsTouched()
    this.formulario.get('descricao').markAsTouched()
     
    this.formulario.get('oferta').markAsTouched() 


    
    }
  
  

}
public preparaImagemUpload(event: Event): void{ 
  this.imagem = (<HTMLInputElement>event.target).files //1
}


}

