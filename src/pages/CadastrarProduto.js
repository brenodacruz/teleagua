import { Link } from "react-router-dom";
import Input from "../components/Input";
import MoneyInput from "../components/MoneyInput";

export default function CadastrarProduto(){
    return (
        <div className="flex flex-col h-screen w-full justify-center items-center pl-[270px] pt-[68px] gap-10 bg-gray-300">
            <h1 className="text-5xl font-black">Cadastrar Novo Produto:</h1>
            <section className="flex flex-col gap-5">
                <Input placeholder="Nome do Produto" type="text" name="nomeproduto"/>
                <MoneyInput className="w-auto p-2 rounded-xl px-5" placeholder="Valor do Produto"/>
                <section className="flex flex-row justify-center items-center gap-5">
                    <input type="button" value="Cadastrar" className="rounded-xl bg-green-400 px-5 py-2 cursor-pointer hover:bg-green-500"></input>
                    <Link to={'/produtos'}><input type="button" value="Cancelar" className="rounded-xl bg-red-400 px-5 py-2 cursor-pointer hover:bg-red-500"></input></Link>
                    
                </section>
            </section>
        </div>
    )
}