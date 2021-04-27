import React, {useState, useEffect} from 'react';
import {api} from './api';
import 'bootstrap/dist/css/bootstrap.min.css';
import Minter from "./views/Minter";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Gallery from "./views/Gallery";
import About from "./views/About";

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
                <Route path='/gallery' exact component={Gallery}/>
                <Route path='/about' exact component={About}/>
            </Switch>
        </Router>
    );
};

export default App;
