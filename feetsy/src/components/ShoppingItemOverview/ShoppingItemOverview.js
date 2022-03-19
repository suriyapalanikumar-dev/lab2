import React, {Component, useState, useEffect} from 'react';
import {Row, Col, Card, Input, Button, Select, Tooltip} from 'antd';
import 'antd/dist/antd.css';
import axios,{post} from 'axios';
import { Navigate } from 'react-router-dom';
import {
    HeartOutlined,
    HeartFilled,
    EditOutlined
  } from '@ant-design/icons';
  const { Option } = Select;

const {Meta} = Card;



const ShoppingItemOverview = () =>{
    const [itemid, setItemid] = useState(localStorage.getItem("itemid"))
    const [imgsrc, setImgSrc] = useState(null)
    const [itemquantity, setItemQuantity] = useState(0)

    const handleQuantity = (e) =>{
        setItemQuantity(e)
    }

    function handleChange(value) {
        console.log(`selected ${value}`);
      }

    useEffect = ()=>{
       axios.post(process.env.REACT_APP_SERVER+"/fetchitem",{"itemid":itemid})
        .then(response=>{
            let temp = response.data
            setImgSrc(process.env.REACT_APP_SERVER+"/image/"+response.data["data"][0]["itemphoto"])

        })
    }


    return (
    <div>
    <Row>
    <Col span= {12}>
    <img src={imgsrc} alt="example" style={{"width":"100%", "height":"80%"}}/>
    </Col>
    <Col span = {12}>
    <div>
    <h4>Shop Name</h4>
    <h2> Item Name</h2>
    <h4>Sales COunt: 2</h4>
    <p>kdsjhfukrmdbvfjgbvjkfksgvh</p>
    </div>
    </Col>
    </Row>
       
    </div>
    )
}
export default ShoppingItemOverview;