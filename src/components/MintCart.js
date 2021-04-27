import React from "react";
import {Button, Col, Image, Row} from "react-bootstrap";
import "../assets/scss/invoice.scss"
// core components

class MintCart extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

        };

    }


    async componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {

        return (
            <>
                <div className="invoice">
                    <div class="wrap cf">
                        <h1 class="projTitle">Minting Cart</h1>

                        <div class="cart">

                            <ul class="cartWrap">
                                <li class="items odd">

                                    <div class="infoWrap">
                                        <div class="cartSection">
                                            <img src="http://lorempixel.com/output/technics-q-c-300-300-4.jpg" alt="" class="itemImg" />
                                            <p class="itemNumber">#QUE-007544-002</p>
                                            <h3>Metadata tx 16kb</h3>

                                            <p> <input type="text"  class="qty" disabled placeholder="3"/> x ₳5.00</p>

                                            <p class="stockStatus"> 100% on-chain</p>
                                        </div>


                                        <div class="prodTotal cartSection">
                                            <p>₳15.00</p>
                                        </div>
                                    </div>
                                </li>
                                <li class="items even">

                                    <div class="infoWrap">
                                        <div class="cartSection">

                                            <img src="http://lorempixel.com/output/technics-q-c-300-300-4.jpg" alt="" class="itemImg" />
                                            <p class="itemNumber">#QUE-007544-002</p>
                                            <h3>Metadata tx 3.2kb</h3>

                                            <p> <input type="text"  class="qty" placeholder="1" disabled/> x ₳5.00</p>

                                            <p class="stockStatus"> 100% on-chain</p>
                                        </div>


                                        <div class="prodTotal cartSection">
                                            <p>₳5.00</p>
                                        </div>

                                    </div>
                                </li>


                            </ul>
                        </div>

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
