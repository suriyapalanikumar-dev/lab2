import React, {Component, useState} from 'react';
import {Row, Col, Card, Input, Button} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';

const ShopDetails = () =>{
    return (
        <div>
        <h1>{localStorage.getItem("shopname")}</h1>
        </div>
    )
}

export default ShopDetails;

