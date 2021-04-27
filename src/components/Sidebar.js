import React from "react";
import {Button, Col, Form, Image, Row} from "react-bootstrap";
import "../assets/scss/mintCart.scss"
import * as FaIcons from "react-icons/fa";
// core components

class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            leftOpen: props.leftOpen
        };

    }


    async componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {

        return (
            <>
                <div className="sidebar">
                    <div id='left' className={this.state.leftOpen} >
                    <div className='icon'
                         onClick={this.toggleSidebar} >
                        &equiv;
                    </div>
                    <div className={`sidebar ${this.state.leftOpen}`} >
                        <div className='header'>
                            <h3 id='sidebarTitle'>
                                C64
                            </h3>
                        </div>
                        <div id="leftMenu" className=''>
                            <div className='sidebarLink'>
                                <a href='/wallet'>
                                    <FaIcons.FaUserSecret className="sidebarIcons"/>
                                    Wallet
                                </a>
                            </div>
                            <div className='sidebarLink'>
                                <a href='/'>
                                    <FaIcons.FaHome className="sidebarIcons"/>
                                    NFTs Minter
                                </a>
                            </div>

                            <div className='sidebarLink'>
                                <a href='/gallery'>
                                    <FaIcons.FaImages className="sidebarIcons"/>
                                    Gallery
                                </a>
                            </div>

                            <div className='sidebarLink'>
                                <a href='/about'>
                                    <FaIcons.FaInfo className="sidebarIcons"/>
                                    About
                                </a>
                            </div>

                        </div>
                    </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Sidebar;
