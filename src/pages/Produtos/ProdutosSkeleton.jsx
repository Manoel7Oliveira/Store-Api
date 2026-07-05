import styles from './ProdutosSkeleton.module.css'

const produtos = Array.from({ length: 3 });

function ProdutosSkeleton() {

    return (

        <div className={styles.grid}>


            {produtos.map((_, i) => (
                <div className={styles.card} key={i}>
                    <div className={styles.imagePlaceholder}></div>
                    <div className={styles.titlePlaceholder}></div>
                    <div className={styles.pricePlaceholder}></div>
                    <div className={styles.btnPlaceholder}></div>
                </div>
            ))
            }

        </div>
    )


}

export default ProdutosSkeleton