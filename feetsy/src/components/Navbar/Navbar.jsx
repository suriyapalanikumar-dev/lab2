import React, {Component} from 'react';
import '../../App.css';
import { Row, Col,  Input, Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import '../../css/Custom.css';
import {
    ShoppingCartOutlined
  } from '@ant-design/icons';
const { Search } = Input;
class Navbar extends Component
{
    state = {
        modal2Visible: false,
    };
    setModal2Visible(modal2Visible) {
        this.setState({ modal2Visible });
    }
    
    render()
    {
        return (
            <div className="navf">
                <Row>
                    <Col span={3}>
                        <span className="appname">Etsy</span>
                    </Col>
                    <Col span={18}>
                        <Search size="large" placeholder="Search for anything" className='searchitem' enterButton />
                    </Col>
                    <Col span={3}>
                        <Row>
                            <Col span={12} style={{paddingRight:"0px"}}> 
                                <Button type="dashed" className="signin" onClick={() => this.setModal2Visible(true)}>Sign In</Button>
                            </Col>
                            <Col span={12} style={{padding:"0px"}}>
                                <Button icon={<ShoppingCartOutlined />} size="large" />
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Modal
                    visible={this.state.modal2Visible}
                    onOk={() => this.setModal2Visible(false)}
                    onCancel={() => this.setModal2Visible(false)}
                    >
                        
                </Modal>
            </div>            
        )
    }l

}

export default Navbar;
