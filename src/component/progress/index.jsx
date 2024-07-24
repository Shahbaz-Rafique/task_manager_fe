import { useState, useEffect } from 'react';
import { Progress } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';

const ProgressList = ({ title }) => {
  // State to determine if the device is mobile
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  // State to store the list of tasks
  const [tasks, setTasks] = useState([]);

  // Hook to get the current location from React Router
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const taskId = query.get('id');

  // Effect to handle data fetching and window resize event
  useEffect(() => {
    // Fetch tasks based on the title prop
    if (title === "Manage Sub Tasks") {
      console.log("This is subtask");
      fetchDatasubtasks();
    } else {
      fetchData();
    }

    // Handler function to update the `isMobile` state based on window width
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);
    
    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [title, taskId]); // Dependency array to re-run effect when `title` or `taskId` changes

  // Function to fetch main tasks from API
  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/gettasks?id=${Cookies.get('userid')}`);
      setTasks(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to fetch subtasks based on `taskId` from API
  const fetchDatasubtasks = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/gettasks/getsubtasks?taskId=${taskId}`);
      setTasks(response.data.data);
      console.log("This is the reso", response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to determine the stroke color based on the percentage
  const getStrokeColor = (percentage) => {
    if (percentage < 30) {
      return '#ff4d4f'; // Red color if less than 30%
    } else if (percentage < 70) {
      return '#faad14'; // Yellow color if less than 70%
    } else {
      return '#52c41a'; // Green color if 70% or more
    }
  };

  return (
    <div className='grid grid-cols-2 gap-y-8'>
      {/* Pending Tasks Progress */}
      <div key={1}>
        <Progress 
          type="circle" 
          size={isMobile ? 'small' : 'large'} 
          percent={tasks.length > 0 ? ((tasks.filter((item) => item.status === "Pending").length / tasks.length) * 100).toFixed(2) : 0} 
          strokeColor={getStrokeColor((tasks.filter((item) => item.status === "Pending").length / tasks.length) * 100)}
        />
        <div className="mt-2 font-medium text-center">
          {`Pending Tasks (${tasks.filter((item) => item.status === "Pending").length})`}
        </div>
      </div>

      {/* In Progress Tasks Progress */}
      <div key={2}>
        <Progress 
          type="circle" 
          size={isMobile ? 'small' : 'large'} 
          percent={tasks.length > 0 ? ((tasks.filter((item) => item.status === "In Progress").length / tasks.length) * 100).toFixed(2) : 0} 
          strokeColor={getStrokeColor((tasks.filter((item) => item.status === "In Progress").length / tasks.length) * 100)}
        />
        <div className="mt-2 font-medium text-center">
          {`In Progress Tasks (${tasks.filter((item) => item.status === "In Progress").length})`}
        </div>
      </div>

      {/* Completed Tasks Progress */}
      <div key={3}>
        <Progress 
          type="circle" 
          size={isMobile ? 'small' : 'large'} 
          percent={tasks.length > 0 ? ((tasks.filter((item) => item.status === "Completed").length / tasks.length) * 100).toFixed(2) : 0} 
          strokeColor={getStrokeColor((tasks.filter((item) => item.status === "Completed").length / tasks.length) * 100)}
        />
        <div className="mt-2 font-medium text-center">
          {`Completed Tasks (${tasks.filter((item) => item.status === "Completed").length})`}
        </div>
      </div>
    </div>
  );
};

export default ProgressList;
