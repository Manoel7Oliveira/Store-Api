import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import styles from "./Produtos.module.css"

function Produtos() {

    const [produtos, setProdutos] = useState([]);
    const [carregando, setCarregando] = useState(true);
   
    useEffect(() => {

        async function fetchProdutos() {

            try {

                const resposta = await fetch('https://fakestoreapi.com/products')
                const data = await resposta.json()
                setProdutos(data);
             
            } catch (err) {
                console.log('Error', err)
            } finally {
                setCarregando(false);
            }
        }

        fetchProdutos();
    }, []);

    if (carregando) return (
        <div className={styles.loading}>Carregando Produtos...</div>
    )

    return (

        <section>

            <h2>Nossos produtos</h2>

            <div className={styles.grid}>

                {produtos.map(produto => (
                    <article key={produto.id} className={styles.card}>
                        <div className={styles.image}>
                            <img src={produto.image} alt={produto.title} />
                        </div>

                        <h3>{produto.title}</h3>

                        <p className={styles.price}>{produto.price.toFixed(2)}</p>

                        <Link className={styles.btn} to={`/produtos/${produto.id}`}>Ver mais detalhes</Link>
                    </article>
                ))}

            </div>

        </section>

    )
}

export default Produtos
