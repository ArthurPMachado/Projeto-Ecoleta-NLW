import React, { useEffect, useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { Map, TileLayer, Marker} from 'react-leaflet';
import api from '../../services/api';
import axios from 'axios';
import { LeafletMouseEvent } from 'leaflet';

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

interface IBGECityResponse {
    nome: string;
}

const CreatePoint = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [ufs, setUfs] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0]);
    
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        Whatsapp: ''
    });

    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0]);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;

            setInitialPosition([latitude, longitude]);
        });
    }, []);

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
        if(selectedUf === '0') {
            return;
        }

        axios.get<IBGECityResponse[]>(
            `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
            )             
            .then(response => {
                const cityNames = response.data.map(city => city.nome);

                setCities(cityNames);
            })
        }, [selectedUf]);
            
    function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value;
        setSelectedUf(uf);
    }
    
    function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value;
        
        setSelectedCity(city);
    }

    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([
            event.latlng.lat,
            event.latlng.lng
        ])
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    }

    function handleSelectItem(id: number) {
        setSelectedItems([id]);
    }

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
                               id="idName"
                               onChange={handleInputChange}
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="idEmail">E-mail</label>
                            <input type="email" 
                                   name="email" 
                                   id="idEmail"
                                   onChange={handleInputChange}
                            />
                        </div>

                        <div className="field">
                            <label htmlFor="idWhats">Whatsapp</label>
                            <input type="text" 
                                   name="whats" 
                                   id="idWhats"
                                   onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </fieldset>

                <Map 
                    center={initialPosition} 
                    zoom={15}
                    onClick={handleMapClick}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <Marker position={selectedPosition}/>
                </Map>
                
                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione o endereço do mapa</span>
                    </legend>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="idUf">Estado (UF)</label>
                            <select 
                                name="uf" 
                                id="idUf" 
                                value={selectedUf} 
                                onChange={handleSelectedUf}
                            >
                                <option value="0">Selecione uma UF</option>
                                {ufs.map(uf => (
                                    <option key={uf} value={uf}>{uf}</option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label htmlFor="idCidade">Cidade</label>
                            <select 
                                name="cidade" 
                                id="idCidade"
                                value={selectedCity}
                                onChange={handleSelectedCity}
                            >
                                <option value="0">Selecione uma cidade</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
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
                            <li 
                                key={item.id}
                                onClick={() => handleSelectItem(item.id)}
                                className={selectedItems.includes(item.id) ? 'selected' : ''}
                            >
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