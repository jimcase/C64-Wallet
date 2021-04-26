import React from "react";

import {Button, Col, Container, Image, Nav, Row, Tab} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from 'react-router-dom';


import "../assets/scss/layout.scss";
import "../assets/css/layout.css";

import {faHammer, faInfoCircle, faPuzzlePiece} from "@fortawesome/free-solid-svg-icons";
import {faUnsplash} from "@fortawesome/free-brands-svg-icons";

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
            joinedBase64: '',
            leftOpen: true
        };

        this.handleChange = this.handleChange.bind(this);
    }

    toggleSidebar = (event) => {
        let key = `${event.currentTarget.parentNode.id}Open`;
        this.setState({ [key]: !this.state[key] });
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

        let leftOpen = this.state.leftOpen ? 'open' : 'closed';

        return (
            <>
                <div className="App">


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
                                <Container>
                                <h3>Main content</h3><br/>
                                <h3>Upload Asset</h3>
                                <input type="file" onChange={ this.handleChange}/>


                                {this.state.file ? (
                                    <div>
                                        <Row id="fileUpdatedInfo">
                                            <Col sm={12}>
                                                <h5>Tmp file: </h5>
                                                <pre>{this.state.file}</pre>
                                                <h5>Base64</h5>
                                                <pre>{this.state.base64}</pre>
                                                <h5>Size</h5>
                                                <p>{this.state.base64Size} bytes</p>
                                                <p>{this.state.base64Size/1024} kb</p>



                                                <p>Joined base64</p>
                                                {this.state.joinedBase64 ? (
                                                    <div id="imgPreviewContainer">
                                                        <Image className={"imgPreview"} src={this.state.joinedBase64} fluid />
                                                    </div>
                                                ) : null}


                                                <Button variant="secondary" size="lg" block onClick={() => this.handleAsset()}>
                                                    Mint NFT
                                                </Button>
                                                <p>Estimated cost: _₳</p>
                                            </Col>


                                        </Row>
                                    </div>
                                ) : null}
                                </Container>
                            </div>
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

export default Minter;
