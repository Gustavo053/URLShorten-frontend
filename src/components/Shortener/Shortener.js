import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import spring from '../../api/spring';
// import axios from 'axios';

import Header from '../header/Header';
import './Shortener.css';

function Shortener() {
    const history = useHistory();
    const [url, setUrl] = useState();
    const [urlShort, setUrlShort] = useState();

    async function handleSumbmit(event) {
        event.preventDefault();

        const auth = localStorage.getItem('auth');

        if (auth == null) {
            alert('Por favor, cadastre-se para utilizar o encurtador');
            history.push('/register');
        } else {
            try {
                const response = await spring.post('/', { userId: auth, urlOriginal: url, urlGenerated: url, date: Date.now() })
                if (response.status === 200) {
                    setUrlShort(response.data.urlGenerated);
                }
            } catch (err) {
                localStorage.removeItem('auth');
                alert('Por favor, cadastre-se para utilizar o encurtador')
                history.push('/register');
            }

        }
    }

    return (
        <>
            <Header />
            <div className="container">
                <form className="form-url" onSubmit={handleSumbmit}>
                    <div className="title-application">
                        <h2>URL Shorten</h2>
                    </div>
                    <hr />
                    <label>URL original:</label>
                    <br />
                    <input
                        type="text"
                        placeholder="Informe o link original"
                        onChange={evt => setUrl(evt.target.value)}
                    />
                    <br />
                    <label>URL encurtada:</label> <br />
                    <input
                        value={urlShort}
                        placeholder="URL encurtada aqui"
                        type="text"
                        disabled
                    />
                    <br />
                    <div id="align-button">
                        <button type="submit">Encurtar</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Shortener;