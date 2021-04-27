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


const Cell = ({ toggle, name, height, description, css, maximized }) => (
    <div
        className="cell"
        style={{ backgroundImage: css, cursor: !maximized ? 'pointer' : 'auto' }}
        onClick={!maximized ? toggle : undefined}>
        <Fade show={maximized} delay={maximized ? 400 : 0}>
            <div className="details">
                <Slug delay={600}>
                    <div className="circle" style={{ background: css }} />
                    <div className="close">
                        <span  style={{ cursor: 'pointer' }} onClick={toggle}>X</span>
                    </div>
                    <h1>{name}</h1>
                    <p>{description}</p>
                </Slug>
            </div>
        </Fade>
        <Fade
            show={!maximized}
            from={{ opacity: 0, transform: 'translate3d(0,140px,0)' }}
            enter={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
            leave={{ opacity: 0, transform: 'translate3d(0,-50px,0)' }}
            delay={maximized ? 0 : 400}>
            <div className="default">{name}</div>
        </Fade>
    </div>
)


class About extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            leftOpen: true,
            data, columns: 3,
            margin: 70,
            filter: '',
            metatx: '721',
            height: true
        };

    }

    async componentDidMount() {
    }

    componentWillUnmount() {
    }

    toggleSidebar = (event) => {
        let key = `${event.currentTarget.parentNode.id}Open`;
        this.setState({ [key]: !this.state[key] });
    }

    render() {
        const data = this.state.data.filter(
            d => d.name.toLowerCase().indexOf(this.state.filter) !== -1
        )

        let leftOpen = this.state.leftOpen ? 'open' : 'closed';

        return (
            <>
                <div className="gallery">

                    <div id='layout'>

                        <Sidebar leftOpen={leftOpen}/>

                        <div id='main'>
                            <div className='header'>
                                <h3 className={`
                      title
                      ${'left-' + leftOpen}
                     
                  `}>
                                    Main header
                                </h3>
                            </div>
                            <div className='content'>
                                <div className="main">
                                    <p> About the project</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </>
        );
    }
}

export default About;
