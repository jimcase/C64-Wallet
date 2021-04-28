import React from "react";
import {Col, Row} from "react-bootstrap";
import "../assets/css/gallery.css"
import lodash from 'lodash'
import data from './../data/data-gallery'
import endpoints from './../data/endpoints/endpoints'

import {Fade, Grid, Slug} from 'mauerwerk'
import * as FaIcons from "react-icons/fa";
import {extendMoment} from 'moment-range';
import Moment from 'moment';
import GalleryHeader from "./GalleryHeader";
import Magnifier from "react-magnifier";
// core components
const moment = extendMoment(Moment);

const NFT = ({ toggle, name, height, description, css, maximized }) => (
    <div
        className="cell"
        style={{ backgroundImage: css, cursor: !maximized ? 'pointer' : 'auto' }}
        onClick={!maximized ? toggle : undefined}>
        <Fade show={maximized} delay={maximized ? 400 : 0}>
            <div className="details">
                <Slug delay={600}>
                    <div className="nftView" style={{background: css}}>
                        <Row>
                            <Col sm={9}>
                                <Magnifier
                                    src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"/>
                            </Col>
                            <Col sm={3}>
                                <div style={{color: 'black'}}>
                                    <div>Dimensions: 1500x700</div>
                                    <div>Size: 64863 bytes</div>
                                </div>
                            </Col>
                        </Row>


                    </div>
                    <div className="close">
                        <span style={{cursor: 'pointer'}} onClick={toggle}>X</span>
                    </div>
                    <h1>{name}</h1>
                    <p>{description}</p>
                </Slug>
            </div>
        </Fade>
        <Fade
            show={!maximized}
            from={{opacity: 0, transform: 'translate3d(0,140px,0)'}}
            enter={{opacity: 1, transform: 'translate3d(0,0px,0)'}}
            leave={{opacity: 0, transform: 'translate3d(0,-50px,0)'}}
            delay={maximized ? 0 : 400}>


            <Row className="imageShadow imgPreview">
                <img

                    src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"
                    alt="new"
                />
            </Row>
            <Row className="nftInfoPreview">
                <div className="default">policy: {name}</div>
            </Row>


        </Fade>
    </div>
)


class Gallery extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            leftOpen: true,
            data, columns: 3,
            margin: 70,
            filter: '',
            metatx: '721',
            height: true,

            selectedEndPoint: endpoints[0],
            epoch:[],

            metadataRequest: {
                metadataKey: "",
                metadataStartDate: moment().utc().subtract(1, 'day').format('DD-MM-YY'),
                metadataEndDate: moment().utc().format('DD-MM-YY'),
                metadataObjects: []
            },
            metadataResponse: [],   // from limit request
            metadataObjects: []
        };

        this.handleSelectedEndpoint = this.handleSelectedEndpoint.bind(this);

    }

    metatx = e => this.setState({ filter: e.target.value });
    search = e => this.setState({ filter: e.target.value });
    shuffle = () => this.setState(state => ({ data: lodash.shuffle(state.data) }));
    setColumns = e => this.setState({ columns: parseInt(e.key) });
    setMargin = e => this.setState({ margin: parseInt(e.key) });
    setHeight = e => this.setState({ height: e });

    async componentDidMount() {
    }

    componentWillUnmount() {
    }

    toggleSidebar = (event) => {
        let key = `${event.currentTarget.parentNode.id}Open`;
        this.setState({ [key]: !this.state[key] });
    }

    // From dbooster.io/calendar
    async getEpoch(epochN) {

        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };

        await fetch('https://'+this.state.selectedEndPoint.testnet+'/epoch?no=eq.' + epochN, requestOptions)
            .then(response => response.text())
            .then(epoch =>
                this.setState({
                    currentEpoch: JSON.parse(epoch)[0]
                }, () => {
                })
            )
    }

    // From dbooster.io/calendar
    async getLastEpoch(epochN) {

        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };

        await fetch('https://'+this.state.selectedEndPoint.testnet+'/epoch&limit=1', requestOptions)
            .then(response => response.text())
            .then(epoch =>
                this.setState({
                    currentEpoch: JSON.parse(epoch)
                }, () => {
                })
            )
    }

    // From dbooster.io/calendar
    async getAllEpochs() {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('https://'+this.state.selectedEndPoint.testnet+'/epoch', requestOptions)
            .then(response => response.text())
            .then(data => {
                this.setState({epochs: JSON.parse(data)});
            }).then(e => null);
    }

    async getMetadataByLimit(key,limit) {
        const requestOptions = {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        };
        fetch('https://'+this.state.selectedEndPoint.testnet+'/tx_metadata?key=eq.'+key+'&limit='+limit, requestOptions)
            .then(response => response.text())
            .then(data => {
                this.setState({metadataResponse: JSON.parse(data)});
            }).then(e => null);
    }

    async getMetadata() {

        if (this.state.metadataKey
            && moment(this.state.metadataRequest.metadataStartDate).isValid()
            && moment(this.state.metadataRequest.metadataEndDate).isValid()
            && moment(this.state.metadataRequest.metadataStartDate).isBefore(moment(this.state.metadataRequest.metadataEndDate))
        ) {

            let key = this.state.metadataRequest.metadataKey;
            let start_time = moment(this.state.metadataRequest.metadataStartDate, 'DD-MM-YY').format('YYYY-MM-DD') + ''; // TODO ?? should be: .format('YYYY-MM-DD'
            let end_time = moment(this.state.metadataRequest.metadataEndDate, 'DD-MM-YY').format('YYYY-MM-DD');

            const requestOptions2 = {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"key": key, "start_time": start_time, "end_time": end_time})
            }

            fetch('https://api.dbooster.io/cardano/metadata', requestOptions2)
                .then(response => response.text())
                .then(data => {

                    let metaFiltered = JSON.parse(data).filter(meta => Date.parse(meta.block_time) > (Date.parse(start_time)));

                    this.setState({
                        metadataObjects: metaFiltered
                    }, () => {

                    })
                })
                .catch(error => {
                    console.log("error: " + error);
                });
        }
    }

    handleSelectedEndpoint(ticker){
        let endp = endpoints.filter(e => e.ticker === ticker);

        this.setState({
            selectedEndPoint: endp[0]
        }, () => {
            alert(this.state.selectedEndPoint.mainnet);
        });
    }

    render() {
        const data = this.state.data.filter(
            d => d.name.toLowerCase().indexOf(this.state.filter) !== -1
        )

        let leftOpen = this.state.leftOpen ? 'open' : 'closed';

        return (
            <>
                <div className="gallery">

                    <div id='layout'>

                        <div id='left' className={leftOpen} >
                            <div className='icon'
                                 onClick={this.toggleSidebar} >
                                &equiv;
                            </div>
                            <div className={`sidebar ${leftOpen}`} >
                                <div className='header'>

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
                                    C64 Minter
                                </h3>
                            </div>
                            <div className='content'>
                                <div className="main">
                                    <GalleryHeader
                                        {...this.state}
                                        metatx={this.metatx}
                                        search={this.search}
                                        shuffle={this.shuffle}
                                        setColumns={this.setColumns}
                                        setMargin={this.setMargin}
                                        setHeight={this.setHeight}

                                        getEndpoint={this.handleSelectedEndpoint}
                                    />
                                    <Grid
                                        className="grid"
                                        // Arbitrary data, should contain keys, possibly heights, etc.
                                        data={data}
                                        // Key accessor, instructs grid on how to fet individual keys from the data set
                                        keys={d => d.name}
                                        // Can be a fixed value or an individual data accessor
                                        heights={this.state.height ? d => d.height : 200}
                                        // Number of columns
                                        columns={this.state.columns}
                                        // Space between elements
                                        margin={this.state.margin}
                                        // Removes the possibility to scroll away from a maximized element
                                        lockScroll={false}
                                        // Delay when active elements (blown up) are minimized again
                                        closeDelay={400}>
                                        {(data, maximized, toggle) => (
                                            <NFT {...data} maximized={maximized} toggle={toggle} />
                                        )}
                                    </Grid>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </>
        );
    }
}

export default Gallery;
