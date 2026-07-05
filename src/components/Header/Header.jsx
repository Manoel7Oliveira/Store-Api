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
                            // a key foi usada para forçar o React a recriar o elemento da badge toda vez que o total de itens mudar,
                            //  assim a animação de adição ao carrinho irá funcionar toda vez que um item for adicionado, 
                            // mesmo que o total de itens seja o mesmo (por exemplo, quando um item é adicionado e depois removido,
                            //  o total de itens volta a ser o mesmo,
                            //  mas a badge irá recriar o elemento e a animação irá funcionar)

                        )}</NavLink>
                    </li>

                </ul>

            </nav>

        </header>
    )
}


export default Header