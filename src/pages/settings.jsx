import { useEffect, useState } from 'react';
import { Layout, Menu, Form, theme } from 'antd';
import { PlusOutlined,} from '@ant-design/icons';
import { LogoutOutlined } from '@ant-design/icons';
import { SettingOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { HomeOutlined} from '@ant-design/icons';
const { Sider,} = Layout;

const Settings = () => {
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

  const handleSubmit = async (e) => {
    const uppercaseRegex = /[A-Z]/;
    e.preventDefault();
    if(formData.name!="" && formData.name.length<2){
      toast.error('Name length must be 2 or more');
    }
    if (formData.password!="" && (formData.password.length <= 7 || !uppercaseRegex.test(formData.password))) {
      toast.error('Password must be greater than 7 characters and contain at least one uppercase letter');
    }
    else{
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/updatedetails?id=${Cookies.get('userid')}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if(response.data.message=="success"){
          toast.success('Profile Update');


          Cookies.set('image',response.data.data[0].image,{expires:1});
          Cookies.set('email',response.data.data[0].email,{expires:1});
          Cookies.set('name',response.data.data[0].name,{expires:1});
          // window.location.href="/dashboard";
        }
        console.log(response.data)
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
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
        <Menu.Item onClick={()=>{window.location.href="/dashboard"}} key="1" icon={<HomeOutlined />}>
            Dashboard
          </Menu.Item>
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
        <div className='container justify-cent justify-between flex-wrap  pt-10'>
        <form className='form myShadow' onSubmit={handleSubmit}>
            <h3 className='sm-heading'>Settings</h3>
            <h5 className='xs-heading md:mt-2'>Change Name</h5>
            <div className='mt-4 sm:mt-8' htmlFor=''>
                <input className='input'
                    type='text'
                    name='name'
                    autoComplete='off'  
                    id='name'
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='Name'
                />
            </div>
          
           
            <div className='justify-bet gap-x-3 mt-8 w-full'>
            <button type='submit' className='bg-blue text-white px-6 py-2 rounded tracking-wider'>Update</button>
            </div>
        </form>



        <form className='form myShadow' onSubmit={handleSubmit}>
            <h3 className='sm-heading'>Settings</h3>
            <h5 className='xs-heading md:mt-2'>Change Email</h5>
          
            <div className='mt-4 sm:mt-8' htmlFor=''>
                <input className='input'
                    type='email'
                    name='email'
                    autoComplete='off'  
                    id='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Email'
                />
            </div>
           
            <div className='justify-bet gap-x-3 mt-8 w-full'>
            <button type='submit' className='bg-blue text-white px-6 py-2 rounded tracking-wider'>Update</button>
            </div>
        </form>



        <form className='form myShadow' onSubmit={handleSubmit}>
            <h3 className='sm-heading'>Settings</h3>
            <h5 className='xs-heading md:mt-2'>Change Password</h5>
          
            <div className='mt-1' htmlFor=''>
                <input className='input'
                    type='password'
                    name='password'
                    autoComplete='off'
                    value={formData.password}
                    onChange={handleChange}
                    id='password'
                    placeholder='Password'
                />
            </div>
           
            <div className='justify-bet gap-x-3 mt-8 w-full'>
            <button type='submit' className='bg-blue text-white px-6 py-2 rounded tracking-wider'>Update</button>
            </div>
        </form>



        <form className='form myShadow' onSubmit={handleSubmit}>
            <h3 className='sm-heading'>Settings</h3>
            <h5 className='xs-heading md:mt-2'>Change Image</h5>
          
          
                <div className='mt-1' htmlFor=''>
                    <input className='input'
                        type='file'
                        name='image'
                        onChange={handleChange}
                        autoComplete='off'
                        id='image'
                    />
                </div>
            <div className='justify-bet gap-x-3 mt-8 w-full'>
            <button type='submit' className='bg-blue text-white px-6 py-2 rounded tracking-wider'>Update</button>
            </div>
        </form>


        <Toaster />
        </div>
      </Layout>
    </Layout>
  );
};

export default Settings;
