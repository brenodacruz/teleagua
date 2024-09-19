import Nav from "./Nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';


export default function Menu(){
    return(
        <div className="flex flex-col bg-blue-950 fixed h-lvh p-10 gap-20 top-0 left-0">
            <section className="text-white flex flex-row gap-5">
                <div className="flex justify-center items-center">
                    <FontAwesomeIcon icon={faDroplet} className="text-4xl"/>
                </div>
                <div>
                    <h1 className="font-black text-4xl">Tele-Água</h1>
                    <h2 className="font-light">Distribuidora CAF</h2>
                </div>
            </section>
            <Nav title='Produtos (F1)' name='bottle'></Nav>
            <Nav title='Cliente (F2)' name='user'></Nav>
            <Nav title='Pagamento (F3)' name='coin'></Nav>
            <Nav title='Finalizar (F4)' name='check'></Nav>
        </div>
    )
}