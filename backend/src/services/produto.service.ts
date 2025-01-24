import ProdutoModel from '../models/produto.model';

class ProdutoService {
    public async insertProduct(name: string, descricao: string, preco: number) {
        try {
            return await ProdutoModel.insertProduct(name, descricao, preco)
        } catch (error) {
            console.log(error);
            throw error;
        }
        
    }
}

export default new ProdutoService()