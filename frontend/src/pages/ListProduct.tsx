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
        await axios.put(
          `http://localhost:3000/produtos/${produtoEditando.id}`,
          {
            nome: novoProduto.nome,
            descricao: novoProduto.descricao,
            preco: novoProduto.preco,
          }
        );
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

  const handleExcluirClick = async (id: number) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir este produto"
    );
    if (!confirmar) return; // Se o usuario cancelar, nao faz nada

    try {
      await axios.delete(`http://localhost:3000/produtos/${id}`); // Chama a API DELETE
      buscarProdutos(); // Atualiza a lista apos exlclusão
    } catch (error) {
      console.error("Erro ao excluir produto", error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-semibold text-blue-600 mb-6 text-center">Lista de Produtos</h1>

      <button
        onClick={() => {
          setProdutoEditando(null);
          setNovoProduto({ id: 0, nome: "", descricao: "", preco: 0 });
          setMostrarFormulario(true);
        }}
        className="bg-green-500 text-white py-2 px-6 rounded-md shadow-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300">
        Adicionar Produto
      </button>

      {mostrarFormulario && (
        <div className="bg-white p-6 rounded-lg shadow-ls max-w-lg mx-auto mt-8">
          <input
            type="text"
            placeholder="Nome"
            value={novoProduto.nome}
            onChange={(e) =>
              setNovoProduto({ ...novoProduto, nome: e.target.value })
            }
            className="mb-4 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Descrição"
            value={novoProduto.descricao}
            onChange={(e) =>
              setNovoProduto({ ...novoProduto, descricao: e.target.value })
            }
            className="mb-4 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="mb-4 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSalvar}
            className="bg-green-500 text-white py-2 px-6 rounded-md shadow-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-300"
          >
            {produtoEditando ? "Atualizar" : "Salvar"}
          </button>
        </div>
      )}

      {produtos.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum produto encontrado.</p>
      ) : (
        <ul className="space-y-4 mt-6">
          {produtos.map((produto) => (
            <li
              key={produto.id}
              className="bg-white p-4 rounded-lg sahdow-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{produto.nome}</h3>
                <p className="text-sm text-gray-600">{produto.descricao}</p>
                <p className="mt-2 text-gray-800 font-bold">
                  R${produto.preco.toFixed(2)}
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => handleEditarClick(produto)}
                  className="bg-yellow-500 text-white py-2 px-4 rounded-md houver:bg-yellow-600 transition duration-300"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleExcluirClick(produto.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
                >
                  Exluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListProduct;
