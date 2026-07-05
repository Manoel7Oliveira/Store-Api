import { NavLink } from "react-router-dom"
import styles from "./Header.module.css"
import { useCarrinho } from "../../Stores/CarrinhoContext";

function Header() {

    const { totalItens } = useCarrinho();

    return (

        <header className={styles.header}>
            <h1 className={styles.logo}>FakeStore</h1>
            <nav className={styles.nav}>

                <ul>
                    <li>
                        <NavLink to='/' className={({ isActive }) => isActive ? styles.active : ''}>Home</NavLink>
                    </li>

                    <li>
                        <NavLink to='/produtos' className={({ isActive }) => isActive ? styles.active : ''}>Produtos</NavLink>
                    </li>

                    <li>
                        <NavLink to='/carrinho'> 🛒 Carrinho {totalItens > 0 && (
                            <span key={totalItens} className={styles.badge}>{totalItens}</span>
                            // A `key` força a recriação da badge para que a animação
                            // seja disparada sempre que o carrinho for atualizado.

                        )}</NavLink>
                    </li>

                </ul>

            </nav>

        </header>
    )
}


export default Header