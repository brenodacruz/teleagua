import React, { useState, useEffect } from 'react';

export default function Home() {
    const [produtos, setProdutos] = useState([]); // Definindo o estado

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

    return(
        <div className="grid grid-cols-2 h-screen w-screen pl-[270px]">
            <section className="flex flex-col justify-center items-center border-r-2 border-black">
                <h1 className="font-black text-7xl">QRcode Pix</h1>
                <h2 className="font-light">CNPJ: 52-642.660/0001-70</h2>
                <img src="../img/qrcode-pix.png"></img>
            </section>
            <section className="flex flex-col justify-center items-center gap-10">
                <h1 className="font-black text-7xl">Calcular troco rápido</h1>

                <section className="grid grid-cols-2 grid-rows-6 border-2 border-black p-10 rounded-xl">
                  
                    <label for="selectInput" className="row-start-1 col-start-1 self-center">Escolha o produto:</label>
                    <h2 className="row-start-2 col-start-1 self-center">Quantidade:</h2>
                    <h2 className="row-start-3 col-start-1 self-center">Total:</h2>
                    <h2 className="row-start-4 col-start-1 self-center">Dinheiro:</h2>
                    <h2 className="row-start-5 col-start-1 self-center">Troco:</h2>
                

                    <select id="selectInput" className="border-2 border-black p-2 row-start-1 col-start-2 self-center">
                        {
                            produtos.map(produto => (
                                <option key={produto.nome} value={produto.nome}>{produto.nome} - R$ {produto.valor}</option>
                            ))
                        }
                    </select>
                    <input type="number" className="border-2 border-black text-center row-start-2 col-start-2 self-center" placeholder="0"></input>
                    <span className="row-start-3 col-start-2 self-center">R$ 0.00</span>
                    <input type="text" className="border-2 border-black text-center row-start-4 col-start-2 self-center" placeholder="0"></input>
                    <span className="row-start-5 col-start-2 self-center">R$ 0.00</span>
                    <input type="button" value="Calcular" className="border-2 border-black bg-blue-500 rounded-lg row-start-6 col-span-2 cursor-pointer hover:bg-blue-700"></input>
                
                    
                </section>
                
            </section>
        
        </div>
    )
}