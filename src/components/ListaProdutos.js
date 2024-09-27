import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom"; 

export default function ListaProdutos(props) {
    return (
        <div className="flex flex-row justify-between p-10 items-center bg-gray-200 w-full h-36 mt-5">
            <div className="flex flex-row gap-5 justify-start items-center">
                <section className='flex flex-row gap-5 text-xl items-center'>
                    <Link to={`/editarproduto/${props.id}`}>
                        <FontAwesomeIcon icon={faPenToSquare} className='text-blue-600 cursor-pointer' />
                    </Link>
                    <FontAwesomeIcon 
                        icon={faTrash} 
                        className='text-red-600 cursor-pointer'
                        onClick={props.onDelete}
                    />
                </section>
                <img src="../img/img.jpg" className="w-28 rounded-xl" alt={props.alt}></img>
                <h1 className="text-4xl w-[200px]">{props.texto}</h1>
            </div>
            <div>
                <p className="text-xl">Estoque: <span className="font-black">{props.estoque} un</span></p>
            </div>
            <div className="flex flex-row gap-10 items-center">
                <p className="text-xl">R$ {parseFloat(props.valor).toFixed(2).replace(".", ",")}</p>
                <input type="button" value=">" className='bg-green-500 w-20 h-10 rounded-lg font-black border-2 border-black'></input>
            </div>
        </div>
    );
}
