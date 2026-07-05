import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout/Layout"
import ProdutoDetalhes from "./pages/ProdutoDetalhes/produtoDetalhesSuspense"
import Home from "./pages/Home"
import Produtos from "./pages/Produtos/produtosSuspense"
import Carrinho from "./pages/Carrinho/Carrinho"

// O index é a rota padrão, ou seja, quando o caminho for igual a "/" ele irá renderizar o componente Home
// O path é a rota, ou seja, quando o caminho for igual a "/produtos" ele irá renderizar o componente Produtos
// O path com :id é a rota dinâmica, ou seja, quando o caminho for igual a "/produtos/1" 
// ele irá renderizar o componente ProdutoDetalhes e passar o id como parâmetro para o componente
// O layout é o componente que irá renderizar o header, o main e o footer, 
// e o outlet é o componente que irá renderizar os componentes filhos da rota atual
// O Route aninhado dentro do Route com path="/" irá renderizar o componente Home quando a rota for igual a "/"
// e o componente Produtos quando a rota for igual a "/produtos"
// e o componente ProdutoDetalhes quando a rota for igual a "/produtos/:id"


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
