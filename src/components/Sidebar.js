import React from "react";
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
        let leftOpen = this.state.leftOpen ? 'open' : 'closed';


        return (
            <>
                <div id='left' className={leftOpen}>
                    <div className='icon'
                         onClick={this.toggleSidebar}>
                        &equiv;
                    </div>
                    <div className={`sidebar ${leftOpen}`}>
                        <div className='header'>

                        </div>
                        <div id="leftMenu" className=''>
                            <div className='sidebarLink'>
                                <a href='/'>
                                    <FaIcons.FaHome className="sidebarIcons"/>
                                </a>
                            </div>

                            <div className='sidebarLink'>
                                <a href='/gallery'>
                                    <FaIcons.FaImages className="sidebarIcons"/>
                                </a>
                            </div>

                            <div className='sidebarLink infoButton'>
                                <FaIcons.FaInfo className="sidebarIcons"/>
                            </div>

                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default Sidebar;
