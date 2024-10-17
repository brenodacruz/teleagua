import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from "./layout/Header";
import Menu from "./layout/Menu";
import Produtos from './pages/Produtos';
import Clientes from './pages/Clientes';
import Pagamento from './pages/Pagamento';
import Home from './pages/Home';

import CadastrarProduto from './pages/CadastrarProduto';
import CadastrarCliente from './pages/CadastrarCliente';
import KeyboardNavigation from './pages/Atalhos';
import EditarProduto from './pages/EditarProduto';
import EditarCliente from './pages/EditarCliente';
import PedidoContext from './layout/PedidoContext';
import Dinheiro from './pages/Dinheiro';



function App() {
  return (
    <Router>
      <div className="font-oswald grid-cols-2">
        <Header />
        <Menu />

        <KeyboardNavigation />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/produtos' element={<Produtos />} />
          <Route path='/clientes' element={<Clientes />} />
          <Route path='/pagamento' element={<Pagamento />} />
          <Route path='/cadastrarproduto' element={<CadastrarProduto />} />
          <Route path='/cadastrarcliente' element={<CadastrarCliente />} />
          <Route path='/editarproduto/:id' element={<EditarProduto />} />
          <Route path='/editarcliente/:id' element={<EditarCliente />} />
          <Route path='/finalizar' element={<PedidoContext />} />
          <Route path='/dinheiro' element={<Dinheiro />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
