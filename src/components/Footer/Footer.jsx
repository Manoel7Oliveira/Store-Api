import styles from "./Footer.module.css"

function Footer() {

    const anoAtual = new Date().getFullYear();

    return (

        <footer className={styles.footer}>
            <div className={styles.container}>

                <p>&copy; {anoAtual} FakeStore. Todos os direitos reservados.</p>

                <nav className={styles.social}>
                    <a href="#">Instagram</a>
                    <a href="#">Twitter</a>
                    <a href="#">LinkedIn</a>
                </nav>

            </div>

        </footer>
    )
}

export default Footer