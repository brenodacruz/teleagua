import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

export default function ClientesComp(props) {
    const handleDelete = (e) => {
        e.stopPropagation(); // Evita que o clique seja propagado para o container pai
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este cliente?");
        if (confirmDelete) {
            props.onDelete(props.id);
        }
    };

    const handleEditClick = (e) => {
        e.stopPropagation(); // Evita que o clique no ícone de edição selecione o cliente ou navegue para outra página
    };

    return (
        <div className={`flex flex-row w-full px-10 py-10 bg-gray-200 items-center gap-3 cursor-pointer hover:border-2 border-black ${props.isSelected ? 'border-4 border-blue-500' : ''}`}>
            <FontAwesomeIcon icon={faUser} />
            <div className="flex flex-row justify-between w-full items-center">
                <h1 className="w-52">{props.nome}</h1>
                <h1 className="w-60">{props.endereço}</h1>
                <div className="flex flex-row gap-1">
                    <h1 className="w-40 text-center">{props.telefone1}</h1>
                    <h1 className="w-40 text-center">{props.telefone2 ? props.telefone2 : 'Null'}</h1>
                    <h1 className="w-40 text-center">{props.telefone3 ? props.telefone3 : 'Null'}</h1>
                </div>
                <div className="flex flex-row gap-2 items-center">
                    <Link to={`/editarcliente/${props.id}`} onClick={handleEditClick}>
                        <FontAwesomeIcon icon={faPenToSquare} className='text-blue-600 cursor-pointer hover:text-blue-400' />
                    </Link>
                    <FontAwesomeIcon
                        icon={faTrash}
                        className='text-red-600 cursor-pointer hover:text-red-400'
                        onClick={handleDelete}
                    />
                </div>
            </div>
        </div>
    );
}
