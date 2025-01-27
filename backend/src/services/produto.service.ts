import { Prisma } from '@prisma/client';
import ProdutoModel from '../models/produto.model';
import productController from '../controllers/product.controller';

class ProdutoService {
    public async insertProduct(name: string, descricao: string, preco: number) {
        try {
            return await ProdutoModel.insertProduct(name, descricao, preco)
        } catch (error) {
            console.log("Erro -->", error);
            throw error;
        }
        
    }

    public async getAllProducts() {
        try {
          return await ProdutoModel.getAllProducts();
        } catch (error) {
            console.log("Erro ->>", error);
            throw error;
        }
    }

    public async getProdutcById(id: number) {
        try {
            const product = await ProdutoModel.getProdutcById(id);
            if (!product) {
                throw new Error(`Produto com ID ${id} não encontrado`);   
            }
            return product;
        } catch (error) {
            console.error("Erro -->", error);
            throw error; 
        }
    }

    public async updateProduct(id: number, data: { name?: string; descricao?: string; preco?: number }) {
        try {
            return await ProdutoModel.updateProduct(id, data);
        } catch (error) {
            console.log("Erro ->>", error);
            throw error;
        }
    } 

    public async deleteProduct(id:number) {
        try {
            return await ProdutoModel.deleteProduct(id);
        } catch (error) {
            console.error("Erro -->", error);
            throw error; 
        }
    }
}

export default new ProdutoService()