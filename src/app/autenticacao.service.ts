//auth.service.ts nome correto, e não autenticacao.service.ts
//a conexão com o banco de de dados fica no app.component.ts
import { Injectable } from '@angular/core' //para usar o serviço Router
import { Router } from '@angular/router' 
import { Usuario } from './acesso/usuario.model'
import * as firebase from 'firebase'

@Injectable()
export class Autenticacao{
    public token_id: string

    constructor(public router: Router){}

    /*****************************************************************************************
        1 - Cria um usuario no banco, 2 - remover a senha do atributo, senha do objeto usuário
        3 - registrando dados complementares do usuário no path email na base 64 
    ******************************************************************************************/
    public cadastrarUsuario(usuario:Usuario): Promise<any> {
        //console.log('chamos no serviço ',usuario.email, 'e', usuario.senha)
        return  firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)//1
            .then((resposta: any) =>{
                console.log('Cadastrado com sucesso!')
                
                delete usuario.senha //2

                firebase.database().ref(`usuario_detalhe`) //3
                    .set(usuario)
            })
            .catch((erro: Error) =>{
                if(erro.message == 'The email address is already in use by another account.'){
                    console.log('Esse email já esta sendo usado')
                    return 1
                }else if(erro.message == 'Password should be at least 6 characters'){
                    console.log('Senha deve possuir 6 ou mais digitos')
                    return 2
                }



                
                console.log(erro.message)
                // quando a senha é menor que 6 digitos
                // quando já existe alguem cadastrado
            })
    }



    /*****************************************************************************************
        Verifica E-mail e senha, cria um Token de autorização para o usuario navegar nas paginas
        1- autenticação para o usuario entrar no sistema, 2- Cria token, 3- retorna uma Promisse,
        4- Faz o armazenamento do navegado para o usuario permanecer logado mesmo se fechar o
        navegador, é um metodo, passamos 2 valores, chave e valor
    ******************************************************************************************/

                
    public autenticar(email:string, senha:string):Promise<any>{//1
       return firebase.auth().signInWithEmailAndPassword(email, senha)

/*ok*/  .then((resposta:string) => { 
            firebase.auth().currentUser.getIdToken()// 2 3
                .then((idToken: string) =>{ 
                    this.token_id = idToken
                    localStorage.setItem('idToken', idToken) //4
                    this.router.navigate(['/homep'])
                })
            })
/*Erro*/ .catch((erro: Error) =>{ 
            if(erro.message == 'The password is invalid or the user does not have a password.'){
                console.log('Senha incorrera')// Email ou senha invalido
                return 1
            }
            else if(erro.message == 'There is no user record corresponding to this identifier. The user may have been deleted.'){
                console.log('Email Não existe') // Email ou senha invalido
                return 1
            }
            })

            
    }

    /*****************************************************************************************
        Caso tenha dado tudo certo na criação do token, ele retonar true e é liberado o acesso
        na home, caso contraio retonar false, e o cliente não tem acesso, quem precissa disso é
        o Autenticacao-guard.serivce, token_id só é prenchido se der tudo certo com autenticar
        1- Verifica se existe algo armazenado na chave idToken armazenado no localStorage
    ******************************************************************************************/
    public autenticado(): boolean{
        if(this.token_id === undefined && localStorage.getItem('idToken') !== null){ //1
             this.token_id = localStorage.getItem('idToken')
        }

        if(this.token_id === undefined){
            this.router.navigate(['/'])
        }
         return this.token_id !== undefined
    }

    

    /*****************************************************************************************
     Remove do localStorage a chave de acesso ao Pach, ele é chamado dentro de home.component
    1- Remove o token do firebase 2- remove o token do localStorage
    ******************************************************************************************/
    public sair(): void{
        firebase.auth().signOut() //1
            .then(() => {
                localStorage.removeItem('idToken')//2
                this.token_id = undefined
                this.router.navigate(['/'])
            })
        
    }
}

    /*****************************************************************************************
    
    ******************************************************************************************/














/*




*****************************************************
Insere valor > localStorage.setItem('chava',valor)  *
Recupera o valor > localStorage.setItem('idToken')  *
*****************************************************



**************************************************
Quando fazemos uma Promise<any>e damos um return *
na outra ponta onde o return devolver o valor,   *
conseguimos dar um then(()) ou catch(())         *
**************************************************


*************************************
Autentificação é do firebase jwt.io *
Rouber Guard é do Angular           *
*************************************


******************************************
para injetar um serviço dentro de outro  *
precisamos importar a função Injectable  *
e decorar o @serviço                     *
******************************************

*/