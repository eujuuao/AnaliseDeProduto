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

    useEffect(() => {
        axios
        .get("http://localhost:3000/produtos") 
        .then((response) => {
          setProdutos(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar produtos:", error);
        });

      }, []);


      console.log("produtos", produtos)

         return ( 
            <div>
            <h1>Lista de produtos</h1>

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
