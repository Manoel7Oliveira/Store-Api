import styles from "./produtoDetalhes.module.css"
import { useParams, Link } from "react-router-dom"
import { Suspense, useMemo } from "react";
import ProdutoDetalhesConteudo from "./ProdutoDetalhesConteudo";
import ErrorBoundary from "./ErrorBoundary";

function MensagemError({ error }) {
    console.error('-----error------');
    console.dir(error);


    if (error.message === 'Failed to fetch') return (
        <>

            <h2>Erro ao carregar o produto</h2>
            <Link to={'/produtos'}>Voltar</Link>

        </>
    )

    return (

        <>


            <h2>Erro ao carregar este produto</h2>
            <Link to={'/produtos'}>Voltar para página de produtos</Link>

        </>

    )

}

function ProdutoDetalhes() {

    const { id } = useParams();

    const produtoPromise = useMemo(() => {
        return fetch(`https://fakestoreapi.com/products/${id}`).then(res => {
            if (!res.ok) throw new Error(`Produto com id ${id} nao encontrado`);
            return res.json()
        });
    }, [id]);


    return (

        <article className={styles.container}>
            <Link className={styles.backbtn} to='/produtos'>Voltar</Link>
            <ErrorBoundary fallback={(error) => <MensagemError error={error} />}>
                <Suspense fallback={<p>Carregando produto...</p>}>
                    <ProdutoDetalhesConteudo produtoPromise={produtoPromise} />
                </Suspense>
            </ErrorBoundary>
        </article>
    )
}

export default ProdutoDetalhes