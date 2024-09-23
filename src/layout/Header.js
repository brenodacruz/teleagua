import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

export default function Header(props){
    const location = useLocation()
    var quantidade = 2
    return(
        <div className="fixed top-0 pl-[300px] left-0 w-screen bg-blue-600 text-white py-5 pr-20 flex flex-row justify-between">
            <section>
                <h1 className="text-lg">
                    {location.pathname === '/' ? 'Página Principal' : ''}
                    {location.pathname === '/produtos' ? 'Produtos' : ''}
                    {location.pathname === '/clientes' ? 'cliente' : ''}
                    {location.pathname === '/pagamento' ? 'pagamento' : ''}
                    {location.pathname === '/finalizar' ? 'finalizar' : ''}
                </h1>
            </section>
            <section className='flex flex-row gap-1 justify-center items-center'>
                <h1>{location.pathname === '/produtos' ? 'Carrinho' : ''}</h1>
                <p className='mr-5'>{location.pathname === '/produtos' ? `(${quantidade})` : ''}</p>
                <FontAwesomeIcon icon={location.pathname == '/produtos' ? faShoppingCart : ''} />
            </section>
        </div>
    )
}