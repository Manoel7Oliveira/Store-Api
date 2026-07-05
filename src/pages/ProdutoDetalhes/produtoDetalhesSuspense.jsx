import styles from "./produtoDetalhes.module.css"
import { useParams, Link } from "react-router-dom"
import { Suspense, useMemo } from "react";
import ProdutoDetalhesConteudo from "./ProdutoDetalhesConteudo";
import ErrorBoundary from "./ErrorBoundary";

function MensagemError({ error }) {
    console.log('-----error------');
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

    //cost produtoPromise = fetch(`https://fakestoreapi.com/products/${id}`).then(res => res.json());

    const produtoPromise = useMemo(() => {
        return fetch(`https://fakestoreapi.com/products/${id}`).then(res => {
            if (!res.ok) throw new Error(`Produto com id ${id} nao encontrado`);
            return res.json()
        });
    }, [id]);

    // O useMemo é utilizado para memorizar o valor do produtoPromise, ou seja, ele só irá fazer a requisição quando o id mudar,
    //  evitando assim requisições desnecessárias quando o componente for re-renderizado por outros motivos.


    return (

        <article className={styles.container}>
            <Link className={styles.backbtn} to='/produtos'>Voltar</Link>
            {/* <ErrorBoundary fallback={<p>Nao foi possivel carregar o produto</p>}> */}
            <ErrorBoundary fallback={(error) => <MensagemError error={error} />}>
                <Suspense fallback={<p>Carregando produto...</p>}>
                    <ProdutoDetalhesConteudo produtoPromise={produtoPromise} />
                </Suspense>
            </ErrorBoundary>
        </article>
    )
}

export default ProdutoDetalhes