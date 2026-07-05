import { createContext, useContext, useEffect, useState } from "react";


const CarrinhoContext = createContext();

export function CarrinhoProvider({ children }) {

    const [itens, setItens] = useState(() => {
        const salvo = localStorage.getItem("fakeStore:carrinho"); // aqui estamos tentando recuperar o carrinho do localStorage,
        //  e se não tiver nada salvo, ele irá retornar um array vazio
        return salvo ? JSON.parse(salvo) : [] // aqui estamos convertendo a string salva no localStorage de volta para um 
        // array de objetos
    });

    // Podemos passar uma função para o useState, e essa função só será executada na primeira renderização do componente,
    //  ou seja, quando o componente for montado. 
    // Isso é útil para evitar que a função seja executada toda vez que o componente for renderizado, 
    // o que pode ser um problema de performance se a função for complexa ou demorada. No nosso caso, 
    // a função é responsável por recuperar o carrinho do localStorage, 
    // e isso só precisa ser feito uma vez, quando o componente for montado.

    useEffect(() => {
        localStorage.setItem("fakeStore:carrinho", JSON.stringify(itens));
    }, [itens]);

    // efeito colateral é o tipo de código que é executado em resposta a uma mudança de estado ou a um evento, 
    // e que pode causar efeitos colaterais fora do componente, como por exemplo, atualizar o localStorage, 
    // fazer uma requisição para uma API, etc. Para isso, utilizamos o hook useEffect, 
    // que recebe uma função e um array de dependências. A função é executada toda vez que uma das dependências mudar. 
    // No nosso caso, a dependência é o array de itens do carrinho, ou seja, toda vez que o carrinho for atualizado,
    // a função do useEffect será executada e irá salvar o carrinho no localStorage.


    // O efeito colateral é utilizado para salvar o carrinho no localStorage toda vez que o carrinho for 
    // atualizado, ou seja, toda vez que o array de itens for atualizado, ele irá salvar o carrinho no localStorage,
    //  convertendo o array de objetos para uma string utilizando JSON.stringify
    const adicionarAoCarrinho = (produto) => {
        setItens(prev => {
            const existe = prev.find(item => item.id === produto.id);

            if (existe) {
                return prev.map(item => item.id === produto.id ? { ...item, quantidade: item.quantidade + 1 } : item);
            }

            return [...prev, { ...produto, quantidade: 1 }]

        });

        // alert(`O produto com id: ${produto.id} foi adicionado ao carrinho`);
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

/*
...array   -> espalha elementos
...objeto  -> espalha propriedades

Por que arrow function na exportação?

Você pode ter notado que no vídeo passado eu troquei:
export const useCarrinho = useContext(CarrinhoContext);
por:
export const useCarrinho = () => useContext(CarrinhoContext);
Ou seja, eu envolvi o useContext em uma arrow function
Se você ficou na dúvida do porquê eu fiz isso, aqui vai uma explicação

1. O Momento da Execução
Quando definimos const useCarrinho = useContext(CarrinhoContext); (sem a arrow function), 
estamos tentando executar o useContext no momento em que o arquivo é lido pelo navegador, e não quando um componente é renderizado.

Com Arrow Function: Criamos uma definição de uma função. O useContext só será executado "sob demanda", ou seja, 
quando chamamos useCarrinho() dentro de um componente.

Sem Arrow Function: O JavaScript tenta executar o useContext imediatamente, antes mesmo da sua aplicação React ter 
começado a rodar ou montado o Provider.

2. A "Regra de Ouro" dos Hooks
O React tem uma regra estrita: Hooks só podem ser chamados dentro de componentes funcionais ou de outros Hooks.

Se escrevermos export const useCarrinho = useContext(...), estamos chamando um Hook no escopo global do arquivo. 
O React não sabe qual componente está tentando acessar o contexto e vai disparar um erro parecido com:

"Invalid hook call. Hooks can only be called inside of the body of a function component."

3. A Dinâmica da Árvore de Componentes
O useContext funciona procurando o Provider mais próximo acima dele na árvore de componentes no momento da renderização.

Se executássemos ele fora de uma função, ele não estaria "dentro" de nada. Ao usar a arrow function, garantimos que, quando o Header 
,por exemplo, chamar useCarrinho(), o React olhe para cima a partir do Header e encontre o seu CarrinhoProvider.

Analogia
Imagine que o useContext é como pedir um café:

Com a arrow function (() => useContext): Estamos escrevendo um bilhete que diz: "Toda vez que eu ler este bilhete, 
vá até a cozinha e me traga um café". Nós só teremos o café quando decidir ler o bilhete na cozinha (dentro do componente).

Sem a arrow function: Estamos tentando pegar o café no momento em que está escrevendo o bilhete,
 antes mesmo de existir uma cozinha ou uma cafeteira.

*/