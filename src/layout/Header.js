import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

export default function Header() {
    const location = useLocation();

    return (
        <div className="fixed top-0 pl-[300px] left-0 w-screen bg-blue-600 text-white py-5 pr-32 flex flex-row justify-between">
            <section>
                <h1 className="text-lg">
                    {location.pathname === '/' ? 'Página Principal' : ''}
                    {location.pathname === '/produtos' ? 'Produtos' : ''}
                    {location.pathname === '/clientes' ? 'Lista de Clientes' : ''}
                    {location.pathname === '/pagamento' ? 'Formas de Pagamento' : ''}
                    {location.pathname === '/finalizar' ? 'Finalizar' : ''}
                </h1>
            </section>
            <section className='flex flex-row gap-1 justify-center items-center'>
                {location.pathname === '/produtos' && (
                    <>
                        <h1>Carrinho</h1>
                        <FontAwesomeIcon icon={faShoppingCart} />
                    </>
                )}
            </section>
        </div>
    );
}
