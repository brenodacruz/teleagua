import ListaProdutos from "../components/ListaProdutos";
import ProdutosSelecionados from "../components/ProdutosSelecionados";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import produtosLista from "../produtos.json"; // Importando o JSON com a lista de produtos
import React, { useState } from "react"; // Importando useState

export default function Produtos(){

    const [produtos, setProdutos] = useState(produtosLista)

    return(
        <div className="grid grid-cols-[1fr_auto] h-screen w-screen pl-[270px] pt-[68px]">
            <section className="flex flex-col items-center justify-start border-r-2 border-black">
                <Link to='/cadastrarproduto' className="flex flex-row justify-between bg-black text-white w-full px-10 items-center gap-5 cursor-pointer hover:bg-gray-800 py-2">
                    <h1>Cadastrar Novo Produto (F6)</h1>
                    <FontAwesomeIcon icon={faSquarePlus}/>
                </Link>
                
                {/* Mapeando sobre a lista de produtos e renderizando o componente ListaProdutos */}
                {produtos.map(produto => (
                    <ListaProdutos 
                        key={produto.id} // Usando o ID como chave
                        texto={produto.nome} 
                        valor={produto.valor} 
                        estoque={produto.estoque} 
                        alt="Icone" 
                    />
                ))}

            </section>
            <section className="flex flex-col items-center justify-start">
                <h1 className="text-4xl mt-10">Selecionados:</h1>
                <ProdutosSelecionados produto="Água - Porta" valor="15,00" quantidade="2"/>
                <ProdutosSelecionados produto="Galão 20L" valor="24,00" quantidade="2"/>
                
                <h1 className="text-4xl mt-10">Total: R$ 00,00</h1>

                <img src="../img/giff-galao.gif"></img>
            </section>
        </div>
    )
}