import React from "react";
import {Button, Col, Image, Row} from "react-bootstrap";
import { render } from 'react-dom'
import "../assets/css/gallery.css"
import lodash from 'lodash'
import data from './../data/data-gallery'
import Header from './GalleryHeader'
import { Grid, Slug, Fade } from 'mauerwerk'
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


class Gallery extends React.Component {

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

    metatx = e => this.setState({ filter: e.target.value })
    search = e => this.setState({ filter: e.target.value })
    shuffle = () => this.setState(state => ({ data: lodash.shuffle(state.data) }))
    setColumns = e => this.setState({ columns: parseInt(e.key) })
    setMargin = e => this.setState({ margin: parseInt(e.key) })
    setHeight = e => this.setState({ height: e })

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

                        <div id='left' className={leftOpen} >
                            <div className='icon'
                                 onClick={this.toggleSidebar} >
                                &equiv;
                            </div>
                            <div className={`sidebar ${leftOpen}`} >
                                <div className='header'>
                                    <h3 className='title'>
                                        C64 Minter
                                    </h3>
                                </div>
                                <div className='content'>
                                    <h3>Sidebar</h3>
                                    <ul>
                                        <li>
                                            <a href='/'>NFTs Minter</a>
                                        </li>
                                        <li>
                                            <a href='/gallery'>Gallery</a>

                                        </li>
                                        <li>
                                            About
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

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
                                    <Header
                                        {...this.state}
                                        metatx={this.metatx}
                                        search={this.search}
                                        shuffle={this.shuffle}
                                        setColumns={this.setColumns}
                                        setMargin={this.setMargin}
                                        setHeight={this.setHeight}
                                    />
                                    <Grid
                                        className="grid"
                                        // Arbitrary data, should contain keys, possibly heights, etc.
                                        data={data}
                                        // Key accessor, instructs grid on how to fet individual keys from the data set
                                        keys={d => d.name}
                                        // Can be a fixed value or an individual data accessor
                                        heights={this.state.height ? d => d.height : 200}
                                        // Number of columns
                                        columns={this.state.columns}
                                        // Space between elements
                                        margin={this.state.margin}
                                        // Removes the possibility to scroll away from a maximized element
                                        lockScroll={false}
                                        // Delay when active elements (blown up) are minimized again
                                        closeDelay={400}>
                                        {(data, maximized, toggle) => (
                                            <Cell {...data} maximized={maximized} toggle={toggle} />
                                        )}
                                    </Grid>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </>
        );
    }
}

export default Gallery;
