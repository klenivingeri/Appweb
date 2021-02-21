import { Injectable } from '@angular/core'

// serviço que implementa a logica que a rota solicitade pode ou não ser liberado
import { CanActivate } from '@angular/router' //é uma boa pratica importar o CanActivate
import { Autenticacao } from './autenticacao.service'


@Injectable()
export class AutenticacaoGuard implements CanActivate{
    constructor(private autenticacao: Autenticacao){}

    /*****************************************************************************************
        O canActivate()  faz a liberação da pach/pagina/rota quando é retornado o valor true,
        ele retonar true quando em Autenticacao.service o token_id receber o token apos o login ser
        efetuado com sucesso
    ******************************************************************************************/
    canActivate(): boolean{
        //importando de dentro do serviço Autenticacao
        return this.autenticacao.autenticado()
    }

}

/* Metodo de autenficação do firebase com gerenciamento de rotas do angular  atraves do canActivate 
é configurado em Routes {path: 'home', component: HomeComponent, canActivate:[ AutenticacaoGuard ]} 
Can = Consulte
Activate = posibilidade 
Apenas se vier de AutenticacaoGuard

depois desse passo temos que configurar isso aqui no App.modules.ts
*/
