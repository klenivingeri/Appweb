import { ItemCarrinho } from './shared/item-carrinho.model'
export class CarrinhoService{
 public itens: ItemCarrinho[] =[]

    public exibirItens():ItemCarrinho[]{
        return this.itens
    }

    public incluirItem(item:ItemCarrinho):void{
        let itemCarrinho: ItemCarrinho = new ItemCarrinho(
            item.key,
            item.url_imagem,
            item.titulo,
            item.descricao,
            item.valor,
            item.quantidade,
            item.modelo,
            item.adicionais,
            item.oferta
        )
        console.log(itemCarrinho)
        //verificar se o item em questão já não existe dentro de this.itens
        //retona a posição de referencia e joga dentro de itemCarrinhoEncontrado
      //  let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.key === itemCarrinho.key)


            this.itens.push(itemCarrinho)
            
    

    }

    public totalCarrinhoCompras():number{
        let total: number = 0
        this.itens.map((item:ItemCarrinho) =>{
            total = total + (item.valor * item.quantidade)
        })
        return total
    }

    public adicionarQuantidade(itemCarrinho: ItemCarrinho):void{
        //incrementar
        
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.key === itemCarrinho.key)
        if(itemCarrinhoEncontrado){
            itemCarrinhoEncontrado.quantidade += 1
        }
    }

    public removerQuantidade(itemCarrinho:ItemCarrinho):void{
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.key === itemCarrinho.key)
        if(itemCarrinhoEncontrado){
            itemCarrinhoEncontrado.quantidade -= 1
            if(itemCarrinhoEncontrado.quantidade === 0){
                this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado),1)
                
            }
        }
    }

    public removeritem(itemCarrinho:ItemCarrinho):void{
        let itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.key === itemCarrinho.key)
            itemCarrinhoEncontrado.quantidade = 0
            if(itemCarrinhoEncontrado.quantidade === 0){
                this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado),1)
                
            }
        
    }
}