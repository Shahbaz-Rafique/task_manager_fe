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
import { useParams } from 'react-router-dom'; // Import useParams for route parameters

const TaskNotes = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    image: null,
  });
  const { taskId } = useParams(); // Get taskId from route parameters

  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout=()=>{
    Cookies.remove('email');
    Cookies.remove('token');
    Cookies.remove('name');
    Cookies.remove('userid');
    Cookies.remove('image');
    window.location.href="/login";
  }

  const [taskName, setTaskName] = useState('');


  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/notes/getallnotes`, {
          params: { taskId }
        });
        setNotes(response.data.data);
        if (response.data.data.length > 0) {
            setTaskName(response.data.data[0].name);
          }
        console.log(response.data.data)
      } catch (err) {
        setError('Failed to fetch notes');
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [taskId]);

  if (loading) return <p>Loading notes...</p>;
  if (error) return <p>{error}</p>;






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
    

    <div className="notes-page">
          <h1 className="title">Notes for Task {taskName}</h1>
          <ul className="notes-list">
            {notes.length > 0 ? (
              notes.map(note => (
                <li key={note.id} className="note-item">
                  <p className="note-content">{note.note}</p>
                  <p className="note-date">{new Date(note.createdAt).toLocaleDateString()}</p>
                </li>
              ))
            ) : (
              <p>No notes found.</p>
            )}
          </ul>
        </div>
      


        <Toaster />
      </Layout>
    </Layout>
  );
};

export default TaskNotes;









