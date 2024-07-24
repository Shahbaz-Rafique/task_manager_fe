import { Link, Navigate } from 'react-router-dom';
import UploadImg from '../component/uploadImg'
import { useState } from 'react';
import toast,{Toaster} from 'react-hot-toast';
import axios from 'axios';

function index() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmpassword:'',
    image: null,
  });

  const handleSubmit = async (e) => {
    const uppercaseRegex = /[A-Z]/;
    e.preventDefault();
    if(formData.name.length<2){
      toast.error('Name length must be 2 or more');
    }
    if (formData.password.length <= 7 || !uppercaseRegex.test(formData.password)) {
      toast.error('Password must be greater than 7 characters and contain at least one uppercase letter');
    }

    if(formData.password!==formData.confirmpassword)
    {
      toast.error('Password and Confirm password does not match');

    }
    else{
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/register`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if(response.data.message=="success"){
          toast.success('Registration completed! Please verify your email. A verification link has been sent to your email address.');
          window.location.href="/login";
        }
        else if(response.data.message=="already"){
          toast.error('Email already exist');
        }
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
      <div className='container justify-cent py-10'>
        <form className='form myShadow' onSubmit={handleSubmit} action="">
          <h3 className='sm-heading'>Create an account</h3>
          <h5 className='xs-heading mt-2'>Enter your details below</h5>
          <div className="mt-5">
            <input className='input'
              type='file'
              name='image'
              autoComplete='off'
              id='image'
              placeholder='Image'
              onChange={handleChange}
            />
          </div>
          <div className='mt-5 sm:mt-8' htmlFor=''>
            <input className='input'
              type='text'
              name='name'
              autoComplete='off'
              id='name'
              placeholder='Name'
              value={formData.name}
              onChange={handleChange}
            />
          </div><br />
          <div className='mt-1' htmlFor=''>
            <input className='input'
              type='email'
              name='email'
              autoComplete='off'
              id='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleChange}
            />
          </div><br />
          <div className='mt-1' htmlFor=''>
            <input className='input'
              type='password'
              name='password'
              autoComplete='off'
              id='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
            />
          </div>

<br />
          <div className='mt-1' htmlFor=''>
            <input className='input'
              type='password'
              name='confirmpassword'
              autoComplete='off'
              id='password'
              placeholder='Confirm Password'
              value={formData.confirmpassword}
              onChange={handleChange}
            />
          </div>
          <button type='submit' className='text-white text-center bg-blue inline-block w-full py-2 rounded mt-7'>Create Account</button>
          <div className='items-cent justify-evenly gap-x-3 mt-8 w-full'>
            <p className='text-[15px]'>Already have account?</p>
            <Link to='/login' className='text-md underline hover:text-red-600'>Log in</Link>
          </div>
        </form>
        <Toaster />
      </div>
  )
}

export default index
