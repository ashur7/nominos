import React from 'react'
import { Menu } from 'antd';
import {
    HomeOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <Menu theme="light" mode="horizontal" defaultSelectedKeys={['home']}>

            <Menu.Item key="home" icon={<HomeOutlined />}>
                <NavLink to="/">
                    All Orders
                </NavLink>
            </Menu.Item>


            <Menu.Item key="profile" icon={<UserOutlined />}>
                <NavLink to="/new-order">
                    Create New Order
                </NavLink>
            </Menu.Item>

        </Menu>
    );
};

export default Navbar