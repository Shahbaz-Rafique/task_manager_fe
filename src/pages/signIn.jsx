import { useFormik } from 'formik'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function SignIn() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/login`, {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      if(response.data.message=="success"){
        toast.success('Login successfully');
        Cookies.set('email',response.data.email,{expires:1});
        Cookies.set('token',response.data.token,{expires:1});
        Cookies.set('name',response.data.name,{expires:1});
        Cookies.set('userid',response.data.id,{expires:1});
        Cookies.set('image',response.data.image,{expires:1});
        window.location.href="/dashboard";
      }
      else if(response.data.message=="failure"){
        toast.error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className='container justify-cent pt-10'>
      <form className='form myShadow' onSubmit={handleSubmit}>
        <h3 className='sm-heading'>Log in</h3>
        <h5 className='xs-heading md:mt-2'>Enter email & Password</h5>
        <div className='mt-4 sm:mt-8' htmlFor=''>
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
        <div className='justify-bet gap-x-3 mt-8 w-full'>
          <button type='submit' className='bg-blue text-white px-6 py-2 rounded tracking-wider'>Log In</button>
          <Link to='/signup' className='text-blue cursor-pointer tracking-wier text-md'>Create Account?</Link>
        </div>
      </form>
      <Toaster />
    </div>
  )
}

export default SignIn
