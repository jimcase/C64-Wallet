import React from "react";
import {Button, Form} from "react-bootstrap";
import "../assets/scss/mintCart.scss"
import "../assets/css/mintCart.css"
import endpoints from "../data/endpoints/endpoints";
import * as FaIcons from "react-icons/fa";

// core components

class MintCart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            // TODO: calc tx fee
            selectedEndpoint: endpoints[0],
            image: props.image,
            nChunks: props.nChunks,
            fileChunks: props.chunks
        };

    }

    // TODO adapt function to mint assets
    async mintNFT(key,limit) {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        // TODO change endpoint
        fetch('https://'+this.state.selectedEndPoint.testnet+'/tx_metadata?key=eq.'+key+'&limit='+limit, requestOptions)
            .then(response => response.text())
            .then(data => {
                this.setState({metadataResponse: JSON.parse(data)});
            }).then(e => null);
    }

    handleSelectedEndpoint(ticker){
        let endp = endpoints.filter(e => e.ticker === ticker);

        this.setState({
            selectedEndPoint: endp[0]
        }, () => {
            alert(this.state.selectedEndPoint.mainnet);
        });
    }
    async componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {

        return (
            <>
                <div className="invoice">
                    <div className="wrap cf">
                        <h1 className="projTitle">Minting Cart</h1>

                        <div className="cart">

                            <ul className="cartWrap">

                                {this.props.chunks
                                && this.props.chunks.length > 0 ? (
                                    <div id="lastMetadata">
                                        <li className="items odd">

                                            <div className="infoWrap">
                                                <div className="cartSection">
                                                    <img src={this.props.image} alt="" className="itemImg"/>
                                                    <p className="itemNumber whiteText">#QUE-007544-002</p>
                                                    <h3>Metadata tx {this.props.chunks[0].length} bytes</h3>

                                                    <p className="whiteText"><input type="text"
                                                                                    className="qty whiteText"
                                                                                    disabled
                                                                                    placeholder={"" + this.props.nChunks - 1 + ""}/> x
                                                        ₳5.00</p>

                                                    <p className="stockStatus whiteText onChain"> 100% on-chain</p>
                                                    <p className="stockStatus whiteText signedTx"><FaIcons.FaSignature
                                                        className="signedIcon"/> signed</p>
                                                </div>


                                                <div className="prodTotal cartSection">
                                                    <p className="whiteText">₳15.00</p>
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                ) : null}

                                {this.props.chunks
                                && this.props.chunks.length > 1 ? (
                                    <div id="lastMetadata">
                                        <li className="items odd">
                                            <div className="infoWrap">
                                                <div className="cartSection">
                                                    <img src={this.props.image} alt="" className="itemImg"/>
                                                    <p className="itemNumber whiteText">#QUE-007544-002</p>
                                                    <h3>Metadata
                                                        tx {this.props.chunks[this.props.chunks.length - 1].length} bytes</h3>
                                                    <p className="whiteText">
                                                        <input type="text" className="qty whiteText" placeholder="1"
                                                               disabled/>
                                                        x ₳1.00</p>
                                                    <p className="stockStatus whiteText onChain"> 100% on-chain</p>
                                                    <p className="stockStatus whiteText signedTx"><FaIcons.FaSignature
                                                        className="signedIcon"/> signed</p>
                                                </div>


                                                <div className="prodTotal cartSection">
                                                    <p className="whiteText">₳1.00</p>
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                ) : null}
                            </ul>
                        </div>

                        <Form.Label className="selectEndpointLabel">Select endpoint</Form.Label>
                        <Form.Control as="select" className="selectEndpointInput" onChange={ e => this.handleSelectedEndpoint(e.target.value)}>
                            <option  value="PEACE">Dandelion APIs [PEACE]</option>
                            <option  value="BOOST">Ada Booster SP [BOOST]</option>
                        </Form.Control>
                        <Button variant="secondary" size="lg" block onClick={null}>
                            Mint NFT
                        </Button>
                    </div>
                </div>
            </>
        );
    }
}

export default MintCart;
