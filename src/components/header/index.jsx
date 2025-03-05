import React from "react";
import { Layout, Menu, Button, Dropdown, Avatar } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import "./index.css";
import { useNavigate } from "react-router-dom";

const { Header } = Layout;

const AppHeader = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Lấy user từ Redux

  const handleLogout = () => {
    dispatch(logout());
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="bg-white border-b border-gray-200 flex justify-between items-center px-4 header">
      
      <div className="text-2xl font-bold text-blue-600">MyApp</div>

  
      <Menu
        mode="horizontal"
        defaultSelectedKeys={["1"]}
        className="flex-1 justify-center border-none bg-white"
      >
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2">Products</Menu.Item>
        <Menu.Item key="3">Contact</Menu.Item>
      </Menu>


    
      {user ? (
        <Dropdown overlay={userMenu} trigger={["click"]}>
          <div className="flex items-center cursor-pointer">
            <Avatar icon={<UserOutlined />} className="mr-2" />
            <span>{user.name}</span>
          </div>
        </Dropdown>
      ) : (
        <div className="space-x-2">
          <Button
            onClick={() => navigate("/login")}
            type="primary"
            icon={<LoginOutlined />}
          >
            Login
          </Button>
          <Button
            type="default"
            onClick={() => navigate("/register")}
            icon={<UserAddOutlined />}
          >
            Register
          </Button>
        </div>
      )}
    </Header>
  );
};

export default AppHeader;
