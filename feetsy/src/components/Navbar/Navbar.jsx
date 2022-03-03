import React, {Component} from 'react';
import '../../App.css';
import { Layout, Row, Col, Menu, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';




class Navbar extends Component
{
    render()
    {
        return (
            <>
                <Row>
                    <Col span={6}>col</Col>
                    <Col span={12}>col</Col>
                    <Col span={6}>col</Col>
                </Row>
            </>
                  
            
        )
    }

}

export default Navbar;
