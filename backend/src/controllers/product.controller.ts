import { Request, Response } from 'express';
import ProdutoService from '../services/produto.service';
import { promises } from 'dns';
import produtoService from '../services/produto.service';
import { RawQueryArgs } from '@prisma/client/runtime/library';

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
        console.log("error -->", error);
        return res.status(500).json({error: "Erro ao busacar produto"});
        }
    }

    public async updateProduct( req: Request, res: Response): Promise<Response> {
        try {
            const { id } = req.params;
            const { name, descricao, preco } = req.body;
            const updateProduct = await produtoService.updateProduct(Number(id), {name, descricao, preco});
            return res.status(200).json(updateProduct);
        } catch (error) {
        console.log("error -->", error);
        return res.status(400).json({ error: "Erro ao autalizar produto"});
        }
    }
}


export default new ProductController();

