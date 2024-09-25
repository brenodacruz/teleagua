import { Link } from "react-router-dom";
import Input from "../components/Input";
import MoneyInput from "../components/MoneyInput";
import produtosLista from "../produtos.json";
import React, { useState } from "react";

export default function CadastrarProduto() {
    const [produtos, setProdutos] = useState(produtosLista);
    const [novoProduto, setNovoProduto] = useState({ nome: '', valor: '', estoque: '' });

    const adicionarProduto = () => {
        const id = produtos.length + 1;
        const produto = { ...novoProduto, id };
        setProdutos([...produtos, produto]);
        setNovoProduto({ nome: '', valor: '', estoque: '' }); // Limpa o formulário após adicionar
        console.log(produtos); // Log dos produtos para ver se o novo foi adicionado
    }

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
