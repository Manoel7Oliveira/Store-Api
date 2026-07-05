import { createContext, useContext, useEffect, useState } from "react";


const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {

    const [itens, setItens] = useState(() => {
        const salvo = localStorage.getItem("fakeStore:carrinho");
        return salvo ? JSON.parse(salvo) : []
    });

    useEffect(() => {
        localStorage.setItem("fakeStore:carrinho", JSON.stringify(itens));
    }, [itens]);

    const adicionarAoCarrinho = (produto) => {
        setItens(prev => {
            const existe = prev.find(item => item.id === produto.id);

            if (existe) {
                return prev.map(item => item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item);
            }

            return [...prev, { ...produto, quantidade: 1 }]

        });

    }

    const removerDoCarrinho = (id) => {
        setItens(prev => prev.filter(item => item.id !== id));
    }

    const atualizarQuantidade = (id, novaQuantidade) => {

        if (novaQuantidade < 1) return

        setItens(prev => prev.map(item => {
            return item.id === id ? { ...item, quantidade: novaQuantidade } : item

        }));

    }

    const limparCarrinho = () => setItens([]);


    const valorTotal = itens.reduce((acc, item) => acc + (item.price * item.quantidade), 0);

    const totalItens = itens.reduce((acc, item) => acc + item.quantidade, 0);

    return <CarrinhoContext.Provider value={{
        adicionarAoCarrinho,
        itens,
        totalItens,
        removerDoCarrinho,
        atualizarQuantidade,
        valorTotal,
        limparCarrinho
    }}>
        {children}
    </CarrinhoContext.Provider>

}

export const useCarrinho = () => useContext(CarrinhoContext);

