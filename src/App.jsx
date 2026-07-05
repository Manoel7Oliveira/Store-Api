import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import ProdutoDetalhes from "./pages/ProdutoDetalhes/produtoDetalhesSuspense"
import Home from "./pages/Home"
import Produtos from "./pages/Produtos/produtosSuspense"
import Carrinho from "./pages/Carrinho/Carrinho"

function App() {

  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="produtos" element={<Produtos />} />
          <Route path="produtos/:id" element={<ProdutoDetalhes />} />
          <Route path="carrinho" element={<Carrinho />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
