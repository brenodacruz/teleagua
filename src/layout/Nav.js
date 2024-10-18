import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

export default function Nav(props) {
    const location = useLocation();
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        // Verifica se o item está no localStorage na primeira renderização
        const storedItem = localStorage.getItem(props.storageKey);
        setIsSelected(!!storedItem);

        // Função que será chamada quando o evento de atualização do localStorage for disparado
        const handleStorageChange = (event) => {
            if (event.detail.key === props.storageKey) {
                setIsSelected(!!event.detail.value);
            }
        };

        // Escuta o evento customizado 'localStorageUpdate'
        window.addEventListener('localStorageUpdate', handleStorageChange);

        // Remove o listener quando o componente é desmontado
        return () => {
            window.removeEventListener('localStorageUpdate', handleStorageChange);
        };
    }, [props.storageKey]);

    return (
        <Link to={props.to}>
            <div className={`flex flex-row items-center justify-start text-white gap-3 w-full px-10 py-5 ${location.pathname === props.to ? "bg-blue-600" : ""}`}>
                <div className="bg-white rounded-md p-1">
                    <img src={`./img/${props.name}.png`} alt={props.name} className="w-10" />
                </div>
                <h1 className="font-light text-xl">{props.title}</h1>
                {props.showIcon && (
                    <FontAwesomeIcon icon={isSelected ? faCircleCheck : faCircleExclamation} className={isSelected ? "text-green-600" : "text-yellow-600"} />
                )}
            </div>
        </Link>
    );
}
