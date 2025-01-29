import React, { useState, useEffect} from "react";
import axios from "axios"; 

const ListProduct: React.FC = () => {   

    const [produtos, setProdutos] = useState();


    useEffect(() => {
        axios
        .get("http://localhost:3000/produtos") // Chama a API para buscar os produtos
        .then((response) => {
          setProdutos(response.data); // Atualiza o estado com os produtos recebidos
        })
        .catch((error) => {
          console.error("Erro ao buscar produtos:", error);
        });

      }, []);


      console.log("produtos", produtos)

    return ( 
            <div>
            <h1>Lista de produtos</h1>
            </div>
        );
    };

    export default ListProduct
