import React, {useEffect, useState} from 'react';
import {api} from './api';
import 'bootstrap/dist/css/bootstrap.min.css';
import Minter from "./views/Minter";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Gallery from "./views/Gallery";
import About from "./views/About";
import Wallet from "./views/Wallet";
import "./assets/css/layout.css";

const App = () => {
    const [successText, setSuccessText] = useState(null);

    useEffect(() => {
        api.get('/test')
            .then(({data}) => setSuccessText(data))
            .catch(err => console.error(err));
    });

    return (
        <Router>
            <Switch>
                <Route path='/' exact component={Minter}/>
                <Route path='/wallet' exact component={Wallet}/>
                <Route path='/gallery' exact component={Gallery}/>
                <Route path='/about' exact component={About}/>
            </Switch>
        </Router>
    );
};

export default App;
