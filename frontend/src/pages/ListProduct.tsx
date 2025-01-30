import React, { useState, useEffect} from "react";
import axios from "axios"; 

interface Produto {
    id: number;
    nome: string;
    descricao: string;
    preco: number; 
}


const ListProduct: React.FC = () => {   
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [mostrarFormulario, setMostrarFormulario] = useState(false); //Criado para armazenar o novo produto 
    const [novoProduto, setNovoProduto] = useState<Produto>({          //Criado para armazenar o novo produto 
            id:0,
            nome: "",
            descricao: "",
            preco: 0,
        });
        
    
        useEffect(() => {
            buscarProdutos();
        }, []);

        const buscarProdutos = async () => { 
            try {
                const response = await axios.get("http://localhost:3000/produtos");
                setProdutos(response.data);
            } catch (error) {
                console.error("Erro ao buscar produtos", error)
            }
        }

        const handleSalvar = async () => {
            try {
                await axios.post("http://localhost:3000/produtos", novoProduto);
                setMostrarFormulario(false);
                setNovoProduto({id: 0, nome: "", descricao: "", preco: 0});
                buscarProdutos(); 
            } catch (error) {
                console.log("erro ao adicionar produto", error);
            }
            };


         return ( 
            <div>
            <h1>Lista de produtos</h1>
            
            <button onClick={() => setMostrarFormulario(true)}>Adicionar Produto</button> 

            {mostrarFormulario && (
        <div>
          <input 
            type="text" 
            placeholder="Nome" 
            value={novoProduto.nome} 
            onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
          />
          <input 
            type="text" 
            placeholder="Descrição" 
            value={novoProduto.descricao} 
            onChange={(e) => setNovoProduto({ ...novoProduto, descricao: e.target.value })}
          />
          <input 
            type="number" 
            placeholder="Preço" 
            value={novoProduto.preco} 
            onChange={(e) => setNovoProduto({ ...novoProduto, preco: parseFloat(e.target.value) })}
          />
          <button onClick={handleSalvar}>Salvar</button>
        </div>
      )}
            {produtos.length === 0 ? (
                <p>Nenhum produto encontrado.</p>
            ) : (
            <ul>
                {produtos.map((produto) => (
                    <li key={produto.id}>
                        <strong>{produto.nome}</strong> - {produto.descricao} - R${produto.preco.toFixed(2)}
                    </li>
                ))}
            </ul>
            )} 
            </div>
        );
    };

    export default ListProduct;
