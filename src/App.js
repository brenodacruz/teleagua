import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from "./layout/Header";
import Menu from "./layout/Menu";
import Produtos from './pages/Produtos';
import Clientes from './pages/Clientes';
import Pagamento from './pages/Pagamento';
import Finalizar from './pages/Finalizar';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="font-oswald">
        <Header />
        <Menu />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/produtos' element={<Produtos />} />
          <Route path='/clientes' element={<Clientes />} />
          <Route path='/pagamento' element={<Pagamento />} />
          <Route path='/finalizar' element={<Finalizar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
