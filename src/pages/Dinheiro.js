import MoneyInput from "../components/MoneyInput";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Dinheiro() {
    
    const navigate = useNavigate();
    const [dinheiro, setDinheiro] = useState(0);

    const handleDinheiroChange = (value) => {
        // Atualiza o estado da quantidade com o valor do input
        setDinheiro(value || 0); // Converte para número
    };

    const handlePagina = () => {
        // Armazena o valor do dinheiro no localStorage
        localStorage.setItem('dinheiro', JSON.stringify(dinheiro));
        navigate('/finalizar');
    }

    return (
        <div className="flex h-screen w-full justify-center items-center pl-[270px] pt-[68px] flex-col gap-10">
            <h1 className="text-5xl">Qual valor em dinheiro será passado?</h1>
            <MoneyInput
                type="text"
                className="border-2 border-black text-center row-start-4 col-start-2 self-center w-72 h-10 rounded-xl"
                placeholder="0"
                value={dinheiro}
                onChange={handleDinheiroChange}
            />
            <button className="border-2 border-black rounded-xl p-3 bg-green-400" onClick={handlePagina}>Confirmar</button>
        </div>
    )
}
