import React from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import { Link } from "react-router-dom";
import FirebaseApp from '../../config/firebase';


const { Header } = Layout;


const HeaderContent = ({ user }: any) => {

    const logoutHandler = () => {
        FirebaseApp.auth().signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
        });
    }

    return (
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}
        >
            <Row>
                <Col span={22}>
                    <Menu theme="dark" mode="horizontal" >
                        <Menu.Item key="1"><Link to="/"> FindHelp </Link></Menu.Item>
                    </Menu>
                </Col>
                {user ?
                    <Col span={2}>
                        <Menu theme="dark" mode="horizontal" onClick={logoutHandler}>
                            <Menu.Item key="1"><Link to="/"> Log Out </Link></Menu.Item>
                        </Menu>
                    </Col> :
                    null
                }

            </Row>

        </Header>
    )
}

export default HeaderContent;