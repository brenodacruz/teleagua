import ListaProdutos from "../components/ListaProdutos";
import ProdutosSelecionados from "../components/ProdutosSelecionados";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

export default function Produtos(){
    return(
        <div className="grid grid-cols-[1fr_auto] h-screen w-screen pl-[270px] pt-[68px]">
            <section className="flex flex-col items-center justify-start border-r-2 border-black">
                <Link to='/cadastrarproduto' className="flex flex-row justify-between bg-black text-white w-full px-10 items-center gap-5 cursor-pointer hover:bg-gray-800 py-2">
                    <h1>Cadastrar Novo Produto (F6)</h1>
                    <FontAwesomeIcon icon={faSquarePlus}/>
                </Link>
                
                <ListaProdutos texto="Água - Porta" valor="15,00" alt="Icone"/>
                <ListaProdutos texto="Água - Perto" valor="18,00" alt="Icone"/>
                <ListaProdutos texto="Água - Longe" valor="19,00" alt="Icone"/>
                <ListaProdutos texto="Galão 20L" valor="24,00" alt="Icone"/>

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