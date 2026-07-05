import { Suspense, use } from "react"
import { Link } from "react-router-dom";
import styles from "./Produtos.module.css"
import ProdutosSkeleton from "./ProdutosSkeleton";

const produtosPromisse = fetch('https://fakestoreapi.com/products').then(res => res.json());

function ListaProdutos() {

    const produtos = use(produtosPromisse);

    return (

        <div className={styles.grid}>

            {produtos.map(produto => (
                <article key={produto.id} className={styles.card}>
                    <div className={styles.image}>
                        <img src={produto.image} alt={produto.title} />
                    </div>

                    <h3>{produto.title}</h3>

                    <p className={styles.price}>{produto.price.toFixed(2)}</p>

                    <Link className={styles.btn} to={`/produtos/${produto.id}`}>Ver detalhes</Link>
                </article>
            ))}

        </div>
    )
}

function Produtos() {

    return (

        <section>

            <h2>Nossos produtos</h2>

            <Suspense fallback={<ProdutosSkeleton />}>
                <ListaProdutos />
            </Suspense>

        </section>

    )
}

export default Produtos
