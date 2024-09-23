import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  {faSquareMinus, faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function ProdutosSelecionados(props){

    return(
        <div className="flex flex-col justify-center items-center bg-blue-200 border-y-2 border-black w-[400px] h-36 mt-5">
            <div className="flex flex-row justify-center items-center gap-5 mb-5 font-black text-lg">
                <h1 className="border-r-2 pr-5 border-black">{props.produto}</h1>
                <h1 className="border-r-2 pr-5 border-black">R${props.valor}</h1>
                <h1>({props.quantidade})</h1>
            </div>
            <div className="flex flex-row items-center gap-10 text-3xl">
                <p className=' cursor-pointer'><FontAwesomeIcon icon={faTrash} /></p>
                <p className=' text-green-500 hover:text-green-600 cursor-pointer'><FontAwesomeIcon icon={faSquarePlus} /></p>
                <p className=' text-red-500 hover:text-red-600 cursor-pointer'><FontAwesomeIcon icon={faSquareMinus} /></p>
            </div>
        </div>
    )
}