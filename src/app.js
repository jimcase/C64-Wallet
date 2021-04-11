import React, {useState, useEffect} from 'react';
import {api} from './api';
import 'bootstrap/dist/css/bootstrap.min.css';
import Minter from "./views/Minter";

const App = () => {
    const [successText, setSuccessText] = useState(null);

    useEffect(() => {
        api.get('/test')
            .then(({data}) => setSuccessText(data))
            .catch(err => console.error(err));
    });

    return (
        <div id="mainContainer">
            <Minter/>
            <p>Hello from Expressjs server: {successText}</p>
            <p>{successText}</p>
        </div>
    );
};

export default App;
