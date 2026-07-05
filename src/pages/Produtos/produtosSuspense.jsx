import { Suspense, use } from "react"
import { Link } from "react-router-dom";
import styles from "./Produtos.module.css"
import ProdutosSkeleton from "./ProdutosSkeleton";

const produtosPromisse = fetch('https://fakestoreapi.com/products').then(res => res.json());

function ListaProdutos() {

    const produtos = use(produtosPromisse);

    // O use é uma função do React que permite suspender a renderização de um componente até que uma promessa seja resolvida. 
    // No exemplo acima, o componente ListaProdutos está usando a função use para suspender a renderização 
    // até que a promessa produtosPromisse seja resolvida. Enquanto isso, o fallback "Carregando Produtos..." será exibido.


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

            {/* <Suspense fallback={<div className={styles.loading}>Carregando Produtos...</div>}> */}
            <Suspense fallback={<ProdutosSkeleton />}>
                <ListaProdutos />
            </Suspense>

            {/*  O Suspense é um componente do React que permite exibir um fallback enquanto um componente filho está sendo carregado.
                 Ele é usado em conjunto com a função use, que é uma função do React que permite suspender
                 a renderização de um componente até que uma promessa seja resolvida. No exemplo acima,
                 o componente ListaProdutos está usando a função use para suspender a renderização até que a promessa produtosPromisse 
                 seja resolvida. Enquanto isso, o fallback "Carregando Produtos..." será exibido.      */}

        </section>

    )
}

export default Produtos
