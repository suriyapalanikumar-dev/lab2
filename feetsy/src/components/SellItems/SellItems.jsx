import React, {Component, useState} from 'react';
import {Row, Col, Card, Input, Button} from 'antd';
import 'antd/dist/antd.css';


const SellItems = () =>{
    return (
        <div style={{marginTop:"10%"}}>
        <Row>
            <Col span={3}></Col>
            <Col span={18}>
                <Card style={{borderColor:'black'}}>
                    <h1 style={{fontFamily:"sans-serif",color:"#fc835b"}}><b>Name Your Shop</b></h1>
                    <h4><b>Choose a memorable name that reflects your style</b></h4>
                    <Input.Group compact>
                    <Input size="large" style={{ width: 'calc(100% - 200px)' }} placeholder='Type your shop name here' />
                    <Button size="large">Check Availability</Button>
                  </Input.Group>
                  <br>
                  </br>
                  <p align="center">1)Name should have 5-15 characters</p>
                  <p align="center">2)Name should not have Special Characters</p>
                </Card>
            </Col>

        </Row>

        </div>
    )
}

export default SellItems;