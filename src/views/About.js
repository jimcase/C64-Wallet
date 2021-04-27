import React from "react";
import {Button, Col, Image, Row} from "react-bootstrap";
import { render } from 'react-dom'
import "../assets/css/gallery.css"
import lodash from 'lodash'
import data from './../data/data-gallery'
import Header from './GalleryHeader'
import { Grid, Slug, Fade } from 'mauerwerk'
import Sidebar from "../components/Sidebar";
// core components





class About extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            leftOpen: true,

        };

    }


    async componentDidMount() {
    }

    componentWillUnmount() {
    }


    render() {

        let leftOpen = this.state.leftOpen ? 'open' : 'closed';
        return (
            <>
                <div className="about">
                    <div id='layout'>

                        <Sidebar leftOpen={leftOpen}/>
                        Hello
                    </div>

                </div>
            </>
        );
    }
}

export default About;
