import React from "react";
import {Button, Col, Image, Row} from "react-bootstrap";

// core components

class Gallery extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            leftOpen: true
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

                            </div>
                        </div>

                    </div>

                </div>
            </>
        );
    }
}

export default Gallery;
