import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const KeyboardNavigation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'F1':
        event.preventDefault(); // Bloqueia a ação padrão
        navigate('/produtos'); // Redireciona para a página de produtos
        break;
        case 'F2':
          event.preventDefault(); // Bloqueia a ação padrão
          navigate('/clientes'); // Redireciona para a página de clientes
          break;
        case 'F3':
          event.preventDefault(); // Bloqueia a ação padrão
          navigate('/pagamento'); // Redireciona para a página de produtos
          break;
        case 'F4':
          event.preventDefault(); // Bloqueia a ação padrão
          navigate('/finalizar'); // Redireciona para a página de produtos
          break;
        case 'F5':
          event.preventDefault(); // Bloqueia a ação padrão
          navigate('/'); // Redireciona para a página de produtos
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
  }, [navigate]);

  return null; // Este componente não renderiza nada
};

export default KeyboardNavigation;
