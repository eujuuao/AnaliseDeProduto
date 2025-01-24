import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ProdutoModel {
     public async insertProduct(name: string, descricao: string, preco: number) {
        try {
            return await prisma.produto.create({
                data: {
                    nome: name,
                    descricao: descricao,
                    preco: preco,
                }
            });
        } catch (error) {
            console.error("Erro -->", error)
            throw error
        }
    }

}

export default new ProdutoModel()