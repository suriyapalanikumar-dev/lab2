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
import { authenticateUser, login, logout, dollarSelect,itemSelect } from '../../features/userSlice';

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
  const [itemdetails, setItemDetails] = useState(null)
  const [money, setMoney] = useState("USD")
  const dispatch = useDispatch();
  const loguser = useSelector(authenticateUser)
  
  // useEffect = (() =>{
  //   getItemDetails({"category":categorySelected});
  // })
  const handleChange = (value) =>{
    if(!loguser)
    {
      alert("Please login before changing Currency")
    }
    else{
      let data = {
        "username" : loguser.username,
        "userid" : loguser.userid,
        "token":loguser.token,
        "isLoggedIn":loguser.isLoggedIn,
        "dollar":value
      }
      setMoney(value)
      dispatch(dollarSelect(
        data
      ))
    }

    //setMoney(value)
  }
  const getItemDetails = (data) => {
    
    axios.post(process.env.REACT_APP_SERVER + "/fetchItems", data)
      .then(response => {
        var temp = response.data
        setCard1name(temp["data"][0]["itemname"])
        setCard1price(temp["data"][0]["price"])
        setCard1Image(process.env.REACT_APP_SERVER + "/image/" + temp["data"][0]["itemphoto"])
        setCard1Id(temp["data"][0]["itemid"])
        //console.log(temp["data"])
        setItemDetails(temp["data"])

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
    let d= ""
    if(!loguser.dollar)
    {
      d = "USD"
    }
    else{
      d = loguser.dollar
    }

    let data = {
      "username" : loguser.username,
      "userid" : loguser.userid,
      "token":loguser.token,
      "isLoggedIn":loguser.isLoggedIn,
      "dollar":d
    }
    data["itemid"] = cardid
    // dispatch(
    //   itemSelect(data)
    // )
    for (var i=0;i<itemdetails.length;i++)
    {
      if(itemdetails[i]["itemid"]==cardid)
      {
        data["itemname"] = itemdetails[i]["itemname"]
        data["price"] = itemdetails[i]["price"]
        data["shopname"] = itemdetails[i]["shopname"]
        data["itemphoto"] = process.env.REACT_APP_SERVER+"/image/"+itemdetails[i]["itemphoto"]
        data["itemcount"] = itemdetails[i]["itemcount"]
        data["itemdesc"]= itemdetails[i]["itemdesc"]
      }
          dispatch(
        itemSelect(data)
      )
    }
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
        <div style={{ marginTop: "2%", width: "100%", height: "50%", float: "left", paddingLeft:"2px" }}>
          <h2><b>{categorySelected} Collection Preview</b></h2>
          <Row>
            <Col span={6} style={{paddingLeft:"2%"}}>
              <Card
                hoverable
                style={{ width: "75%", height: "50%" }}
                cover={<img alt="example" src={card1Image} onClick={(e) => navigateOverview(card1id)}/>}
                
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
                <p><b><span>{money}</span><span>{card1price}</span></b></p>
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
        <Option value="USD">USD</Option>
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