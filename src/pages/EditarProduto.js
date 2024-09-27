import { Link, useParams } from "react-router-dom";
import Input from "../components/Input";
import MoneyInput from "../components/MoneyInput";
import React, { useState, useEffect } from "react";

export default function EditarProduto() {
    const { id } = useParams(); 
    const [produto, setProduto] = useState({ nome: '', valor: '', estoque: '' });
    console.log("Estado do produto:", produto); 

    const buscarProduto = async () => {
        try {
            const response = await fetch(`http://localhost:5000/produtos/${id}`); 
            if (!response.ok) {
                throw new Error("Produto não encontrado");
            }
            const data = await response.json();
            console.log("Dados do produto:", data);
            setProduto({ 
                nome: data.nome || '', 
                valor: data.valor !== undefined ? data.valor.toString() : '', 
                estoque: data.estoque !== undefined ? data.estoque.toString() : '' 
            });
        } catch (error) {
            console.error("Erro ao buscar produto:", error);
        }
    };

    useEffect(() => {
        buscarProduto(); 
    }, [id]);

    const editarProduto = async () => {
        if (!produto.nome || !produto.valor || !produto.estoque) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
    
        const valor = typeof produto.valor === 'string' ? produto.valor : produto.valor.toString();
    
        const produtoAtualizado = {
            nome: produto.nome,
            valor: parseFloat(valor.replace(',', '.')) || 0, 
            estoque: parseInt(produto.estoque, 10) || 0,
        };
    
        try {
            const response = await fetch(`http://localhost:5000/produtos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(produtoAtualizado),
            });
            console.log("Status da resposta:", response.status); 
            if (!response.ok) {
                throw new Error("Erro ao atualizar produto");
            }
    
            const data = await response.json();
            console.log("Produto atualizado:", data);
            window.location.href = '/produtos';
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
                    value={produto.nome} 
                    onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
                />
                <MoneyInput
                    className="w-auto p-2 rounded-xl px-5"
                    placeholder="Valor do Produto"
                    value={produto.valor}
                    onChange={(valor) => setProduto({ ...produto, valor })} 
                />
                <Input
                    placeholder="Quantidade Estoque"
                    type="number"
                    value={produto.estoque}
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
