import {Button, Input, Switch} from "antd";
import * as FaIcons from "react-icons/fa";
import {Form} from "react-bootstrap";
import React from "react";


class GalleryHeader2 extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text:''
        }
        this.passingProps = this.passingProps.bind(this);
    }
    passingProps(value){
        let newInput=value;
        console.log(value);
        //alert(newInput);

        this.setState({ text: newInput }, () => {
            this.props.getEndpoint(this.state.text);
            console.log("value: "+ this.state.text);
        })
    }

    render(){
        return(
            <div className="header">

                <Input
                    style={{ marginLeft: 15, minWidth: 50, maxWidth: 50 }}
                    placeholder="721"
                    onChange={null}
                />

                <Input
                    style={{ marginLeft: 15, minWidth: 130, maxWidth: 300 }}
                    suffix={<FaIcons.FaSearch className="sidebarIcons" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                    placeholder="input search policy"
                    onChange={null}
                />

                <span style={{ marginLeft: 15 }}>Individual height</span>
                <Switch style={{ marginLeft: 15 }} defaultChecked onChange={null} />
                <Button type="primary" onClick={null} style={{ margin: '5px' }}>
                    Shuffle
                </Button>
                <div id="selectEndpointGallery"
                     style={{ maxWidth: '250px' }}>
                    <Form.Label className="selectEndpointLabel">Select endpoint</Form.Label>
                    <Form.Control as="select" className="selectEndpointInput" onChange={ e => this.passingProps(e.target.value)}>
                        <option  value="PEACE">Dandelion APIs [PEACE]</option>
                        <option  value="BOOST">Ada Booster SP [BOOST]</option>
                        <option  value="LIFT">Lift SP [LIFT]</option>
                    </Form.Control>
                </div>


            </div>

        )
    }
}


export default GalleryHeader2;
