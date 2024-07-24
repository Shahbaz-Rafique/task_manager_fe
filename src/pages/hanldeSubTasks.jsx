import { useEffect, useState } from 'react';
import { Layout, Menu, Form, theme } from 'antd';
import { HomeOutlined, PlusOutlined,} from '@ant-design/icons';
import 'antd/dist/reset.css';
import TaskModal from '../component/modal';
import Profile from './profile';
import Cookies from 'js-cookie';
import axios from 'axios';
import { LogoutOutlined } from '@ant-design/icons';
import toast, { Toaster } from 'react-hot-toast';
import NewProfile from './newProfile';
import { Link } from 'react-router-dom';
import Tasklist from '../component/taskList';
import SubTasklist from '../component/subTaskList';
const { Content, Sider,} = Layout;
import { useLocation } from 'react-router-dom';

const HandleSubTasks = () => {
  const [tasks,setTasks]=useState([]);
  const {
    token: {borderRadiusLG },
  } = theme.useToken();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalVisible(true);
  };


  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const taskId = query.get('id');

  console.log(taskId)
  const handleOk = () => {
    form.validateFields().then((values) => {
      axios.post(`${import.meta.env.VITE_API_URL}/api/v1/AddTask/addsubtask?id=${Cookies.get('userid')} &taskId=${taskId}`, values)
        .then(response => {
          if(response.status=="200"){
            toast.success('Task Added');
            form.resetFields();
            setIsModalVisible(false);
            window.location.href="/manage-tasks";
          }
        })
        .catch(error => {
          console.error('There was an error submitting the form:', error);
      });
    });
  };


  

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleLogout=()=>{
    Cookies.remove('email');
    Cookies.remove('token');
    Cookies.remove('name');
    Cookies.remove('userid');
    Cookies.remove('image');
    window.location.href="/login";
  }

  const GotoDashboard=()=>{
    window.location.href="/dashboard";

  }

  return (
    <Layout>
      <Sider
        breakpoint="sm"
        collapsedWidth="45"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          paddingTop: '20px',
          color: 'white',
          zIndex: 99,
          boxShadow:' 0px 0px 10px rgba(201, 201, 201, 0.3)'

        }}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item onClick={GotoDashboard} key="1" icon={<HomeOutlined />}>
            Dashboard
          </Menu.Item>
          <Menu.Item key="1" icon={<PlusOutlined />} onClick={showModal}>
            Add Task
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
          <div className='p-2 sm:p-6'
            style={{
              textAlign: 'center',
              borderRadius: borderRadiusLG,
            }}
          >
           <NewProfile title="Manage Sub Tasks">
                <SubTasklist title="Recent Task"/>
            </NewProfile>
          </div>
        </Content>
      </Layout>

      <TaskModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        form={form}
        issubtask={true}
      />
    <Toaster/>
    </Layout>
  );
};

export default HandleSubTasks;
