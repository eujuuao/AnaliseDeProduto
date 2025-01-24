import { Prisma } from '@prisma/client';
import produtoModel from '../models/produto.model';
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

    public async getAllProducts() {
        try {
            return await produtoModel.getAllProducts();
        } catch (error) {
            console.log("error ->>", error);
            throw error;
        }
    }

    public async updateProduct(id: number, data: { name?: string; descricao?: string; preco?: number }) {
        try {
            return await produtoModel.updateProduct(id, data);
        } catch (error) {
            console.log("error ->>", error);
            throw error;
        }
    } 
}

export default new ProdutoService()