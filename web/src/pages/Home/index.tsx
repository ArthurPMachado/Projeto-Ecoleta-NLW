import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import { Link } from 'react-router-dom';

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
                    
                    <Link to="/create-point">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Cadastre um ponto de coleta</strong>
                    </Link>
                </main>
            </div>
        </div>
    );
}

export default Home;