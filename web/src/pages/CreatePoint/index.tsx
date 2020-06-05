import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker} from 'react-leaflet';

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
            <form >
                <h1>Cadastro do <br/> do ponto de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="idName">Nome da entidade</label>
                        <input type="text" 
                               name="name" 
                               id="idName"/>
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="idEmail">E-mail</label>
                            <input type="email" 
                                name="email" 
                                id="idEmail"/>
                        </div>

                        <div className="field">
                            <label htmlFor="idWhats">Whatsapp</label>
                            <input type="text" 
                                name="whats" 
                                id="idWhats"/>
                        </div>
                    </div>
                </fieldset>

                <Map center={[-23.5267829, -46.5451525]} zoom={15}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={[-23.5267829, -46.5451525]}/>
                </Map>
                
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço do mapa</span>
                    </legend>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="idUf">Estado (UF)</label>
                            <select name="uf" id="idUf">
                                <option value="0">Selecione uma UF</option>
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="idCidade">Cidade</label>
                            <select name="cidade" id="idCidade">
                                <option value="0">Selecione uma cidade</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                
                <fieldset>
                    <legend>
                        <h2>Itens de coleta</h2>
                        <span>Selecione um ou mais itens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        <li>
                            <img src="http://localhost:3300/uploads/oleo.svg" alt="Imagem de óleo"/>
                            <span>Óleo de cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3300/uploads/oleo.svg" alt="Imagem de óleo"/>
                            <span>Óleo de cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3300/uploads/oleo.svg" alt="Imagem de óleo"/>
                            <span>Óleo de cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3300/uploads/oleo.svg" alt="Imagem de óleo"/>
                            <span>Óleo de cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3300/uploads/oleo.svg" alt="Imagem de óleo"/>
                            <span>Óleo de cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3300/uploads/oleo.svg" alt="Imagem de óleo"/>
                            <span>Óleo de cozinha</span>
                        </li>
                    </ul>
                </fieldset>

                <button type="submit">
                    Cadastrar ponto de coleta
                </button>
            </form>
        </div>
    );
}

export default CreatePoint;