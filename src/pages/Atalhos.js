import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { handleImprimir } from '../components/Impressao'; 
import {handlePagamentoSelect} from './Pagamento'

const KeyboardNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Verifica se o foco está em um campo de entrada
      const isInputFocused = document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA';

      // Se estiver em um campo de entrada, não faz nada
      if (isInputFocused) return;

      switch (event.key) {
        case 'F1':
          event.preventDefault();
          navigate('/produtos');
          break;
        case 'F2':
          event.preventDefault();
          navigate('/clientes');
          break;
        case 'F3':
          event.preventDefault();
          navigate('/pagamento');
          break;
        case 'F4':
          event.preventDefault();
          navigate('/finalizar');
          break;
        case 'F5':
          event.preventDefault();
          navigate('/');
          break;
        case 'F6':
          event.preventDefault();
          if (location.pathname === '/produtos') {
            navigate('/cadastrarproduto');
          } 
          else if (location.pathname === '/clientes') {
            navigate('/cadastrarcliente');
          }
          else if (location.pathname === '/finalizar') {
            navigate('/');
            
          }
          break;
        case '1':
          event.preventDefault(); // Bloqueia a ação padrão
          if (location.pathname === '/pagamento') {
            handlePagamentoSelect('Pix', navigate)
          }
          break;
          case '2':
            event.preventDefault(); // Bloqueia a ação padrão
            if (location.pathname === '/pagamento') {
              handlePagamentoSelect('Dinheiro', navigate)
          }
          break;
        case 'Enter':
          event.preventDefault(); // Bloqueia a ação padrão
          if (location.pathname === '/dinheiro') {
            navigate('/finalizar');
          }
          else if (location.pathname === '/finalizar') {
            handleImprimir();
          }
          break;
        default:
          break;
      }
    };

    // Adiciona o listener de evento de teclado
    window.addEventListener('keydown', handleKeyDown);

    // Limpa o listener quando o componente é desmontado
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate, location.pathname]);

  return null; // Este componente não renderiza nada
};

export default KeyboardNavigation;
