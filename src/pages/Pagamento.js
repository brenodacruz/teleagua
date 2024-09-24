import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPix } from '@fortawesome/free-brands-svg-icons';
import { faMoneyBill } from "@fortawesome/free-solid-svg-icons";


export default function Pagamento(){
    return(
        <div className="flex flex-col h-screen w-full justify-center items-center pl-[270px] pt-[68px] gap-10">
            <h1 className="text-5xl">Escolha a forma de pagamento:</h1>
            <section className="flex flex-row gap-10">
                <div className="border-2 border-black w-52 h-48 flex flex-col justify-center items-center text-4xl rounded-xl bg-gray-200 gap-5 hover:bg-blue-400 cursor-pointer">
                    <FontAwesomeIcon icon={faPix} className="text-7xl"/>
                    <h1>Pix - 1</h1>
                </div>
                <div className="border-2 border-black w-52 h-48 flex flex-col justify-center items-center text-4xl rounded-xl bg-gray-200 gap-5 hover:bg-blue-400 cursor-pointer">
                    <FontAwesomeIcon icon={faMoneyBill} className="text-7xl"/>
                    <h1>Dinheiro - 2</h1>
                </div>
            </section>
        </div>
    )
}