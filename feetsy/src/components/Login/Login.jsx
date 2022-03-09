import React, {Component} from 'react';
import '../../App.css';
import { Row, Col,  Input, Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import '../../css/Custom.css';
class Login extends Component
{
    constructor(props){
        super(props);
        this.state={
            loginEnabled : true,
            emailr : "",
            passwordr : "",
            name: "",
            email:"",
            password: ""  
        }
        this.navigateRegister = this.navigateRegister.bind(this);
        this.emailrHandler = this.emailrHandler.bind(this);
        this.passwordrHandler = this.passwordrHandler.bind(this);
        this.nameHandler = this.nameHandler.bind(this);
        this.emailHandler = this.emailHandler.bind(this);
        this.passwordHandler = this.passwordHandler.bind(this);
        this.registerUser = this.registerUser.bind(this);
        //this.loginUser = this.loginUser.bind(this);
    }

    componentDidMount()
    {
        this.setState({
            loginEnabled: true
        })
    }

    navigateRegister = (e) =>{
        this.setState({
            loginEnabled : false
        })
    }

    emailrHandler = (e) =>{
        this.setState({
            emailr : e.target.value
        })
    }

    passwordrHandler = (e) =>{
        this.setState({
            passwordr : e.target.value
        })
    }

    nameHandler = (e) =>{
        this.setState({
            name : e.target.value
        })
    }

    emailHandler = (e) =>{
        this.setState({
            email : e.target.value
        })
    }

    passwordHandler = (e) =>{
        this.setState({
            password : e.target.value
        })
    }

    registerUser = (e) =>
    {
        e.preventDefault();
        const data = {
            name : this.state.name,
            email : this.state.emailr,
            password : this.state.passwordr
        }
        
    }

    render()
    {
        return(
            <div>
                {this.state.loginEnabled?
                <div>
                    <Row>
                        <Col span={18}>
                            <h2>Sign In</h2>
                        </Col>
                        <Col span={6}>
                            <Button  type="primary" onClick={this.navigateRegister}>Register</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <p><b>Email address</b></p>
                        </Col>
                        <Col span={24}>
                            <Input onChange={this.emailHandler} className="email"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <p><b>Password</b></p>
                        </Col>
                        <Col span={24}>
                            <Input.Password onChange={this.passwordHandler} className="password"/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <Button type="primary" shape="round" className="signin" size='large' onClick={this.loginUser}>Sign in</Button>
                        </Col>
                    </Row>
                </div>
                :
                
                <div>
                    <h2><b>Create your profile</b></h2>
                    <h4>Registration is easy</h4>
                    <Row>
                        <Col span={24}>
                            <p><b>Email address</b></p>
                        </Col>
                        <Col span={24}>
                            <Input className="emailr" onChange={this.emailrHandler}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <p><b>Full Name</b></p>
                        </Col>
                        <Col span={24}>
                            <Input className="namer" onChange={this.nameHandler}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <p><b>Password</b></p>
                        </Col>
                        <Col span={24}>
                            <Input.Password className="passwordr" onChange={this.passwordrHandler}/>
                        </Col>
                    </Row>
                    <br></br>
                    <Row>
                        <Col span={24}>
                            <Button type="primary" shape="round" className="register" size='large' onClick={this.registerUser}>Register</Button>
                        </Col>
                    </Row>
                </div>}
            </div>
        )
    }
}

export default Login;