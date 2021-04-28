import React from "react";

import {Col, Container, Form, Row} from 'react-bootstrap';
import Magnifier from 'react-magnifier';

import "../assets/scss/layout.scss";


import * as FaIcons from "react-icons/fa";
import mime from 'mime-types';

import {api} from "../api";
import MintCart from "../components/MintCart";
import axios from "axios";

// core components

class Minter extends React.Component {

    constructor(props) {
        super(props);

        this.MAX_SIZE = 14336; //14kb

        this.state = {
            file: '',
            fileSource: '',
            base64: '',
            base64Size: 0,
            showLoading: false,
            fileChunks: [],
            numChunks: 0,
            joinedBase64: '',
            leftOpen: true,
            network: 'testnet',
            metadataTxsPreview: []
        };
        // this.myCanvasRef = React.createRef();
        // <canvas id="viewport" ref={(c) => this.setRefCanvas(c)}/>

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
        let numChunks = 1;
        for(let i=0; i<base64Array.length; i++){
            base64 = base64.concat(base64Array[i]);
            numChunks++;
        }
        this.setState({
            joinedBase64: base64,
            numChunks: numChunks
        }, () => {
        });
    }


    splitBase64(base64) {

        this.setState({
            showLoading: true
        });

        // Get num iterations, probably float
        let nChunks = this.state.base64Size / this.MAX_SIZE;
        // console.log("original nChunks: "+nChunks);
        // Get the float part
        let rest = nChunks % 1;

        // Check if there is float part
        let auxIteration = 0;
        if (rest && this.state.base64Size >= this.MAX_SIZE) {
            nChunks = ~~nChunks;
            nChunks = nChunks + 1;
            auxIteration = 1;
        }
        // console.log("base64Size: "+this.state.base64Size);
        // console.log("MAX_SIZE: "+this.MAX_SIZE);
        // console.log("nChunks: "+nChunks);
        // console.log("rest: "+rest);
        let base64Length = base64.length;
        // console.log("base64Length: "+base64Length);

        let chunckArray = [];
        let i, o;
        for (i = 0, o = 0; i < nChunks + auxIteration; ++i, o += this.MAX_SIZE) {
            chunckArray.push(base64.substr(o, this.MAX_SIZE));
            //console.log(i+" chunk & csize "+o+": "+base64.substr(o, this.MAX_SIZE));
        }
        // One more iteration
        if (base64.substr(o, base64Length-o).length > 0) {
            chunckArray.push(base64.substr(o, base64Length - o));
        }

        this.setState({
            fileChunks: chunckArray
        }, () => {

            //console.log(this.state.fileChunks);
            this.joinBase64(this.state.fileChunks);

            this.buildHTTPMetadatasFromFile(0);
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
                    base64Size: (r.length * (3/4)) - 2,

                }, () => {
                    this.setState({
                        showLoading: false
                    });
                    this.splitBase64(this.state.base64);
                });
            });
        });
    }


    getGraphqlUrl() {
        return `https://graphql-api.${this.state.network}.dandelion.link/`
    }


    buildHTTPMetadatasFromFile(customHeaders) {

        //         const uri = "metadata+cardano://2065e342de1748dd69788f71e7816b61b0e93da942a87a5a334d6a9a3defdc2a?network=testnet&key=104116116112&type=http-response"
        const HTTP_RESPONSE_METADATUM = 104116116112;

        let metadataObj = {};
        let headers = {};

        if (customHeaders) {
            headers = customHeaders;
        }

        if (!headers['Content-Type']) {
            headers['Content-Type'] = mime.lookup(this.state.file);
        }

        headers['Content-Transfer-Encoding'] = "base64"

        // split data in diff txs
        let _nextTx = "_PLACEHOLDER_";
        let bas64Chunks = this.state.fileChunks;
        //console.log("bas64Chunks");
        //console.log(bas64Chunks);

        let metadataTxs = []
        for (let i = 0; i < bas64Chunks.length; i++) {
            metadataObj = {}
            metadataObj[HTTP_RESPONSE_METADATUM] = {
                _nextTx: _nextTx, // TODO get next tx hash, bas64Chunks.length-1 times
                headers: headers,
                response:
                    {
                        data: bas64Chunks[i]
                    }
            }
            //console.log(i);
            //console.log(bas64Chunks[i]);
            metadataTxs.push(metadataObj);
        }

        this.setState({
            metadataTxsPreview: metadataTxs,

        }, () => {

        });

    }

    getAndJoinMetadatasFromTxId(txId, metadataKey, grapqhlEndpoint) {

        // var to store joined data from txs
        let fullData = [];

        // 1. Build query for first tx
        let graphqlQuery = "{ transactions( where: { hash: { _eq: " + txId + " }, metadata: { key: { _eq: " + metadataKey + " } } } ) { metadata { value } } }";

        let completeResponse = {}

        // 2. Graphql POST request
        axios.post(grapqhlEndpoint, {query: graphqlQuery}).then(r => {

            // 3. Get metadata from 1est tx
            let actualData = r.data.data.transactions[0].metadata[0].value.response.data;

            // 4. Check if just one tx
            if (!actualData._nextTx) {
                fullData = fullData.concat(actualData);
            } else {
                // 5. Add first tx
                fullData = fullData.concat(actualData);

                // 6. Process next txs
                while (actualData._nextTx) {
                    graphqlQuery = "{ transactions( where: { hash: { _eq: " + r.data.data.transactions[0].metadata[0].value._nextTx + " }, metadata: { key: { _eq: " + metadataKey + " } } } ) { metadata { value } } }"

                    axios.post(grapqhlEndpoint, {query: graphqlQuery}).then(r => {
                        actualData = r.data.data.transactions[0].metadata[0].value.response.data;
                        // 7. Join tx
                        fullData = fullData.concat(actualData);
                    })
                }

                completeResponse = r.data.data.transactions[0].metadata[0].value;
                // 8. Store all joined txs in the same http response
                completeResponse.response.data = fullData;
            }
        });

        return completeResponse;
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

    splitAndShowImage(){

        let canvas = this.myCanvasRef.current;
        let base_image = new window.Image();
        base_image.src = this.state.file;

        base_image.onload = () => {
            const scaleX = base_image.naturalWidth / base_image.width;
            const scaleY = base_image.naturalHeight / base_image.height;


            //console.log(base_image.naturalWidth, base_image.naturalHeight)
            //onsole.log(base_image.width, base_image.height)
            //this.canvasContext.drawImage(base_image,0, 0,500,50,0,0,100,50);
            /*
                The image object (as returned by document.getElementById() )
                The X coordinate of the area to select
                The Y coordinate of the area to select
                The width of the area to select
                The height of the area to select
                The X coordinate to draw the image at
                The Y coordinate to draw the image at
                The width to draw the image
                The height to draw the image
            */
            this.canvasContext.drawImage(base_image,0, 0,485,50,0,0,485,50);
            //console.log("base_image.src: "+base_image.src);
        };

    }

    setRefCanvas(c){
        if (c){
            this.canvasContext = c.getContext('2d');
        }
    }

    render() {

        let leftOpen = this.state.leftOpen ? 'open' : 'closed';

        return (
            <>
                <div className="App">


                    <div id='layout' className="whiteText">

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

                        <div id='main'>
                            <div className='header'>
                                <h3 className={`
                      title  multiColorTitle
                      ${'left-' + leftOpen}
                     
                  `}>
                                    C64 Minter
                                </h3>
                            </div>
                            <div className='content'>
                                <Container>
                                <h3>Upload Asset</h3>
                                <input type="file" accept=".jpg,.jpeg,.png,.gif,.svg" onChange={ this.handleChange}/>

                                {this.state.file ? (
                                    <div>
                                        <Row id="fileUpdatedInfo">
                                            <Col sm={12}>

                                                {this.state.joinedBase64 ? (
                                                    <div id="imgPreviewContainer">
                                                        <Row>
                                                            <Col sm={6}>
                                                                <h5>Base64</h5>
                                                                <pre
                                                                    id="base64ContentMeta">{this.state.base64}
                                                                </pre>
                                                                <p id="base64SizeSpan">Size <span>{this.state.base64Size} bytes</span>
                                                                    <span>{this.state.base64Size / 1024} kb</span></p>


                                                                <p>Total: {this.state.fileChunks.length} Txs</p>

                                                                {this.state.metadataTxsPreview
                                                                && this.state.metadataTxsPreview.length > 0 ? (

                                                                    <div id="metadataTxsPreview">

                                                                        {this.state.metadataTxsPreview.map(((meta, index) => (

                                                                            <div className="metadatasJson">
                                                                                <pre
                                                                                    className="jsonContentMeta"><p>{index + 1}/{this.state.fileChunks.length}
                                                                                    <span> {JSON.stringify(meta).length} bytes</span></p>{(JSON.stringify(meta, null, 2))}
                                                                                </pre>
                                                                            </div>
                                                                        )))}


                                                                    </div>
                                                                ) : null}

                                                                <div id="signSection">
                                                                    <h3>PGP Sign</h3>
                                                                    <Form.Label id="identitySelector"
                                                                                className="whiteText">
                                                                        Select identity</Form.Label>
                                                                    <Form.Control as="select">
                                                                        <option>Not signed</option>
                                                                        <option>artist@nftify.io</option>
                                                                        <option>personal@gmail.com</option>
                                                                        <option>Atala Prism</option>
                                                                    </Form.Control>
                                                                </div>
                                                            </Col>
                                                            <Col sm={6}>

                                                                <Magnifier id="imgToMint"
                                                                           src={this.state.joinedBase64}/>
                                                            </Col>
                                                        </Row>


                                                    </div>
                                                ) : null}


                                                <Row>
                                                    <Col>
                                                        <MintCart image={this.state.joinedBase64}
                                                                  chunks={this.state.fileChunks}
                                                                  nChunks={this.state.numChunks - 1}/>
                                                    </Col>

                                                </Row>


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
