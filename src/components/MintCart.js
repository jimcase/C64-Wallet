import React from "react";
import {Button, Form} from "react-bootstrap";
import "../assets/scss/mintCart.scss"
import endpoints from "../data/endpoints/endpoints";

// core components

class MintCart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedEndpoint: endpoints[0],
            image: props.image,
            nChunks: props.nChunks,
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
                                <li className="items odd">

                                    <div className="infoWrap">
                                        <div className="cartSection">
                                            <img src={this.props.image} alt="" className="itemImg"/>
                                            <p className="itemNumber">#QUE-007544-002</p>
                                            <h3>Metadata tx 16kb</h3>

                                            <p><input type="text" className="qty" disabled
                                                      placeholder={"" + this.props.nChunks - 1 + ""}/> x ₳5.00</p>

                                            <p className="stockStatus"> 100% on-chain</p>
                                        </div>


                                        <div className="prodTotal cartSection">
                                            <p>₳15.00</p>
                                        </div>
                                    </div>
                                </li>
                                <li className="items odd">

                                    <div className="infoWrap">
                                        <div className="cartSection">

                                            <img src={this.props.image} alt="" className="itemImg"/>
                                            <p className="itemNumber">#QUE-007544-002</p>
                                            <h3>Metadata tx 3.2kb</h3>

                                            <p><input type="text" className="qty" placeholder="1" disabled/> x ₳1.00</p>

                                            <p className="stockStatus"> 100% on-chain</p>
                                        </div>


                                        <div className="prodTotal cartSection">
                                            <p>₳1.00</p>
                                        </div>

                                    </div>
                                </li>


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
