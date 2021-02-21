import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Bd } from '../bd.service'
@Component({
  selector: 'app-acompanhamentos',
  templateUrl: './acompanhamentos.component.html',
  styleUrls: ['./acompanhamentos.component.css']
})
export class AcompanhamentosComponent implements OnInit {
  public adicionais: any

 
  public formulario: FormGroup = new FormGroup({
    'adicionais': new FormControl(null ,[Validators.required]),
    'valor': new FormControl(null ,[Validators.required])
  })
  constructor(private bd:Bd) { }

  ngOnInit() {
    this.atualizarTimeLIne()


  }
  public atualizarTimeLIne(): void{
    this.bd.consultaAdicionais('')
    .then((itemCadastrados: any) =>{
      this.adicionais = itemCadastrados
      console.log( this.adicionais)
    })
  }

  public excluirAdicionais(key:string):void{
    let ok = confirm("Deletar arquivo?");
    if(ok){
      this.bd.excluirAcompanhamento(key)
      this.atualizarTimeLIne()
    }
  }
  acompanhamento(){
    this.formulario.value.valor = this.formulario.value.valor.replace(",",".")
    this.bd.acompanhamentos(this.formulario.value)

    

    this.atualizarTimeLIne()
  }
  

}
