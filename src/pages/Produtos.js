import ListaProdutos from "../components/ListaProdutos";
import ProdutosSelecionados from "../components/ProdutosSelecionados";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [produtosSelecionados, setProdutosSelecionados] = useState([]); // Estado para produtos selecionados

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

    // Função para adicionar produto selecionado ou incrementar quantidade se já estiver na lista
    const AdicionarProduto = (produto) => {
        const produtoExistente = produtosSelecionados.find(item => item.id === produto.id);

        if (produtoExistente) {
            // Se o produto já existe na lista, incrementa a quantidade
            setProdutosSelecionados(
                produtosSelecionados.map(item =>
                    item.id === produto.id 
                        ? { ...item, quantidade: item.quantidade + 1 }
                        : item
                )
            );
        } else {
            // Se não está na lista, adiciona com quantidade 1
            setProdutosSelecionados([...produtosSelecionados, { ...produto, quantidade: 1 }]);
        }

        console.log("Produto adicionado:", produto.nome);
    };

    // Função para excluir um produto da lista de selecionados
    const excluirProdutoSelecionado = (id) => {
        console.log(`Tentando excluir produto selecionado com ID: ${id}`);
        setProdutosSelecionados(produtosSelecionados.filter(produto => produto.id !== id));
        console.log(`Produto com ID ${id} removido da seleção.`);
    };

    // Função para calcular o total
    const calcularTotal = () => {
        return produtosSelecionados.reduce((total, produto) => total + (produto.valor * produto.quantidade), 0);
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
                        onDelete={() => excluirProdutoSelecionado(produto.id)} // Passando a função de excluir
                        onClick={() => AdicionarProduto(produto)} // Adiciona o produto ao ser clicado
                    />
                ))}
            </section>
            
            <section className="flex flex-col items-center justify-start">
                <h1 className="text-4xl mt-10">Selecionados:</h1>
                
                {/* Renderizando produtos selecionados dinamicamente */}
                {produtosSelecionados.map((produto, index) => (
                    <ProdutosSelecionados 
                        key={index} 
                        produto={produto.nome} 
                        valor={produto.valor} 
                        quantidade={produto.quantidade}  // Exibe a quantidade do produto selecionado
                        onDelete={() => excluirProdutoSelecionado(produto.id)} // Passando a função de excluir
                        onClick={() => AdicionarProduto(produto)}
                    />
                ))}
                
                <h1 className="text-4xl mt-10">Total: R$ {calcularTotal().toFixed(2).replace(".", ",")}</h1>

                <img src="../img/giff-galao.gif" alt="Gif do Galão" />
            </section>
        </div>
    );
}
