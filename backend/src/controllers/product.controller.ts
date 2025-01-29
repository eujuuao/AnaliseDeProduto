import { Request, Response } from 'express';
import ProdutoService from '../services/produto.service';

class ProductController {
    public async insertProduct(req: Request, res: Response): Promise<Response> {
        try {
            const { name, descricao, preco } = req.body;
            await ProdutoService.insertProduct(name, descricao, preco);
            return res.status(201).json({ message: "produto criado com sucesso!"});
        } catch (error) {
            console.error("Erro no controlador -->", error);
            return res.status(400).json({ error: "Erro ao inserir um produto" });
        }
    }

    public async getAllProduct(req: Request, res: Response): Promise<Response> {
        try {
            const products = await ProdutoService.getAllProducts();
            return res.status(200).json(products)
        } catch (error) {
        console.error("error -->", error);
        return res.status(500).json({error: "Erro ao busacar produto"});
        }
    }

    public async getProdutcById(req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const product = await ProdutoService.getProdutcById(Number(id));
            return res.status(200).json(product);
        } catch (error) {
            console.error("Erro -->", error);
            return res.status(404).json({ error: "Produto não encontrado"});
        }
    }

    public async updateProduct( req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { name, descricao, preco } = req.body;
            const updateProduct = await ProdutoService.updateProduct(Number(id), {name, descricao, preco});
            return res.status(200).json(updateProduct);
        } catch (error) {
        console.error("error -->", error);
        return res.status(400).json({ error: "Erro ao autalizar produto"});
        }
    }

    public async deleteProduct( req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params; 
            await ProdutoService.deleteProduct(Number(id));
            return res.status(202).json({ message: `Produto com o id = ${id} deletado com sucesso` });
        } catch (error) {
            console.error("Error -->", error);
            return res.status(400).json({ error: "Erro ao deletar produto"});
        }
    }
}


export default new ProductController();

