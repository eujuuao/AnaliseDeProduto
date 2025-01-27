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

    public async getAllProducts(){
        try {
            return await prisma.produto.findMany();
        } catch (error) {
            console.error("Erro -->", error)
            throw error;
        }
    }

    public async getProdutcById(id: number) {
        try {
            return await prisma.produto.findUnique({
                where: {
                    id: id,
                },
            });
        } catch (error) {
            console.error("Erro -->", error);
            throw error;
            
        }
    }

    public async updateProduct(id: number, data: {name?: string; descricao?: string; preco?: number }) {
        try {
            return await prisma.produto.update({
                where: { id },
                data: {
                    nome: data.name,
                    descricao: data.descricao,
                    preco: data.preco,
                },
            });
        } catch (error) {
            console.error("Erro -->", error)
            throw error;
        }
    }

    public async deleteProduct(id:number) {
        try {
            return await prisma.produto.delete({
                where: { id },
            });
        } catch (error) {
            console.error("Erro -->", error);
            throw error;
    }
    }

}

export default new ProdutoModel()