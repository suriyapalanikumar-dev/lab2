import React, {Component, useState} from 'react';
import '../../App.css';
import { Row, Col,  Input, Button, Modal, Tooltip } from 'antd';
import 'antd/dist/antd.css';
import '../../css/Custom.css';
import Login from '../Login/Login.jsx';
import {
    ShoppingCartOutlined, HeartOutlined, ShopOutlined, LoginOutlined, UserOutlined, RightSquareFilled
  } from '@ant-design/icons';
const { Search } = Input;
const Navbar  = () =>
{
    const [modal2Visible, setModal2Visible] = useState(false)
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const setPanel = () =>{
        setModal2Visible(false)
        setisLoggedIn(true)
    }
    return (
        <div className="navf">
            <Row>
                <Col span={3}>
                    <span className="appname">Etsy</span>
                </Col>
                <Col span={18}>
                    <Search size="large" placeholder="Search for anything" className='searchitem' enterButton />
                </Col>

                <Col span={3}>
                    
                        {!isLoggedIn ?
                            <Row>
                            <Col span={24} style={{padding:"0px"}}>
                            <Tooltip title="Sign In">
                                <Button type="dashed" className="signin" onClick={() => setModal2Visible(true)}>Sign In</Button>
                            </Tooltip>
                            </Col>
                            </Row>
                            :
                            <Row>
                            <Col span={6} style={{padding:"0px"}}>
                            <Tooltip title="Favorite">
                                <Button icon={<HeartOutlined />} size="large" />
                            </Tooltip>
                            </Col>
                            <Col span={6} style={{paddingRight:"0px"}}> 
                            <Tooltip title="Sell Items">
                                <Button icon={<ShopOutlined />} size="large"/>
                            </Tooltip> 
                            </Col>
                            <Col span={6} style={{padding:"0px"}}>
                            <Tooltip title="Cart">
                                <Button icon={<ShoppingCartOutlined />} size="large" />
                            </Tooltip>
                            </Col>
                            <Col span={6} style={{padding:"0px"}}>
                            <Tooltip title="LoggedIn Details">
                                <Button icon={<UserOutlined />} size="large" />
                            </Tooltip>
                            </Col>
                        </Row>
                        }
                </Col>
            </Row>
            <Modal
                visible={modal2Visible}
                onOk={() => setPanel()}
                onCancel={() => setPanel()}
                >
                    <Login/>
            </Modal>
        </div>            
    )

}

export default Navbar;
