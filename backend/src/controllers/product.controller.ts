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
}


export default new ProductController();

// // Função para puxar informações (GET)
// export const getProducts = (req: Request, res: Response) => {
//   // Aqui você pode pegar os produtos do banco de dados
//   // Exemplo de resposta fictícia
//   return res.status(200).json([
//     {
//       id: 1,
//       name: 'Produto Exemplo',
//       price: 100.50,
//     },
//   ]);
// };

// // Função para editar informações (PUT)
// export const updateProduct = (req: Request, res: Response) => {
//   const { id } = req.params;
//   const { name, price } = req.body;

//   // Aqui você pode adicionar a lógica para atualizar o produto no banco de dados
//   // Exemplo de resposta fictícia
//   return res.status(200).json({
//     message: `Produto com ID ${id} atualizado com sucesso`,
//     product: {
//       id,
//       name,
//       price,
//     },
//   });
// };

// // Função para excluir informações (DELETE)
// export const deleteProduct = (req: Request, res: Response) => {
//   const { id } = req.params;

//   // Aqui você pode adicionar a lógica para excluir o produto do banco de dados
//   // Exemplo de resposta fictícia
//   return res.status(200).json({
//     message: `Produto com ID ${id} excluído com sucesso`,
//   });
// };