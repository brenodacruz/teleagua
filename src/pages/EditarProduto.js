import { Link, useParams } from "react-router-dom";
import Input from "../components/Input";
import MoneyInput from "../components/MoneyInput";
import React, { useState, useEffect } from "react";

export default function EditarProduto() {
    const { id } = useParams(); // Obtém o ID do produto da URL
    const [produto, setProduto] = useState({ nome: '', valor: '', estoque: '' });
    console.log("Estado do produto:", produto); // Verifica o estado do produto

    // Função para buscar um produto específico
    const buscarProduto = async () => {
        try {
            const response = await fetch(`http://localhost:5000/produtos/${id}`); // URL do produto específico
            if (!response.ok) {
                throw new Error("Produto não encontrado");
            }
            const data = await response.json();
            console.log("Dados do produto:", data); // Verifica os dados recebidos
            setProduto({ 
                nome: data.nome || '', 
                valor: data.valor !== undefined ? data.valor.toString() : '', // Converte para string, se existir
                estoque: data.estoque !== undefined ? data.estoque.toString() : '' // Converte para string, se existir
            });
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
        }
    };

    useEffect(() => {
        buscarProduto(); // Chama a função quando o componente é montado
    }, [id]);

    const editarProduto = async () => {
        if (!produto.nome || !produto.valor || !produto.estoque) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
    
        // Certifica-se de que produto.valor é uma string
        const valor = typeof produto.valor === 'string' ? produto.valor : produto.valor.toString();
    
        const produtoAtualizado = {
            nome: produto.nome,
            valor: parseFloat(valor.replace(',', '.')) || 0, // Converte a string para float
            estoque: parseInt(produto.estoque, 10) || 0, // Converte para inteiro
        };
    
        try {
            const response = await fetch(`http://localhost:5000/produtos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(produtoAtualizado),
            });
            console.log("Status da resposta:", response.status); // Adicione esta linha
            if (!response.ok) {
                throw new Error("Erro ao atualizar produto");
            }
    
            const data = await response.json();
            console.log("Produto atualizado:", data);
            window.location.href = '/produtos'; // Redireciona após a atualização
        } catch (error) {
            console.error("Erro ao atualizar produto:", error);
            alert("Erro ao atualizar produto. Tente novamente.");
        }
    };
    
    return (
        <div className="flex flex-col h-screen w-full justify-center items-center pl-[270px] pt-[68px] gap-10 bg-gray-300">
            <h1 className="text-5xl font-black">Editar Produto:</h1>
            <section className="flex flex-col gap-5">
                <Input
                    placeholder="Nome do Produto"
                    type="text"
                    value={produto.nome} // Preenche o campo com o nome do produto
                    onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
                />
                <MoneyInput
                    className="w-auto p-2 rounded-xl px-5"
                    placeholder="Valor do Produto"
                    value={produto.valor} // Preenche o campo com o valor do produto
                    onChange={(valor) => setProduto({ ...produto, valor })} // Atualiza o valor no estado
                />
                <Input
                    placeholder="Quantidade Estoque"
                    type="number"
                    value={produto.estoque} // Preenche o campo com a quantidade em estoque
                    onChange={(e) => setProduto({ ...produto, estoque: e.target.value })}
                />
                <section className="flex flex-row justify-center items-center gap-5">
                    <input
                        type="button"
                        value="Salvar"
                        className="rounded-xl bg-green-400 px-5 py-2 cursor-pointer hover:bg-green-500"
                        onClick={editarProduto}
                    />
                    <Link to={'/produtos'}>
                        <input
                            type="button"
                            value="Cancelar"
                            className="rounded-xl bg-red-400 px-5 py-2 cursor-pointer hover:bg-red-500"
                        />
                    </Link>
                </section>
            </section>
        </div>
    );
}
