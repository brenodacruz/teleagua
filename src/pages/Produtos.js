import ListaProdutos from "../components/ListaProdutos";
import ProdutosSelecionados from "../components/ProdutosSelecionados";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { updateLocalStorage } from '../components/localStorageUtils';

export default function Produtos() {
    const [produtos, setProdutos] = useState([]);
    const [produtosSelecionados, setProdutosSelecionados] = useState([]);

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
        const savedProdutos = localStorage.getItem('produtosSelecionados');
        if (savedProdutos) {
            setProdutosSelecionados(JSON.parse(savedProdutos));
        }
    }, []);

    // Função para adicionar produto selecionado ou incrementar quantidade
    const AdicionarProduto = (produto) => {
        const produtoExistente = produtosSelecionados.find(item => item.id === produto.id);
        let novosSelecionados;

        if (produtoExistente) {
            // Incrementa a quantidade se o produto já existe
            novosSelecionados = produtosSelecionados.map(item =>
                item.id === produto.id
                    ? { ...item, quantidade: item.quantidade + 1 }
                    : item
            );
        } else {
            // Adiciona o novo produto com quantidade 1
            novosSelecionados = [...produtosSelecionados, { ...produto, quantidade: 1 }];
        }

        setProdutosSelecionados(novosSelecionados);
        updateLocalStorage('produtosSelecionados', produtosSelecionados)
        localStorage.setItem('produtosSelecionados', JSON.stringify(novosSelecionados)); // Atualiza o localStorage
        console.log("Produto adicionado:", produto.nome);
    };

    // Função para diminuir a quantidade de um produto
    const DiminuirProduto = (produto) => {
        const produtoExistente = produtosSelecionados.find(item => item.id === produto.id);
        let novosSelecionados;

        if (produtoExistente) {
            if (produtoExistente.quantidade > 1) {
                // Decrementa a quantidade
                novosSelecionados = produtosSelecionados.map(item =>
                    item.id === produto.id
                        ? { ...item, quantidade: item.quantidade - 1 }
                        : item
                );
            } else {
                // Remove o produto se a quantidade for 1
                novosSelecionados = produtosSelecionados.filter(item => item.id !== produto.id);
                console.log("Produto removido:", produto.nome);

            }
        }

        setProdutosSelecionados(novosSelecionados);
        localStorage.setItem('produtosSelecionados', JSON.stringify(novosSelecionados)); // Atualiza o localStorage
    };

    // Função para excluir um produto da lista de produtos
    const excluirProduto = async (id) => {
        console.log(`Tentando excluir produto da lista geral com ID: ${id}`);

        try {
            const response = await fetch(`http://localhost:5000/produtos/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Remove o produto da lista localmente
                const novosProdutos = produtos.filter(produto => produto.id !== id);
                setProdutos(novosProdutos);
                console.log(`Produto com ID ${id} removido da lista de produtos.`);
            } else {
                console.error(`Erro ao excluir produto com ID ${id}`);
            }
        } catch (error) {
            console.error(`Erro ao tentar excluir o produto: ${error}`);
        }
    };


    // Função para excluir um produto da lista de selecionados
    const excluirProdutoSelecionado = (id) => {
        console.log(`Tentando excluir produto selecionado com ID: ${id}`);
        const novosSelecionados = produtosSelecionados.filter(produto => produto.id !== id);
        setProdutosSelecionados(novosSelecionados);
        localStorage.setItem('produtosSelecionados', JSON.stringify(novosSelecionados)); // Atualiza o localStorage
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

                {/* Renderizando a lista de produtos */}
                {produtos.map(produto => (
                    <ListaProdutos
                        key={produto.id}
                        id={produto.id}
                        texto={produto.nome}
                        valor={produto.valor}
                        estoque={produto.estoque}
                        alt="Icone"
                        onDelete={() => excluirProduto(produto.id)} // Excluir da lista de produtos
                        onClick={() => AdicionarProduto(produto)}
                    />
                ))}
            </section>

            <section className="flex flex-col items-center justify-start">
                <h1 className="xl:text-4xl text-3xl mt-10">Selecionados:</h1>

                {/* Renderizando produtos selecionados */}
                {produtosSelecionados.map(produto => (
                    <ProdutosSelecionados
                        key={produto.id}
                        produto={produto.nome}
                        valor={produto.valor}
                        quantidade={produto.quantidade}
                        onDelete={() => excluirProdutoSelecionado(produto.id)} // Excluir da lista de selecionados
                        onClick={() => AdicionarProduto(produto)}
                        onDiminuir={() => DiminuirProduto(produto)}
                        total={calcularTotal()}
                    />
                ))}

                <h1 className="xl:text-4xl text-3xl mt-10">Total: R$ {calcularTotal().toFixed(2).replace(".", ",")}</h1>

                <img src="../img/giff-galao.gif" alt="Gif do Galão" className="w-52 xl:w-auto"/>
            </section>
        </div>
    );
}
