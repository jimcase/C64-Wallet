import {Input} from "antd";
import {Form} from "react-bootstrap";
import React from "react";

class GalleryHeader extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text:''
        }
        this.passingEndpointProps = this.passingEndpointProps.bind(this);
    }
    passingEndpointProps(value){
        this.setState({ text: value }, () => {
            this.props.getEndpoint(this.state.text);
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
                    placeholder="input search policy"
                    onChange={null}
                />


                <div id="selectEndpointGallery"
                     style={{ maxWidth: '250px' }}>
                    <Form.Control as="select" className="blackText"
                                  onChange={e => this.passingEndpointProps(e.target.value)}>
                        <option value="PEACE">Dandelion APIs [PEACE]</option>
                        <option value="BOOST">Ada Booster SP [BOOST]</option>
                    </Form.Control>
                </div>


            </div>

        )
    }
}


export default GalleryHeader;
