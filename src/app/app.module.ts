import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule }from '@angular/platform-browser/animations';
//import { AutenticacaoGuard } from './autenticacao-guard.service'
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

import { Ctrl } from './app.controle';

import { Bd } from './bd.service'
import { Progresso }from './progresso.service'
import { CarrinhoService } from './carrinho.service';
import { Autenticacao } from './autenticacao.service';
import { AutenticacaoGuard } from './autenticacao-guard.service'

import { AppComponent } from './app.component';
import { AltoComponent } from './alto/alto.component';
import { HomeComponent } from './home/home.component';
import { BaixoComponent } from './baixo/baixo.component';
import { CarrinhoComponent } from './carrinho/carrinho.component';
import { OfertaComponent } from './oferta/oferta.component';
import { AcessoComponent } from './acesso/acesso.component';
import { LoginComponent } from './acesso/login/login.component';
import { PainelComponent } from './painel/painel.component';
import { AltopComponent } from './altop/altop.component';
import { BaixopComponent } from './baixop/baixop.component';
import { HomepComponent } from './homep/homep.component';
import { EditaComponent } from './edita/edita.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { AcompanhamentosComponent } from './acompanhamentos/acompanhamentos.component';


@NgModule({
  declarations: [
    AppComponent,
    AltoComponent,
    HomeComponent,
    BaixoComponent,
    CarrinhoComponent,
    OfertaComponent,
    AcessoComponent,
    LoginComponent,
    PainelComponent,
    AltopComponent,
    BaixopComponent,
    HomepComponent,
    EditaComponent,
    CadastroComponent,
    AcompanhamentosComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [ Bd, Ctrl, Progresso, Autenticacao, CarrinhoService, AutenticacaoGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
