import React, { useState } from 'react';
import '../../App.css';
import { Row, Col,  Input, Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import '../../css/Custom.css';
import axios, {post} from 'axios';
//import { changeConfirmLocale } from 'antd/lib/modal/locale';
import { useDispatch,useSelector } from 'react-redux';
import { register } from '../../features/userSlice';
import { authenticateUser, login, logout, shopSelect } from '../../features/userSlice';


const ShopProfilePicture = () =>{
    const [filestore, setStoreFile] = useState(null)
    const changeFile = (e) =>{
        let data = e.target.files[0]
        setStoreFile(e.target.files[0])
    }

    const fileUpload = (file) =>{
        const url = process.env.REACT_APP_SERVER+'/uploadshopdp';
        const formData = new FormData();
        formData.append('profile-file',file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return  post(url, formData,config)
    }

    const uploadImage = (e) =>{
        e.preventDefault()
        fileUpload(filestore).then((response)=>{
            axios.post(process.env.REACT_APP_SERVER+'/updateshopimgdb', {'shopname':localStorage.getItem("shopname"), 'userid':localStorage.getItem("userid"),'imgname':response.data["data"]["Key"]})
            .then(response=>{
                console.log(response.data)
            })
        })
    }

 
    return (
        <div>
        {/*<form method="POST" action="http://localhost:4001/uploadshopdp" encType="multipart/form-data">*/}
        <form onSubmit={(e) => uploadImage(e)}>
        {/*<form onSubmit={(e) => uploadImage(e)}>*/}
        <div>
            <label>Upload profile picture</label>
            <input type="file" name="profile-file" onChange={(e)=>changeFile(e)} required/>
        </div>
        <div>
            <input type="submit" value="Upload" />
        </div>
        </form>
        </div>

    )
}

export default ShopProfilePicture;