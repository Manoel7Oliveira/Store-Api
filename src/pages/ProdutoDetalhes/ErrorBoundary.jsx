import * as React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        // Atualiza o estado para que a próxima renderização mostre a interface de fallback.
        return { hasError: true, error };
    }

    componentDidCatch(error, info) {
        console.error("Erro capturado pelo ErrorBoundary:", error, info);
    }

    render() {
        if (this.state.hasError) {

            if (typeof this.props.fallback === 'function') {
              return this.props.fallback(this.state.error);
            }
            // Você pode renderizar qualquer UI de fallback personalizada
            return this.props.fallback || <p>Algo deu errado</p>;
        }

        return this.props.children;
        // o this aqui é o componente pai, ou seja, o componente que está utilizando o ErrorBoundary para envolver seus filhos, 
        // e o children são os componentes filhos que estão sendo renderizados dentro do ErrorBoundary. 
        // Se ocorrer um erro em algum desses componentes filhos, 
        // o ErrorBoundary irá capturar esse erro e renderizar a UI de fallback definida na prop fallback ou uma mensagem padrão.  
    }
}

export default ErrorBoundary
