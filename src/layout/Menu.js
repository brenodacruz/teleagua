import Nav from "./Nav";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDroplet } from '@fortawesome/free-solid-svg-icons';

export default function Menu() {
    return (
        <div className="flex flex-col bg-blue-950 fixed h-lvh gap-12 top-0 left-0 py-10">
            <section className="text-white flex flex-row gap-5 px-10">
                <div className="flex justify-center items-center">
                    <FontAwesomeIcon icon={faDroplet} className="text-4xl" />
                </div>
                <div>
                    <h1 className="font-black text-4xl">Tele-Água</h1>
                    <h2 className="font-light">Distribuidora CAF</h2>
                </div>
            </section>
            <Nav title='Página Inicial (F5)' name='home' to='/' showIcon={false} />
            <Nav title='Produtos (F1)' name='bottle' to='/produtos' storageKey='produtosSelecionados' showIcon={true} />
            <Nav title='Cliente (F2)' name='user' to='/clientes' storageKey='cliente' showIcon={true} />
            <Nav title='Pagamento (F3)' name='coin' to='/pagamento' storageKey='pagamento' showIcon={true} />
            <Nav title='Finalizar (F4)' name='check' to='/finalizar' showIcon={false} />
        </div>
    );
}
