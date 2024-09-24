import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from '@fortawesome/free-solid-svg-icons';


export default function ClientesComp(props){

    return(
        <div className="flex flex-row w-full px-10 py-10 bg-gray-200 items-center gap-3 cursor-pointer hover:border-2 border-black">
            <FontAwesomeIcon icon={faUser} />
            <div className="flex flex-row justify-between w-full items-center">
                <h1 className="w-52">{props.nome}</h1>
                <h1 className="w-60">{props.endereço}</h1>
                <h1 className="w-40">{props.telefone}</h1>
            </div>
        </div>
    )
}