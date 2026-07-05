import { Link, useNavigate } from "react-router-dom";
import { useCarrinho } from "../../Stores/CarrinhoContext";
import styles from "./Carrinho.module.css"
import { useState } from "react";

function Carrinho() {

    const { itens, valorTotal, removerDoCarrinho, atualizarQuantidade, limparCarrinho } = useCarrinho();

    const [idParaExclusao, setIdParaExclusao] = useState(null);
    const [itemParaConfirmar, setItemParaConfirmar] = useState(null); // Modal

    const navigate = useNavigate();

    // function handleRemover(item) {
    //     const confirmou = window.confirm('Tem certeza que deseja remover esse item do carrinho ' + item.title);

    //     if (confirmou) {
    //         removerDoCarrinho(item.id);
    //     }

    // }

    function iniciarExclusao(id) {
        setIdParaExclusao(id); // Css - Animaçao
        setItemParaConfirmar(null);
        setTimeout(() => {
            removerDoCarrinho(id);
            setIdParaExclusao(null);
        }, 500);
    }

    async function finalizarCompra() {

        const dadosParaEnvio = {
            userid: 8,
            date: new Date().getTime(),
            products: itens.map(item => ({
                productId: item.id,
                quantity: item.quantidade
            }))
        }

        try {

            const response = await fetch("https://fakestoreapi.com/carts", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dadosParaEnvio),

            });

            if (response.ok) {
                const data = await response.json();
                console.log('Sucesso');
                console.log(data);

                alert('Pedido enviado com sucesso');
                limparCarrinho();
            }

            navigate("/");

        } catch (err) {
            console.log('Error', err);
        }
    }

    if (itens.length === 0) {
        return (
            <>
                <h2>Seu carrinho esta vazio</h2>

                <Link to='/produtos'>Voltar para página de produtos</Link>
            </>
        )
    }

    return (
        <>
            <h2>Seu carrinho</h2>

            {itemParaConfirmar && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <p>Deseja realmente excluir o item do carrinho <b>{itemParaConfirmar.title}?</b></p>
                        <div className={styles.modalBtns}>
                            <button onClick={() => setItemParaConfirmar(null)}>Cancelar</button>
                            <button className={styles.confirmBtn} onClick={() => iniciarExclusao(itemParaConfirmar.id)}>Confirmar</button>
                        </div>
                    </div>
                </div>
            )}

            <div className={styles.grid}>


                <section className={styles.itemList}>
                    {itens.map(item => (
                        <div key={item.id} className={`${styles.item} ${idParaExclusao === item.id ? styles.itemSaindo : ''}`}>
                            <img src={item.image} alt={item.title} />
                            <div className={styles.detalhes}>
                                <h3>{item.title}</h3>
                                <p>R$ {item.price.toFixed(2)}</p>
                                <div className={styles.controles}>
                                    <button onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}>-</button>
                                    <span>{item.quantidade}</span>
                                    <button onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}>+</button>
                                    {/* <button className={styles.removeBtn} onClick={() => handleRemover(item)}>Remover</button> */}
                                    <button className={styles.removeBtn} onClick={() => setItemParaConfirmar(item)}>Remover</button>

                                </div>
                            </div>
                        </div>
                    ))}
                </section>

                <section className={styles.valorTotal}>
                    <h2>Resumo</h2>
                    <p>Total: <b> R$ {valorTotal.toFixed(2)}</b></p>
                    <button onClick={finalizarCompra} className={styles.checkoutBtn}>Finalizar a compra</button>
                </section>
            </div>

        </>
    )


}

export default Carrinho