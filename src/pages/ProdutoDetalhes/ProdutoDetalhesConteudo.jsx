import { use, useState } from "react"
import styles from "./produtoDetalhes.module.css"
import { useCarrinho } from "../../Stores/CarrinhoContext";

function ProdutoDetalhesConteudo({ produtoPromise }) {

    const [adicionado, setAdicionado] = useState(false);

    const produto = use(produtoPromise);

    const { adicionarAoCarrinho } = useCarrinho();

    function handleAdicionar() {
        console.log(produto);
        adicionarAoCarrinho(produto);
        setAdicionado(true)
        setTimeout(() => setAdicionado(false), 2000);
    }

    // o use é utilizado para consumir a promise do produtoPromise, ou seja, ele irá esperar a promise ser resolvida e retornar o valor do produto,
    // e enquanto isso ele irá renderizar o fallback do Suspense, que no caso é a mensagem "Carregando produto..."


    if (!produto) return <div>Produto nao encontrado</div>

    return (

        <div className={styles.content}>
            <div className={styles.image}>
                <img src={produto.image} alt={produto.title} />
            </div>
            <div className={styles.info}>
                <span className={styles.categoria}>{produto.category}</span>
                <h1 className={styles.title}>{produto.title}</h1>
                <p className={styles.descricao}>{produto.description}</p>
                <p className={styles.preco}>{produto.price.toFixed(2)}</p>
                <button className={`${styles.btn} ${adicionado ? styles.sucess : ''}`}
                    onClick={handleAdicionar} >{adicionado ? 'Adicionado ao carrinho' : 'Adicionar ao carrinho'}
                </button>
            </div>
        </div>
    )
}

export default ProdutoDetalhesConteudo