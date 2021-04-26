import React from "react";

import {Button, Col, Container, Image as Img, Nav, Row, Tab} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link} from 'react-router-dom';


import "../assets/scss/layout.scss";
import "../assets/css/layout.css";

import * as FaIcons from "react-icons/fa"

import {faHammer, faInfoCircle, faPuzzlePiece} from "@fortawesome/free-solid-svg-icons";
import {faUnsplash} from "@fortawesome/free-brands-svg-icons";

import {api} from "../api";

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
            leftOpen: true
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
        let numChunks = 1;
        for(let i=0; i<base64Array.length; i++){
            base64 = base64.concat(base64Array[i]);
            //console.log(i+" Lengh: "+base64Array[i].length);
            //console.log(i+": "+base64Array[i]);
            numChunks++;
        }
        //console.log("base64Array: "+base64Array.length);
        this.setState({
            joinedBase64: base64,
            numChunks: numChunks
        }, () => {
        });
    }


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
        if (base64.substr(o, base64Length-o).length > 0) {
            chunckArray.push(base64.substr(o, base64Length - o));
        }

        this.setState({
            fileChunks: chunckArray
        }, () => {

            console.log(this.state.fileChunks);
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

            //this.splitAndShowImage();
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

    splitAndShowImage(){

        let canvas = this.myCanvasRef.current;
        let base_image = new window.Image();
        base_image.src = this.state.file;

        base_image.onload = () => {
            const scaleX = base_image.naturalWidth / base_image.width;
            const scaleY = base_image.naturalHeight / base_image.height;



            console.log(base_image.naturalWidth, base_image.naturalHeight)
            console.log(base_image.width, base_image.height)
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
            console.log("base_image.src: "+base_image.src);
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


                    <div id='layout'>

                        <div id='left' className={leftOpen} >
                            <div className='icon'
                                 onClick={this.toggleSidebar} >
                                &equiv;
                            </div>
                            <div className={`sidebar ${leftOpen}`} >
                                <div className='header'>
                                    <h3 id='sidebarTitle'>
                                        C64
                                    </h3>
                                </div>
                                <div id="leftMenu" className=''>
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
                                        <FaIcons.FaInfo className="sidebarIcons"/>
                                        About
                                    </div>

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
                                                                <h5>Tmp file: </h5>
                                                                <pre>{this.state.file}</pre>
                                                                <h5>Base64</h5>
                                                                <p>Joined base64</p>
                                                                <pre>{this.state.base64}</pre>
                                                                <h5>Size</h5>
                                                                <p>{this.state.base64Size} bytes</p>
                                                                <p>{this.state.base64Size/1024} kb</p>


                                                                <p>Num chunks: {this.state.fileChunks.length}</p>
                                                            </Col>
                                                            <Col sm={6}>
                                                                <Img className={"imgPreview"} src={this.state.joinedBase64} fluid />
                                                            </Col>
                                                        </Row>


                                                    </div>
                                                ) : null}


                                                <p>Estimated cost: _₳</p>
                                                <Button variant="secondary" size="lg" block onClick={() => this.handleAsset()}>
                                                    Mint NFT
                                                </Button>

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
