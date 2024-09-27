import ListaProdutos from "../components/ListaProdutos";
import ProdutosSelecionados from "../components/ProdutosSelecionados";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react"; // Importando useEffect

export default function Produtos() {
    const [produtos, setProdutos] = useState([]);

    // Função para buscar produtos do backend
    const buscarProdutos = async () => {
        try {
            const response = await fetch('http://localhost:5000/produtos'); // URL do seu servidor
            const data = await response.json();
            setProdutos(data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    // Carregar produtos ao montar o componente
    useEffect(() => {
        buscarProdutos();
    }, []);

    // Função para excluir um produto
    const excluirProduto = async (id) => {
        console.log(`Tentando excluir produto com ID: ${id}`);
        try {
            const response = await fetch(`http://localhost:5000/produtos/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Atualiza a lista de produtos após a exclusão
                setProdutos(produtos.filter(produto => produto.id !== id));
                console.log(`Produto com ID ${id} excluído com sucesso.`);
            } else {
                const errorText = await response.text();
                console.error("Erro ao excluir produto:", response.statusText, errorText);
            }
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
        }
    };

    return (
        <div className="grid grid-cols-[1fr_auto] h-screen w-full pl-[270px] pt-[68px]">
            <section className="flex flex-col items-center justify-start border-r-2 border-black">
                <Link to='/cadastrarproduto' className="flex flex-row justify-between bg-black text-white w-full px-10 items-center gap-5 cursor-pointer hover:bg-gray-800 py-2">
                    <h1>Cadastrar Novo Produto (F6)</h1>
                    <FontAwesomeIcon icon={faSquarePlus} />
                </Link>
                
                {/* Mapeando sobre a lista de produtos e renderizando o componente ListaProdutos */}
                {produtos.map(produto => (
                    <ListaProdutos 
                        key={produto.id} // Usando o ID como chave
                        id={produto.id} // Passando o ID para o componente ListaProdutos
                        texto={produto.nome} 
                        valor={produto.valor} 
                        estoque={produto.estoque} 
                        alt="Icone" 
                        onDelete={() => excluirProduto(produto.id)} // Passando a função de excluir
                    />
                ))}
            </section>
            <section className="flex flex-col items-center justify-start">
                <h1 className="text-4xl mt-10">Selecionados:</h1>
                <ProdutosSelecionados produto="Água - Porta" valor="15,00" quantidade="2"/>
                <ProdutosSelecionados produto="Galão 20L" valor="24,00" quantidade="2"/>
                
                <h1 className="text-4xl mt-10">Total: R$ 00,00</h1>

                <img src="../img/giff-galao.gif" alt="Gif do Galão" />
            </section>
        </div>
    );
}
