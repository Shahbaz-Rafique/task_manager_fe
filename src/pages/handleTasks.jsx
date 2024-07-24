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
const { Content, Sider,} = Layout;

const HandleTasks = () => {
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
  const handleOk = () => {
    form.validateFields().then((values) => {
      const taskData = {
        ...values,
        recurring: values.isRecurring ? values.recurringType : null,
        recurringType: values.recurringType ? values.recurringType : ""
      };
  
      axios.get(`${import.meta.env.VITE_API_URL}/api/v1/addtask/checkgoogle?id=${Cookies.get('userid')}`)
        .then(response => {
          if (response.data.authenticated) {
            console.log("Yes Going to add");
            addTask(taskData);
          } else {
            // User is not authenticated, store task data and redirect to Google authentication
            localStorage.setItem('pendingTask', JSON.stringify(taskData));
            window.location.href = `${import.meta.env.VITE_API_URL}/google?id=${Cookies.get('userid')}`;
          }
        })
        .catch(error => {
          console.error('Error checking Google authentication:', error);
          toast.error('Failed to add task');
        });
    }).catch(errorInfo => {
      console.error('Validation failed:', errorInfo);
    });
  };
  
  const addTask = (taskData) => {
    axios.post(`${import.meta.env.VITE_API_URL}/api/v1/addtask?id=${Cookies.get('userid')}`, taskData)
      .then(response => {
        if (response.status === 200) {
          toast.success('Task Added');
          form.resetFields();
          handleCancel(); // Close the modal
          window.location.href = "/manage-tasks";
        }
      })
      .catch(error => {
        console.error('There was an error submitting the form:', error);
        toast.error('Failed to add task');
      });
  };
  
  // Call this function on page load to check for pending tasks
  const checkForPendingTask = () => {
    const pendingTask = localStorage.getItem('pendingTask');
    if (pendingTask) {
      addTask(JSON.parse(pendingTask));
      localStorage.removeItem('pendingTask');
    }
  };


  useEffect(() => {
    checkForPendingTask();
  }, []);


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
           <NewProfile title="Manage Tasks">
                <Tasklist title="Recent Task"/>
            </NewProfile>
          </div>
        </Content>
      </Layout>

      <TaskModal
        isModalVisible={isModalVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        form={form}
        issubtask={false}
      />
    <Toaster/>
    </Layout>
  );
};

export default HandleTasks;
