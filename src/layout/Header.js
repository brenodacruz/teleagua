import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import  { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

export default function Header(){
    return(
        <div className="fixed top-0 pl-[300px] left-0 w-screen bg-blue-600 text-white py-5 pr-20 flex flex-row justify-between">
            <section>
                <h1 className="text-lg">Resultado da pesquisa</h1>
            </section>
            <section className='flex flex-row gap-5 justify-center items-center'>
                <FontAwesomeIcon icon={faShoppingCart} />
                <h1>Carrinho <span>(vazio)</span></h1>
            </section>
        </div>
    )
}