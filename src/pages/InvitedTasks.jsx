import { useEffect, useState } from 'react';
import { Layout, Menu, Form, theme } from 'antd';
import { PlusOutlined,} from '@ant-design/icons';
import { LogoutOutlined } from '@ant-design/icons';
import { SettingOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
const { Sider,} = Layout;

const InvitedTasks = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    image: null,
  });

  const handleLogout=()=>{
    Cookies.remove('email');
    Cookies.remove('token');
    Cookies.remove('name');
    Cookies.remove('userid');
    Cookies.remove('image');
    window.location.href="/login";
  }

  

  
const [invitations, setInvitations] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  const fetchInvitations = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/invitation/getinvitedtasks?recieverId=${Cookies.get('userid')}`);
      setInvitations(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchInvitations();
}, []);

// if (loading) return <p className="loading">Loading...</p>;
// if (error) return <p className="error">Error: {error}</p>;

 
const handleAccept = async (invitation_id) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/invitation/acceptask`, { invitation_id });
    // Refresh the invitations list or remove the accepted task from state
    setInvitations(invitations.filter(invitation => invitation.taskId !== taskId));
  } catch (err) {
    console.error('Error accepting task:', err);
  }
};

const handleReject = async (taskId) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/api/reject-task`, { invitation_id });
    // Refresh the invitations list or remove the rejected task from state
    setInvitations(invitations.filter(invitation => invitation.taskId !== taskId));
  } catch (err) {
    console.error('Error rejecting task:', err);
  }
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
            <Menu.Item key="1" icon={<PlusOutlined />} onClick={()=>{window.location.href="/manage-tasks"}}>
              Tasks
            </Menu.Item>
            <Menu.Item key="1" icon={<SettingOutlined />} onClick={()=>{window.location.href="/settings"}}>
              Settings
            </Menu.Item>
            <Menu.Item key="1" icon={<LogoutOutlined />} onClick={handleLogout}>
              Logout
            </Menu.Item>
        </Menu>
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 45 : 200,
          backgroundColor:"#001529"
        }}
      >
    


    <div className="invited-tasks-container">
      <h1 className="title">Invited Tasks</h1>
      {invitations.length > 0 ? (
        <ul className="task-list">
          {invitations.map(invitation => (
            <li key={invitation.invitation_id} className="task-item">
              <h2 className="task-title">{invitation.taskName}</h2>
              <p className="task-due-date">Due Date: {invitation.dueDate}</p>
              <p className="task-status">Status: {invitation.status}</p>
              <div className="button-container">
                <button className="accept-button" onClick={() => handleAccept(invitation.invitation_id)}>Accept</button>
                <button className="reject-button" onClick={() => handleReject(invitation.invitation_id)}>Reject</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="no-tasks">No invitations found.</p>
      )}
    </div>

      


        <Toaster />
      </Layout>
    </Layout>
  );
};

export default InvitedTasks;









