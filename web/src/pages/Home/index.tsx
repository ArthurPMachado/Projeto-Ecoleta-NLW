import React from 'react';
import {} from 'react-icons';

// Import css
import './styles.css';

// Import assets
import logo from '../../assets/logo.svg';

const Home = () => {
    return(
        <div id="homepage">
            <div className="content">
                <header>
                    <img src={logo} alt="Logo da Ecoleta" />
                </header>
                <main>
                    <h1>Seu marketplace de coleta de residuos</h1>
                    <p>Ajudamos pessoas a encontrarem pontos de 
                        coleta de forma eficiente</p>
                    
                    <a href="/cadastro">
                        <span>
                            >
                        </span>
                        <strong>Cadastre um ponto de coleta</strong>
                    </a>
                </main>
            </div>
        </div>
    );
}

export default Home;