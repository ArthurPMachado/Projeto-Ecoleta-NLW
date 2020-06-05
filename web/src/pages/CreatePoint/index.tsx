import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker} from 'react-leaflet';
import api from '../../services/api';
import axios from 'axios';

// Import Assets
import './styles.css';
import logo from '../../assets/logo.svg';


interface Item {
    id: number;
    title: string;
    image_url: string;
}

interface IBGEUFResponse {
    sigla: string;
}

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);

    useEffect(() => {
        api.get('items').then(response => {
            setItems(response.data);
        });
    }, []);

    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
             .then(response => {
                const ufSigla = response.data.map(uf => uf.sigla);

                setUfs(ufSigla);
            });
    }, []);

    // Carregar as cidades sempre que a UF mudar
    useEffect(() => {

    }, []);

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
                                {ufs.map(uf => (
                                    <option key={uf} value={uf} >{uf}</option>
                                ))}
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
                        {items.map(item => (
                            <li key={item.id}>
                                <img src={item.image_url} alt={item.title}/>
                                <span>{item.title}</span>
                            </li>
                        ))}
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