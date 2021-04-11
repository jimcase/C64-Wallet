import React from "react";

import {Tab, Col, Nav, Image, Button} from 'react-bootstrap';
import {Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


import "../assets/css/layout.css";

import {faHammer, faInfoCircle, faPuzzlePiece} from "@fortawesome/free-solid-svg-icons";
import {faUnsplash} from "@fortawesome/free-brands-svg-icons";
import {forEach} from "react-bootstrap/ElementChildren";
import {api} from "../api";

// core components

class Minter extends React.Component {

    constructor(props) {
        super(props);

        this.MAX_SIZE = 14000;

        this.state = {
            file: '',
            fileSource: '',
            base64: '',
            base64Size: 0,
            showLoading: false,
            fileChunks: [],
            joinedBase64: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }


    async componentDidMount() {
    }

    componentWillUnmount() {
    }

    handleAsset(){

        console.log("Hello");
        if (this.state.base64.length > 0){
            api.get('/processAsset')
                .then(({data}) => console.log("data from server: "+data))
                .catch(err => console.error(err));
        }
        else{
            console.log("No data from server");
        }

    }

    joinBase64(base64Array){

        let base64 = '';
        for(let i=0; i<base64Array.length; i++){
            base64 = base64.concat(base64Array[i]);
            //console.log(i+": "+base64Array[i]);
        }
        //console.log("base64Array: "+base64Array.length);
        this.setState({
            joinedBase64: base64
        }, () => {
        });
    }

    getChunkImage(chunk){}

    splitBase64(base64){

        this.setState({
            showLoading: true
        });

        // Get num iterations
        let nChunks = this.state.base64Size/this.MAX_SIZE;
        //console.log("base64Size: "+this.state.base64Size);
        //console.log("MAX_SIZE: "+this.MAX_SIZE);
        //console.log("nChunks: "+nChunks);
        let base64Length = base64.length;
        //console.log("base64Length: "+base64Length);
        let dist = base64Length/nChunks;
        //console.log("distance: "+dist);

        let chunckArray = [];

        let i, o;
        for (i = 0, o = 0; i < nChunks; ++i, o += this.MAX_SIZE) {
            chunckArray.push(base64.substr(o, this.MAX_SIZE));
            //console.log(i+" chunk & csize "+o+": "+base64.substr(o, this.MAX_SIZE));
        }
        // One more iteration
        chunckArray.push(base64.substr(o, base64Length-o));

        this.setState({
            fileChunks: chunckArray
        }, () => {

            this.joinBase64(this.state.fileChunks);

            this.setState({
                showLoading: false
            });
        });
    }

    handleChange(event) {

        this.setState({
            showLoading: true
        });
        let file = event.target.files[0];

        this.setState({
            file: URL.createObjectURL(file),
            fileSource: event.target.files[0]
        }, () => {

            this.readFileDataAsBase64(file).then(r =>{
                this.setState({
                    base64: r,
                    base64Size: (r.length * (3/4)) - 2
                }, () => {
                    this.setState({
                        showLoading: false
                    });
                    //console.log(this.state.base64);
                    this.splitBase64(this.state.base64);
                });
            });
        });
    }

    readFileDataAsBase64(f) {
        const file = f;

        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event) => {
                resolve(event.target.result);
            };

            reader.onerror = (err) => {
                reject(err);
            };

            reader.readAsDataURL(file);
        });
    }

    render() {


        return (
            <>
                <div className="App">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                        <Row style={{height: '100%'}}>
                            <Col id="leftBar" sm={3}>
                                <Nav id="sidebar" variant="" className="flex-column">
                                    <div id="brandBar">
                                        <FontAwesomeIcon icon={faPuzzlePiece}/>
                                        <span>
                                            C64
                                        </span>
                                    </div>

                                    <Nav.Item>
                                        <Nav.Link eventKey="first">
                                            <FontAwesomeIcon className="menuIcon" icon={faHammer}/>
                                            <span>Mint NFT</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link eventKey="second">
                                            <FontAwesomeIcon className="menuIcon" icon={faUnsplash}/>
                                            <span>Gallery</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item id="aboutMenu">
                                        <Nav.Link eventKey="third">
                                            <FontAwesomeIcon className="menuIcon"  icon={faInfoCircle}/>
                                            <span>About</span>
                                        </Nav.Link>
                                    </Nav.Item>
                                </Nav>
                            </Col>
                            <Col id="contentRigth" sm={9}>
                                <Tab.Content>
                                    <Tab.Pane eventKey="first">
                                        <div id="mintTokenTab">
                                            <h3>Upload Asset</h3>
                                            <input type="file" onChange={ this.handleChange}/>


                                            {this.state.file ? (
                                                <div>
                                                    <Row id="fileUpdatedInfo">
                                                        <Col sm={5}>
                                                            <h5>Tmp file: </h5>
                                                            <pre>{this.state.file}</pre>
                                                            <h5>Base64</h5>
                                                            <pre>{this.state.base64}</pre>
                                                            <h5>Size</h5>
                                                            <p>{this.state.base64Size} bytes</p>
                                                            <p>{this.state.base64Size/1024} kb</p>



                                                            <p>Joined base64</p>
                                                            {this.state.joinedBase64 ? (
                                                                <div className={""}>
                                                                    <Image src={this.state.joinedBase64} fluid />
                                                                </div>
                                                            ) : null}


                                                            <Button variant="secondary" size="lg" block onClick={() => this.handleAsset()}>
                                                                Mint NFT
                                                            </Button>
                                                            <p>Estimated cost: _₳</p>
                                                        </Col>
                                                        <Col sm={7}>
                                                            <div id="imagePreview">
                                                                <Image src={this.state.file} fluid />
                                                            </div>
                                                        </Col>


                                                    </Row>
                                                </div>
                                            ) : null}

                                        </div>

                                    </Tab.Pane>
                                    <Tab.Pane eventKey="second">
                                        Hola2
                                    </Tab.Pane>
                                    <Tab.Pane eventKey="third">
                                        Hola3
                                    </Tab.Pane>
                                </Tab.Content>
                            </Col>
                        </Row>
                    </Tab.Container>
                </div>
            </>
        );
    }
}

export default Minter;
