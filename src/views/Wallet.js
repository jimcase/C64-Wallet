import React from "react";
import "../assets/css/gallery.css"
import Sidebar from "../components/Sidebar";
// core components


class Wallet extends React.Component {

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
                                    <p> About the wallet</p>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </>
        );
    }
}

export default Wallet;
