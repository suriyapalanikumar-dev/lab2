import React, {Component, useState, useEffect} from 'react';
import {Row, Col, Card, Input, Button, Select} from 'antd';
import 'antd/dist/antd.css';
import axios,{post} from 'axios';
import { Navigate } from 'react-router-dom';
import art from '../../images/art.jpg';
import homedecor from '../../images/homedecor.jpg';
import clothing from '../../images/clothing.jpg';
import entertainment from '../../images/entertainment.jpg';
import jewellery from '../../images/jewellery.jpg';
import {
    HeartOutlined
  } from '@ant-design/icons';

const {Meta} = Card;


const Dashboard = () =>{
    const [categorySelected, setcategory] = useState("Art")
    const [card1name, setCard1name] = useState("")
    const [card1price, setCard1price] = useState("")
    const [card1Image, setCard1Image] = useState(null)



    const getItemDetails = (data) =>{
        axios.post(process.env.REACT_APP_SERVER+"/fetchItems",data)
        .then(response=>{
           var temp = response.data
           setCard1name(temp["data"][0]["itemname"])
           setCard1price(temp["data"][0]["price"])
           setCard1Image(process.env.REACT_APP_SERVER+"/image/"+temp["data"][0]["itemphoto"])
           //console.log(temp["data"][0]["itemname"])
        })
        .catch(function (err){
            alert(err)
            console.log(err)})
    }

    const retrieveImages = (e) =>{
        let data = {}
        if(String(e.target.src).includes("art"))
        {
            data["category"] = "Art"
        }
        getItemDetails(data)
        
    }

    // useEffect = () =>{
    //     getItemDetails({"category":categorySelected})
    // }

    return (
    <div style={{paddingTop:"5%", paddingLeft:"2%", paddingRight:"2%",paddingBotton:"2%", width:"100%", height:"100%"}}>
       <div style={{width: "100%", height:"50%", float: "left", background: "#ffdbaa"}}> 
            <h2><b>Select the Category to get preview</b></h2>
            <Row style={{paddingLeft:"2%"}}>
            <Col span={2}></Col>
            <Col span={4}>
                <Card
                hoverable
                style={{ width: "75%", height:"50%" }}
                cover={<img alt="example" src={art}  />}
                onClick = {(e)=>retrieveImages(e)}
                >
                <Meta title="Art" />
                </Card>
            </Col>
            <Col span={4}>
            <Card
            hoverable
            style={{ width: "75%", height:"50%" }}
            cover={<img alt="example" src={clothing} />}
            onClick = {(e)=>retrieveImages(e)}
            >
            <Meta title="Clothing" />
            </Card>
        </Col>
        <Col span={4}>
        <Card
        hoverable
        style={{ width: "75%", height:"50%" }}
        cover={<img alt="example" src={jewellery} />}
        onClick = {(e)=>retrieveImages(e)}
        >
        <Meta title="Jewellery" />
        </Card>
    </Col>
    <Col span={4}>
    <Card
    hoverable
    style={{ width: "75%", height:"50%", borderRadius: "20px", overflow:"hidden" }}
    cover={<img alt="example" src={entertainment} />}
    onClick = {(e)=>retrieveImages(e)}
    actions={[
        <h4 style={{ paddingTop: "6px" }} key="Name">
          Entertainment{""}
        </h4>
      ]}
    >
    </Card>
    </Col>
    <Col span={4}>
    <Card
    hoverable
    style={{ width: "75%", height:"50%" }}
    cover={<img alt="example" src={homedecor} />}
    >
    <Meta title="Home Decor" />
    </Card>
    </Col>
    <Col span={2}></Col>
    </Row>
    </div>
    <div style={{marginTop:"2%",width: "100%", height:"50%", float: "left"}}>
    <h2><b>{categorySelected} Collection Preview</b></h2>
    <Row>
    <Col span={6}>
    <Card
    hoverable
    style={{ width: "75%", height:"50%" }}
    cover={<img alt="example" src={card1Image} />}
    >
    <div>
    <Row>
      <Col span={21}>
        {card1name}
      </Col>
      <Col span={3}>
      <HeartOutlined />
      </Col>
    </Row>
    </div>
    <p><b><span>$</span><span>{card1price}</span></b></p>
    </Card>
    </Col>
    <Col span={6}>
    <Card
    hoverable
    style={{ width: "75%", height:"50%" }}
    cover={<img alt="example" src={homedecor} />}
    >
    <Meta title="Home Decor" />
    </Card>
    </Col>
    <Col span={6}>
    <Card
    hoverable
    style={{ width: "75%", height:"50%" }}
    cover={<img alt="example" src={homedecor} />}
    >
    <Meta title="Home Decor" />
    </Card>
    </Col>
    <Col span={6}>
    <Card
    hoverable
    style={{ width: "75%", height:"50%" }}
    cover={<img alt="example" src={homedecor} />}
    >
    <Meta title="Home Decor" />
    </Card>
    </Col>
    </Row>
    </div>
    </div>
    )
}
export default Dashboard;