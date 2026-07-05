import { useParams, Link } from "react-router-dom"
import styles from "./produtoDetalhes.module.css"
import { useEffect, useState } from "react";

function ProdutoDetalhes() {

    const [carregando, setCarregando] = useState(true);
    const [produto, setProduto] = useState(null);

    const { id } = useParams();

    useEffect(() => {

        async function fetchproduto() {

            try {

                const resposta = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data = await resposta.json()
                setProduto(data);

            } catch (err) {
                console.error('Error', err);

            } finally {
                setCarregando(false);
            }
        }

        fetchproduto();

    }, [id]);

    if (carregando) return (
        <div className={styles.loading}>Carregando detalhes do produto...</div>
    )

    return (

        <article className={styles.container} key={produto.id}>
            <Link className={styles.backbtn} to='/produtos'>Voltar</Link>

            <div className={styles.content}>
                <div className={styles.image}>
                    <img src={produto.image} alt={produto.title} />
                </div>
                <div className={styles.info}>
                    <span className={styles.categoria}>{produto.category}</span>
                    <h1 className={styles.title}>{produto.title}</h1>
                    <p className={styles.descricao}>{produto.description}</p>
                    <p className={styles.preco}>{produto.price.toFixed(2)}</p>
                    <button className={styles.btn}>Adicionar ao carrinho</button>
                </div>
            </div>

        </article>

    )
}

export default ProdutoDetalhes