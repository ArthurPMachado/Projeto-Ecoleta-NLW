import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

// Import Assets
import './styles.css';
import logo from '../../assets/logo.svg';


const CreatePoint = () => {
    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Imagem para a logo de criar um ponto"/>

                <Link to='/'>
                    <FiArrowLeft />
                    Voltar para home
                </Link>
            </header>
        </div>
    );
}

export default CreatePoint