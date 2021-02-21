import { Routes } from '@angular/router'


import { AutenticacaoGuard } from './autenticacao-guard.service'
import { HomeComponent } from './home/home.component'
import { OfertaComponent } from './oferta/oferta.component'
import { CarrinhoComponent } from './carrinho/carrinho.component'
import { AcessoComponent } from './acesso/acesso.component'

//painel
import { PainelComponent } from './painel/painel.component'
import { HomepComponent } from './homep/homep.component'
import { CadastroComponent } from './cadastro/cadastro.component'
import { EditaComponent } from './edita/edita.component'
import { AcompanhamentosComponent } from './acompanhamentos/acompanhamentos.component'



export const ROUTES: Routes =[

    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'home/:key/:pedido', component: HomeComponent },
    { path: 'oferta', component: OfertaComponent },
    { path: 'oferta/:key', component: OfertaComponent },
    { path: 'carrinho', component:CarrinhoComponent },
    { path: 'acesso', component: AcessoComponent },
    { path: 'painel', component: PainelComponent },
    { path: 'homep', component: HomepComponent, canActivate:[ AutenticacaoGuard ]},
    { path: 'homep/:key', component: HomepComponent, canActivate:[ AutenticacaoGuard ]},
    { path: 'cadastro', component: CadastroComponent, canActivate:[ AutenticacaoGuard ]},
    { path: 'edita', component: EditaComponent, canActivate:[ AutenticacaoGuard ] },
    { path: 'edita/:key', component: EditaComponent, canActivate:[ AutenticacaoGuard ] },
    { path: 'acompanhamentos', component: AcompanhamentosComponent,  canActivate:[ AutenticacaoGuard ] }


]
//{ path: 'painel', component: PainelComponent, canActivate:[ AutenticacaoGuard ]},
//    { path: 'painel', component: PainelComponent, canActivate: [ AutenticacaoGuard]},