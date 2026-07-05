import { Outlet } from "react-router-dom"
import styles from "./Layout.module.css"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"

// O outlet é um componente do react-router-dom que serve para renderizar os componentes filhos da rota atual, ou seja,
// ele irá renderizar o componente Home quando a rota for igual a "/" e o componente Produtos quando a rota for igual a "/produtos"


function Layout() {
    return (

        <div className={styles.wrapper}>
            <Header />
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default Layout
