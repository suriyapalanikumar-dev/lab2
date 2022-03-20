import React, {Component, useEffect, useState} from 'react';
import {Row, Col, Card, Input, Button, Modal, Select} from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import {
    ShopOutlined, EditOutlined, FileAddOutlined
  } from '@ant-design/icons';
import noimage from "../../images/noimage.png";
import { useDispatch,useSelector } from 'react-redux';
import { register } from '../../features/userSlice';
import { authenticateUser, login, logout, shopSelect } from '../../features/userSlice';
import Navbar from '../Navbar/Navbar';


const {Meta} = Card;
const {Option} = Select;
const {TextArea} = Input;

const UserProfile = () =>{
    const dispatch = useDispatch();
    const loguser = useSelector(authenticateUser)
    
    return (
        <div>
            <h2><b>Your Profile</b></h2>
            <div style={{padding:"2%", boarderColor:"black"}}>
            <label>Profile Picture</label>
            <form >
            <div>
                <label>Upload Item picture: </label>
                <input type="file" name="profile-file" required/>
            </div>
            <div>
                <input type="submit" value="Upload"/>
            </div>
            </form>
            <label>Name:</label>
            <Input size="large" />
            <br/>
            <label>DOB</label>
            <Input size="large" placeholder="MM/DD/YYYY" />
            <br/>
            <label>City</label>
            <Input size="large" placeholder="Enter your city" />
            <br/>
            <label>Country</label>
            <Select
            size="large"
            >
                <Option value="India">India</Option>
                <Option value="United Kingdom">United Kingdom</Option>
                <Option value="United States">United States</Option>
                </Select>
            <label>Address</label>
            <TextArea rows={4}  />
            <br/>
            <label>Phone</label>
            <Input size="large" placeholder="Enter your Phone Number" />
            <br/>
            <label>Email</label>
            <Input size="large"  />
            <br/>
            <div>
            
            </div>
            <br/>
            <Button type="primary" size="large" shape="round" >Add User Profile</Button>
            </div>
            
        </div>
    )
}

export default UserProfile;

