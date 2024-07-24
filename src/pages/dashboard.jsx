import { useState } from "react";
import { Layout, Menu, Form, theme } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { LogoutOutlined } from "@ant-design/icons";
import { SettingOutlined,MailOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import TaskModal from "../component/modal";
import Profile from "./profile";
import Cookies from "js-cookie";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { IoBarChartOutline } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
const { Content, Sider } = Layout;

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/api/v1/addtask?id=${Cookies.get(
            "userid"
          )}`,
          values
        )
        .then((response) => {
          if (response.status == "200") {
            toast.success("Task Added");
            form.resetFields();
            setIsModalVisible(false);
            window.location.href = "/dashboard";
          }
        })
        .catch((error) => {
          console.error("There was an error submitting the form:", error);
        });
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleLogout = () => {
    Cookies.remove("email");
    Cookies.remove("token");
    Cookies.remove("name");
    Cookies.remove("userid");
    Cookies.remove("image");
    window.location.href = "/login";
  };

  return (
    <Layout>
      <Sider
        breakpoint="sm"
        collapsedWidth="45"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          paddingTop: "20px",
          color: "white",
          zIndex: 99,
          boxShadow: " 0px 0px 10px rgba(201, 201, 201, 0.3)",
        }}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            key="1"
            icon={<PlusOutlined />}
            onClick={() => {
              window.location.href = "/manage-tasks";
            }}
          >
            Tasks
          </Menu.Item>
          <Menu.Item
            key="1"
            icon={<SettingOutlined />}
            onClick={() => {
              window.location.href = "/settings";
            }}
          >
            Settings
          </Menu.Item>
          <Menu.Item
            key="1"
            icon={<IoBarChartOutline size={18} />}
            onClick={() => {
              window.location.href = "/activity";
            }}
          >
            User Activity
          </Menu.Item>

          <Menu.Item
            key="1"
            icon={<MailOutlined size={18} />}
            onClick={() => {
              window.location.href = "/invitations";
            }}
          >
            Invitations
          </Menu.Item>
          <Menu.Item
            key="1"
            icon={<HiOutlineDocumentReport size={18} />}
            onClick={() => {
              window.location.href = "/reports";
            }}
          >
            Reports
          </Menu.Item>
          <Menu.Item key="1" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 45 : 200,
        }}
      >
        <Content>
          <div
            className="p-2 sm:p-6"
            style={{
              textAlign: "center",
              borderRadius: borderRadiusLG,
            }}
          >
            <Profile />
          </div>
        </Content>
      </Layout>

      <TaskModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        form={form}
      />
      <Toaster />
    </Layout>
  );
};

export default Dashboard;
