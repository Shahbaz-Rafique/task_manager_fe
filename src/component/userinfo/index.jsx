import { useEffect, useState } from 'react';
import Badge from '../badge';
import Cookies from 'js-cookie';
import axios from 'axios';
import Link from 'antd/es/typography/Link';

function UserInfo() {
  const [user,setUser]=useState({});

  useEffect(()=>{
    fetchData();
  },[])

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/getPositions`);
      setUser(response.data.data.filter((item)=>item.Id==Cookies.get('userid'))[0]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='flex justify-cent flex-col gap-2 text-center'>
      <h1 className='sm-heading font-bold'>{Cookies.get('name')} Welcome!</h1>
      <p className=' font-medium text-light'>Hello! Welcome to your portal!</p>
      <div className='flex gap-5 mt-4'>
        <p className='xs-heading text-light'>Level {user && user.level}</p>
        <Badge badge={user && user.badge}/>
      </div>
    </div>
  )
}

export default UserInfo
