import React from 'react'
import { Button, Input, Dropdown, Menu, Switch } from 'antd'
import * as FaIcons from "react-icons/fa"
import {Form} from "react-bootstrap";
export default function({
                            shuffle,
                            search,
                            metatx,
                            setColumns,
                            setMargin,
                            setHeight,
                            columns,
                            margin
                        }) {
    return (
        <div className="header">
            <Input
                style={{ marginLeft: 15, minWidth: 50, maxWidth: 50 }}
                placeholder="721"
                onChange={metatx}
            />

            <Input
                style={{ marginLeft: 15, minWidth: 130, maxWidth: 300 }}
                suffix={<FaIcons.FaSearch className="sidebarIcons" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                placeholder="input search policy"
                onChange={search}
            />

            <span style={{ marginLeft: 15 }}>Individual height</span>
            <Switch style={{ marginLeft: 15 }} defaultChecked onChange={setHeight} />
            <Button type="primary" onClick={shuffle} style={{ margin: '5px' }}>
                Shuffle
            </Button>
            <div id="selectEndpointGallery"
                style={{ maxWidth: '250px' }}>
                <Form.Label className="selectEndpointLabel">Select endpoint</Form.Label>
                <Form.Control as="select" className="selectEndpointInput">
                    <option>Dandelion APIs [PEACE]</option>
                    <option>Ada Booster SP [BOOST]</option>
                    <option>Lift SP [LIFT]</option>
                </Form.Control>
            </div>
        </div>
    )
}