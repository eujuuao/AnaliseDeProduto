import React, { useState, useEffect } from "react";
import axios from "axios";

interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number;
}

const ListProduct: React.FC = () => {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);
    const [novoProduto, setNovoProduto] = useState<Produto>({
        id: 0,
        nome: "",
        descricao: "",
        preco: 0,
    });

    // Buscar produtos ao carregar a página
    useEffect(() => {
        buscarProdutos();
    }, []);

    const buscarProdutos = async () => {
        try {
            const response = await axios.get("http://localhost:3000/produtos");
            setProdutos(response.data);
        } catch (error) {
            console.error("Erro ao buscar produtos", error);
        }
    };

    // Função para iniciar a edição de um produto
    const handleEditarClick = (produto: Produto) => {
        setProdutoEditando(produto);
        setNovoProduto(produto);
        setMostrarFormulario(true);
    };

    // Função para salvar ou editar um produto
    const handleSalvar = async () => {
        if (!novoProduto.nome || !novoProduto.descricao || !novoProduto.preco) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            if (produtoEditando) {
                // Atualiza o produto existente
                await axios.put(`http://localhost:3000/produtos/${produtoEditando.id}`, {
                    nome: novoProduto.nome,
                    descricao: novoProduto.descricao,
                    preco: novoProduto.preco,
                });
            } else {
                // Cria um novo produto
                await axios.post("http://localhost:3000/produtos", {
                    nome: novoProduto.nome,
                    descricao: novoProduto.descricao,
                    preco: novoProduto.preco,
                });
            }

            // Resetando estados
            setNovoProduto({ id: 0, nome: "", descricao: "", preco: 0 });
            setProdutoEditando(null);
            setMostrarFormulario(false);
            await buscarProdutos();
        } catch (error) {
            console.error("Erro ao salvar produto", error);
        }
    };

    return (
        <div>
            <h1>Lista de Produtos</h1>

            <button onClick={() => {
                setProdutoEditando(null);
                setNovoProduto({ id: 0, nome: "", descricao: "", preco: 0 });
                setMostrarFormulario(true);
            }}>
                Adicionar Produto
            </button>

            {mostrarFormulario && (
                <div>
                    <input
                        type="text"
                        placeholder="Nome"
                        value={novoProduto.nome}
                        onChange={(e) =>
                            setNovoProduto({ ...novoProduto, nome: e.target.value })
                        }
                    />
                    <input
                        type="text"
                        placeholder="Descrição"
                        value={novoProduto.descricao}
                        onChange={(e) =>
                            setNovoProduto({ ...novoProduto, descricao: e.target.value })
                        }
                    />
                    <input
                        type="number"
                        placeholder="Preço"
                        value={novoProduto.preco}
                        onChange={(e) =>
                            setNovoProduto({
                                ...novoProduto,
                                preco: parseFloat(e.target.value),
                            })
                        }
                    />
                    <button onClick={handleSalvar}>
                        {produtoEditando ? "Atualizar" : "Salvar"}
                    </button>
                </div>
            )}

            {produtos.length === 0 ? (
                <p>Nenhum produto encontrado.</p>
            ) : (
                <ul>
                    {produtos.map((produto) => (
                        <li key={produto.id}>
                            <strong>{produto.nome}</strong> - {produto.descricao} - R${produto.preco.toFixed(2)}
                            <button onClick={() => handleEditarClick(produto)}>Editar</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ListProduct;
