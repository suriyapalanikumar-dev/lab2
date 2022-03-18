import React, {Component, useState} from 'react';
import {Row, Col, Card, Input, Button, Modal} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import {
    ShopOutlined
  } from '@ant-design/icons';
import ShopProfilePicture from './ShopProfilePicture';

const ShopDetails = () =>{
    const [modal3Visible, setmodal3Visible] = useState(false)

    const handleUpload = () =>{
        setmodal3Visible(false)
        
    }

    return (
        <div style={{margin:"1%"}}>
        <Row>
            <Col span = {3}>
            <div style={{marginLeft:"20%", marginRight:"40%", backgroundColor:"grey"}}>
            <ShopOutlined style={{fontSize:"500%"}}/>
            </div>
            <div style={{paddingTop:"2%"}}>
            </div>
            <Button type="primary" onClick={(e) =>setmodal3Visible(true)}> Change Shop Image </Button>
            </Col>
            <Col span={9}>
            </Col>
            <Col span={6}>
            </Col>
            <Col span={6}>
            </Col>
        </Row>
        <Modal
        visible={modal3Visible}
        onOk = {handleUpload}
        onCancel = {handleUpload}
        footer={null}
        >
            <ShopProfilePicture/>
        </Modal>
        </div>
    )
}

export default ShopDetails;

