import React from 'react';

// Import assets
import logo from '../../assets/logo.svg';

const Home = () => {
    return(
        <div id="homepage">
            <div className="content">
                <img src={logo} alt="Logo da Ecoleta" />
            </div>
        </div>
    );
}

export default Home;