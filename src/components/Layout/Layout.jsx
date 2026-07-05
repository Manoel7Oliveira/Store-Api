import { Outlet } from "react-router-dom"
import styles from "./Layout.module.css"
import Header from "../Header/Header"
import Footer from "../Footer/Footer"

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
