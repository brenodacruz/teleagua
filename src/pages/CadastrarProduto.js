import { Link } from "react-router-dom";
import Input from "../components/Input";
import MoneyInput from "../components/MoneyInput";
import React, { useState, useEffect } from "react";

export default function CadastrarProduto() {
    const [produtos, setProdutos] = useState([]);
    const [novoProduto, setNovoProduto] = useState({ nome: '', valor: '', estoque: '' });

    const buscarProdutos = async () => {
        try {
            const response = await fetch('http://localhost:5000/produtos'); // URL do seu servidor
            const data = await response.json();
            setProdutos(data);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
        }
    };

    useEffect(() => {
        buscarProdutos(); // Chama a função quando o componente é montado
    }, []);

    const adicionarProduto = async () => {
        // Verifica se todos os campos estão preenchidos
        if (!novoProduto.nome || !novoProduto.valor || !novoProduto.estoque) {
            alert("Por favor, preencha todos os campos.");
            return;
        }
    
        try {
            // Faz uma requisição GET para obter a lista de produtos e determinar o próximo ID
            const responseGet = await fetch('http://localhost:5000/produtos');
            if (!responseGet.ok) {
                throw new Error("Erro ao obter produtos");
            }
    
            const produtosExistentes = await responseGet.json();
    
            // Cria um array apenas com os IDs existentes
            const idsExistentes = produtosExistentes.map(p => p.id);
            
            let novoId = 1; // Começa a verificar IDs a partir de 1
            while (idsExistentes.includes(novoId)) {
                novoId++; // Incrementa até encontrar um ID que não esteja em uso
            }
            novoId = novoId-1
    
            console.log(`1- valor novoID: ${novoId}`);
    
            // Formata os valores
            const produto = {
                nome: novoProduto.nome,
                valor: parseFloat(novoProduto.valor),
                estoque: parseInt(novoProduto.estoque, 10),
                id: novoId // Agora usando novoId garantido
            };
            console.log(`2- valor novoID: ${novoId}`);
    
            const responsePost = await fetch('http://localhost:5000/produtos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(produto),
            });
    
            if (!responsePost.ok) {
                throw new Error("Erro ao adicionar produto");
            }
    
            const data = await responsePost.json();
            setProdutos([...produtos, data]); // Atualiza a lista de produtos com o novo
            setNovoProduto({ nome: '', valor: '', estoque: '' }); // Limpa o formulário após adicionar
            console.log("Produto adicionado:", data); // Log do produto adicionado
        } catch (error) {
            console.error("Erro ao adicionar produto:", error);
        }
    };
    
    
    
    return (
        <div className="flex flex-col h-screen w-full justify-center items-center pl-[270px] pt-[68px] gap-10 bg-gray-300">
            <h1 className="text-5xl font-black">Cadastrar Novo Produto:</h1>
            <section className="flex flex-col gap-5">
                <Input
                    placeholder="Nome do Produto"
                    type="text"
                    value={novoProduto.nome}
                    onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
                />
                <MoneyInput
                    className="w-auto p-2 rounded-xl px-5"
                    placeholder="Valor do Produto"
                    value={novoProduto.valor} // Passa o valor ao MoneyInput
                    onChange={(valor) => setNovoProduto({ ...novoProduto, valor })} // Atualiza o valor no estado
                />
                <Input
                    placeholder="Quantidade Estoque"
                    type="number"
                    value={novoProduto.estoque}
                    onChange={(e) => setNovoProduto({ ...novoProduto, estoque: e.target.value })}
                />

                <section className="flex flex-row justify-center items-center gap-5">
                    <input
                        type="button"
                        value="Cadastrar"
                        className="rounded-xl bg-green-400 px-5 py-2 cursor-pointer hover:bg-green-500"
                        onClick={adicionarProduto} // Chama a função ao clicar
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
