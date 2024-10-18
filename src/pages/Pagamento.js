import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPix } from '@fortawesome/free-brands-svg-icons';
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { updateLocalStorage } from '../components/localStorageUtils';

export const handlePagamentoSelect = (metodoPagamento, navigate) => {
    localStorage.setItem('pagamento', JSON.stringify(metodoPagamento)); // Armazena o método de pagamento no localStorage
    updateLocalStorage('pagamento', metodoPagamento)

    if (metodoPagamento === 'Dinheiro') {
        navigate('/dinheiro');
    } else {
        navigate('/finalizar');
    }
};

export default function Pagamento() {
    const navigate = useNavigate();

    const handlePix = () => {
        handlePagamentoSelect('Pix', navigate);
    };

    const handleDinheiro = () => {
        handlePagamentoSelect('Dinheiro', navigate); // Passa diretamente o valor 'Dinheiro' e a função navigate
    };

    return (
        <div className="flex flex-col h-screen w-full justify-center items-center pl-[270px] pt-[68px] gap-10">
            <h1 className="text-5xl">Escolha a forma de pagamento:</h1>
            <section className="flex flex-row gap-10">
                <div 
                    className="border-2 border-black w-52 h-48 flex flex-col justify-center items-center text-4xl rounded-xl bg-gray-200 gap-5 hover:bg-blue-400 cursor-pointer" 
                    onClick={handlePix}
                >
                    <FontAwesomeIcon icon={faPix} className="text-7xl" />
                    <h1>Pix - 1</h1>
                </div>
                <div 
                    className="border-2 border-black w-52 h-48 flex flex-col justify-center items-center text-4xl rounded-xl bg-gray-200 gap-5 hover:bg-blue-400 cursor-pointer" 
                    onClick={handleDinheiro}
                >
                    <FontAwesomeIcon icon={faMoneyBill} className="text-7xl" />
                    <h1>Dinheiro - 2</h1>
                </div>
            </section>
        </div>
    );
}
