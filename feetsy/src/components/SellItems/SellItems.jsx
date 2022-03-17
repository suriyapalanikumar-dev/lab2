import React, {Component, useState} from 'react';
import {Row, Col, Card, Input, Button} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';

function hasSpecialChar(_string)
{
    let spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if(spChars.test(_string)){
      return true;
    } else {
      return false;
    }
}

const SellItems = () =>{
    const [shopName, setShopName] = useState("")
    const [successVisibility, setSuccessVisibility] = useState("hidden")
    const [colorVisibility, setColorVisibility] = useState("black")
    const [successMessage, setSuccessMessage] = useState("")

    const updateName = (e) =>{
        setShopName(e.target.value)
    }
    const checkNameAvailability = () =>{
        setSuccessVisibility("hidden")
        let data = {
            "shopname":shopName
        }
        axios.get(process.env.REACT_APP_SERVER+'/checkshopname', data)
        .then(function (response){
            if(!hasSpecialChar(shopName) && shopName.length>=5 && shopName.length<=15)
            {   
                if(response.status==200)
                {
                    setSuccessMessage("Congratulations!"+shopName+" is available to create :)")
                    setColorVisibility("green")
                    setSuccessVisibility("visible")
                }
                else{
                    setSuccessMessage("Sorry! "+shopName+"has already been taken:)")
                    setColorVisibility("red")
                    setSuccessVisibility("visible")
                }
            }
            else{
                alert("Entered shopname has not met the requirements")
            }
        })
        .catch(function (err){
            alert("User Registration not successful."+err)
        })

    }
    return (
        <div style={{marginTop:"10%"}}>
        <Row>
            <Col span={3}></Col>
            <Col span={18}>
                <Card style={{borderColor:'grey'}}>
                    <h1 style={{fontFamily:"sans-serif",color:"#fc835b"}}><b>Name Your Shop</b></h1>
                    <h4>Choose a memorable name that reflects your style</h4>
                    <Input.Group compact>
                    <Input size="large" style={{ width: 'calc(100% - 200px)' }} placeholder='Type your shop name here' onChange= {e=>updateName(e)} />
                    <Button size="large" onClick={()=>checkNameAvailability()}>Check Availability</Button>
                  </Input.Group>
                  <br/>
                  <p align="center">Requirements: Name should have 5-15 characters with no special characters</p>
                  <br/>
                  <p align="center" style={{color:colorVisibility, visibility:successVisibility}}>{successMessage}</p>
                {/*   <p align="center" style={{color:"red", visibility:failureVisibility}}>Sorry! This Shop Name has already been taken :(</p> */}
                  <Button size="large" type="primary" shape="round">Create Shop Profile</Button>
                </Card>
            </Col>

        </Row>

        </div>
    )
}

export default SellItems;