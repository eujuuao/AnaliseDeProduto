import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const InsertProduct: React.FC = () => {
    
    const [nome, setNome] = useState<string>("");
    const [descricao, setDescricao] = useState<string>("");
    const [preco, setPreco] = useState<number | string>("");
    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent) => {e.preventDefault(); //evita o recarregamento da pagina

        if (!nome || !descricao || !preco) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const obj = {
                name: nome,
                descricao: descricao,
                preco: preco
            }
            await axios.post ("http://localhost:3000/produtos", obj);
        } catch (error) {
            console.error("error -->", error);
            alert("Erro ao enviar dados para o servidor.");
        }

    };

   
    return (
        <div>
            <h1>Inserir produto</h1>

            <form onSubmit={handleSubmit}>

                <label>Nome do Produto:</label>
                <input 
                 type="text"
                 value={nome}
                 onChange={(e) => setNome(e.target.value)}
                 placeholder="Digite o nome do produto"
                 />

                 <label>Descrição:</label>
                 <input
                 value={descricao}
                 onChange={(e) => setDescricao(e.target.value)}
                 placeholder="Digite a descriçaço do produto"
                 />

                 <label>Preço:</label>
                 <input
                 type="number"
                 value={preco}
                 onChange={(e) => setPreco(Number(e.target.value) || "")}
                 placeholder="Digite o preço do produto"
                 />

                <button type="submit">Salvar</button>
                
            </form>

            <button type="button" onClick={() => navigate("/lista-produtos")}> Ver lista de produtos </button>

        </div>
    );
};

export default InsertProduct;