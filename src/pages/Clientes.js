import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import ClientesComp from "../components/ClientesComp";

export default function Clientes() {
    return (
        <div className="flex flex-col h-screen w-full justify-start items-start pl-[270px] pt-[68px]">
            <div className="flex items-center border-2 border-black w-full h-10">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="mx-2" />
                <input
                    type="search"
                    placeholder="Busque por nome do cliente, endereço ou telefone"
                    className="flex-1 h-full border-none p-2"
                />
            </div>
            <div className="flex flex-row w-full bg-black text-white justify-between px-36">
                <h1>Nome:</h1>
                <h1>Endereço:</h1>
                <h1>Telefone:</h1>
            </div>
            
            <ClientesComp nome="Breno Henrique" endereço="Rua Potomaio 330, São Geraldo" telefone="99670-2929"/>
            <ClientesComp nome="Caio Fontes" endereço="Rua Itaituba 287, São Geraldo" telefone="99789-9930"/>
            <ClientesComp nome="Guilherme Asa Norte" endereço="Rua Caiçara, Boa vista" telefone="99405-3422"/>
            <ClientesComp nome="Gilda Lopes Ribeiro da Silva" endereço="Rua Bobos 0, Nova zelandia" telefone="99999-2929"/>
            <ClientesComp nome="Breno Henrique" endereço="Rua Potomaio 330, São Geraldo" telefone="99670-2929"/>
            <ClientesComp nome="Caio Fontes" endereço="Rua Itaituba 287, São Geraldo" telefone="99789-9930"/>
            <ClientesComp nome="Guilherme Asa Norte" endereço="Rua Caiçara, Boa vista" telefone="99405-3422"/>
            <ClientesComp nome="Caio Fontes" endereço="Rua Itaituba 287, São Geraldo" telefone="99789-9930"/>

        </div>

    )
}