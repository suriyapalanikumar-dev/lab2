import React, { Component, useState, useEffect } from 'react';
import { Row, Col, Card, Input, Button, Select } from 'antd';
import 'antd/dist/antd.css';
import axios, { post } from 'axios';
import { Navigate } from 'react-router-dom';
import art from '../../images/art.jpg';
import homedecor from '../../images/homedecor.jpg';
import clothing from '../../images/clothing.jpg';
import entertainment from '../../images/entertainment.jpg';
import jewellery from '../../images/jewellery.jpg';
import {
  HeartOutlined,
  HeartFilled
} from '@ant-design/icons';
import Navbar from "../Navbar/Navbar";
import { useDispatch,useSelector } from 'react-redux';
import { register } from '../../features/userSlice';
import { authenticateUser, login, logout, dollarSelect } from '../../features/userSlice';

const { Meta } = Card;
const {Option} = Select;

const Dashboard = () => {
  const [categorySelected, setcategory] = useState("Art")
  const [card1name, setCard1name] = useState("")
  const [card1price, setCard1price] = useState("")
  const [card1Image, setCard1Image] = useState(null)
  const [card1id, setCard1Id] = useState("")
  const [isFavorite, setisFavorite] = useState(false)
  const [isnavigateOverview, setNavigateOverview] = useState(false)
  const dispatch = useDispatch();
  const loguser = useSelector(authenticateUser)
  
  useEffect = (() =>{
    getItemDetails({"category":categorySelected});
  })
  const handleChange = (value) =>{
    console.log(`selected ${value}`);
  }
  const getItemDetails = (data) => {
    
    axios.post(process.env.REACT_APP_SERVER + "/fetchItems", data)
      .then(response => {
        var temp = response.data
        setCard1name(temp["data"][0]["itemname"])
        setCard1price(temp["data"][0]["price"])
        setCard1Image(process.env.REACT_APP_SERVER + "/image/" + temp["data"][0]["itemphoto"])
        setCard1Id(temp["data"][0]["itemid"])

      })
      .catch(function (err) {
        alert(err)
        console.log(err)
      })
  }

  const setFavorite = (data) => {
    axios.post(process.env.REACT_APP_SERVER + "/makefavorite", { "itemid": data, "userid": localStorage.getItem("userid") })
      .then(response => {
        if (response.status == 200) {
          setisFavorite(true)
        }
      })
  }

  const retrieveImages = (e) => {
    let data = {}
    if (String(e.target.src).includes("art")) {
      data["category"] = "Art"
    }
    if (String(e.target.src).includes("cloth")) {
      data["category"] = "Clothing"
    }
    if (String(e.target.src).includes("jewellery")) {
      data["category"] = "Jewellery"
    }
    if (String(e.target.src).includes("entertainment")) {
      data["category"] = "Entertainment"
    }
    if (String(e.target.src).includes("home")) {
      data["category"] = "Home Decor"
    }
    //alert(data["category"])
    getItemDetails(data)

  }

  const navigateOverview = (cardid) => {
    localStorage.setItem("itemid", cardid)
    setNavigateOverview(true)
  }

  if (isnavigateOverview) {
    return <Navigate replace to="/shopoverview" />
  }


  return (
    <div>
    <Navbar/>
      <div style={{  width: "100%", height: "100%" }}>
        <div style={{ width: "100%", height: "50%", float: "left", background: "#ffdbaa" }}>
          <h2><b>Select the Category to get preview</b></h2>
          <Row style={{ paddingLeft: "2%" }}>
            <Col span={2}></Col>
            <Col span={4}>
              <Card
                hoverable
                style={{ width: "75%", height: "50%" , borderColor: "#ffdbaa", background:" #ffdbaa"}}
                cover={<img alt="example" src={art} style={{borderRadius:"100px"}}/>}
                onClick={(e) => retrieveImages(e)}
              >
                <Meta title="Art" />
              </Card>
            </Col>
            <Col span={4}>
              <Card
                hoverable
                style={{ width: "75%", height: "50%" , borderColor: "#ffdbaa", background:" #ffdbaa"}}
                cover={<img alt="example" src={clothing} style={{borderRadius:"100px"}}/>}
                onClick={(e) => retrieveImages(e)}
              >
                <Meta title="Clothing" />
              </Card>
            </Col>
            <Col span={4}>
              <Card
                hoverable
                style={{ width: "75%", height: "50%" , borderColor: "#ffdbaa", background:" #ffdbaa"}}
                cover={<img alt="example" src={jewellery} style={{borderRadius:"100px"}}/>}
                onClick={(e) => retrieveImages(e)}
              >
                <Meta title="Jewellery" />
              </Card>
            </Col>
            <Col span={4}>
              <Card
                hoverable
                style={{ width: "75%", height: "50%" , borderColor: "#ffdbaa", background:" #ffdbaa"}}
                cover={<img alt="example" src={entertainment} style={{borderRadius:"100px"}} />}
                onClick={(e) => retrieveImages(e)}
              >
              <Meta title="Entertainment" />
              </Card>
            </Col>
            <Col span={4}>
              <Card
                hoverable
                style={{ width: "75%", height: "50%", borderColor: "#ffdbaa", background:" #ffdbaa"}}
                cover={<img alt="example" src={homedecor} style={{borderRadius:"100px"}} />}
                onClick={(e) => retrieveImages(e)}
              >
                <Meta title="Home Decor" />
              </Card>
            </Col>
            <Col span={2}></Col>
          </Row>
        </div>
        <div style={{ marginTop: "2%", width: "100%", height: "50%", float: "left" }}>
          <h2><b>{categorySelected} Collection Preview</b></h2>
          <Row>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: "75%", height: "50%" }}
                cover={<img alt="example" src={card1Image} />}
                onClick={(e) => navigateOverview(card1id)}
              >
                <div>
                  <Row>
                    <Col span={21}>
                      <p>
                        <span>{card1name}</span>
                        <span style={{ visibility: "hidden" }}>{card1id}</span>
                      </p>

                    </Col>
                    <Col span={3}>
                      {
                        isFavorite ? <HeartFilled /> : <HeartOutlined onClick={(e) => setFavorite(card1id)} />
                      }
                    </Col>
                  </Row>
                </div>
                <p><b><span>$</span><span>{card1price}</span></b></p>
              </Card>
            </Col>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: "75%", height: "50%" }}
                cover={<img alt="example" src={homedecor} />}
              >
                <Meta title="Home Decor" />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: "75%", height: "50%" }}
                cover={<img alt="example" src={homedecor} />}
              >
                <Meta title="Home Decor" />
              </Card>
            </Col>
            <Col span={6}>
              <Card
                hoverable
                style={{ width: "75%", height: "50%" }}
                cover={<img alt="example" src={homedecor} />}
              >
                <Meta title="Home Decor" />
              </Card>
            </Col>
          </Row>
        </div>
      </div>
      <div style={{
        height: "50px",
        marginTop: "60%",
        backgroundColor:"blue",
    color:"white",
    padding:"0%"}}>
        <Row>
        <Col span={3}>
        <h4 style={{color:"white", padding:"3%"}}><b><span>United States | English(US)</span></b></h4>
        </Col>
        <Col span = {3}>
        <Select defaultValue="USD" style={{ width: 120, padding:"3%" }} onChange={handleChange}>
      <Option value="GBP">GBP</Option>
      <Option value="INR">INR</Option>
    </Select>
        </Col>
        </Row>
    </div>
    </div>

  )
}
export default Dashboard;