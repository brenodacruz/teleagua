import { Link } from "react-router-dom";
import Input from "../components/Input";

export default function CadastrarCliente(){
    return (
        <div className="flex flex-col h-screen w-full justify-center items-center pl-[270px] pt-[68px] gap-10 bg-gray-300">
            <h1 className="text-5xl font-black">Cadastrar Cliente:</h1>
            <section className="flex flex-col gap-5">
                <Input placeholder="Nome" type="text" name="cliente"/>
                <Input placeholder="Endereço" type="text" name="endereço"/>
                <Input placeholder="Celular" type="text" name="celular1"/>
                <Input placeholder="Celular 2 (Opcional)" type="text" name="celular2"/>
                <Input placeholder="Celular 3 (Opcional)" type="text" name="celular3"/>
                

                <section className="flex flex-row justify-center items-center gap-5">

                    <input type="button" value="Cadastrar" className="rounded-xl bg-green-400 px-5 py-2 cursor-pointer hover:bg-green-500"></input>
                    <Link to={'/produtos'}><input type="button" value="Cancelar" className="rounded-xl bg-red-400 px-5 py-2 cursor-pointer hover:bg-red-500"></input></Link>
                    
                </section>
            </section>
        </div>
    )
}