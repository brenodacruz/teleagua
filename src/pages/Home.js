import React, { useState, useEffect } from 'react';
import MoneyInput from "../components/MoneyInput";

export default function Home() {
    const [produtos, setProdutos] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [quantidade, setQuantidade] = useState(0);
    const [dinheiro, setDinheiro] = useState(0);

    const buscarProdutos = async () => {
        try {
            const response = await fetch('http://localhost:5000/produtos');
            if (!response.ok) {
                throw new Error('Erro ao buscar produto');
            }

            const data = await response.json();

            // Extrair apenas nome e valor dos produtos
            const produtosFiltrados = data.map(produto => ({
                nome: produto.nome,
                valor: produto.valor
            }));

            console.log(produtosFiltrados); // Para verificar os dados filtrados
            setProdutos(produtosFiltrados);
        } catch (error) {
            console.log("erro ao buscar produto: ", error);
        }
    };

    useEffect(() => {
        buscarProdutos(); // Chama a função ao montar o componente
    }, []);

    const handleSelectChange = (event) => {
        const nomeProdutoSelecionado = event.target.value;
        const produto = produtos.find(prod => prod.nome === nomeProdutoSelecionado);
        setProdutoSelecionado(produto);
    };

    const handleQuantidadeChange = (event) => {
        // Atualiza o estado da quantidade com o valor do input
        setQuantidade(Number(event.target.value) || 0); // Converte para número
    };

    const handleDinheiroChange = (value) => {
        // Atualiza o estado da quantidade com o valor do input
        setDinheiro(value || 0); // Converte para número
    };

    const total = produtoSelecionado ? (produtoSelecionado.valor * quantidade).toFixed(2) : '0.00'
    const troco = (dinheiro - total).toFixed(2)

    return (
        <div className="grid grid-cols-2 h-screen w-screen pl-[270px]">
            <section className="flex flex-col justify-center items-center border-r-2 border-black">
                <h1 className="font-black text-7xl">QRcode Pix</h1>
                <h2 className="font-light">CNPJ: 52-642.660/0001-70</h2>
                <img src="../img/qrcode-pix.png" alt="QR Code Pix" />
            </section>
            <section className="flex flex-col justify-center items-center gap-10">
                <h1 className="font-black text-7xl">Calcular troco rápido</h1>

                <section className="grid grid-cols-2 grid-rows-5 border-2 border-black p-10 rounded-xl">
                    <label htmlFor="selectInput" className="row-start-1 col-start-1 self-center">Escolha o produto:</label>
                    <h2 className="row-start-2 col-start-1 self-center">Quantidade:</h2>
                    <h2 className="row-start-3 col-start-1 self-center">Total:</h2>
                    <h2 className="row-start-4 col-start-1 self-center">Dinheiro:</h2>
                    <h2 className="row-start-5 col-start-1 self-center">Troco:</h2>

                    <select
                        id="selectInput"
                        className="border-2 border-black p-2 row-start-1 col-start-2 self-center"
                        onChange={handleSelectChange}
                    >
                        {
                            produtos.map(produto => (
                                <option key={produto.nome} value={produto.nome}>
                                    {produto.nome} - R$ {produto.valor.toFixed(2)}
                                </option>
                            ))
                        }
                    </select>
                    <input
                        type="number"
                        className="border-2 border-black text-center row-start-2 col-start-2 self-center quantidade"
                        placeholder="0"
                        onChange={handleQuantidadeChange} // Atualiza a quantidade
                    />
                    <span className="row-start-3 col-start-2 self-center">
                        R$ {total}
                    </span>
                    <MoneyInput
                        type="text"
                        className="border-2 border-black text-center row-start-4 col-start-2 self-center"
                        placeholder="0"
                        value={dinheiro}
                        onChange={handleDinheiroChange}
                    />
                    <span className="row-start-5 col-start-2 self-center">R$ {troco}</span>
                </section>
            </section>
        </div>
    );
}
