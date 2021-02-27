import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../api/api';
import bitly from '../../api/bitly';

import Header from '../Header/Header';
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
                const responseBitly = await bitly(url);

                //verifica se a URL é válida
                if (responseBitly.status_code !== 200) {
                    alert('Por favor, insira uma URL válida');
                    return;
                }

                const responseUser = await api.get(`/user/get/${auth}`);

                const responseUrl = await api.post('/', {
                    userId: auth,
                    userLogin: responseUser.data.login,
                    urlOriginal: url,
                    urlGenerated: responseBitly.data.url,
                    date: Date.now()
                })
                if (responseUrl.status === 200) {
                    setUrlShort(responseUrl.data.urlGenerated);
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