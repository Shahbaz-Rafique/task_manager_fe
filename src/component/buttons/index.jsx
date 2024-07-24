import React, { useEffect, useState } from 'react';
import { Button, Flex } from 'antd';
import axios from 'axios';
import Cookies from 'js-cookie'; 

const App = () => {
  // State to hold the list of tasks
  const [tasks, setTasks] = useState([]);

  // Function to fetch tasks from the API
  const fetchData = async () => {
    try {
      // Get tasks from the API using the user ID from cookies
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/gettasks?id=${Cookies.get('userid')}`);
      // Update state with the fetched tasks
      setTasks(response.data.data);
    } catch (error) {
      // Log any errors that occur during the fetch
      console.log(error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Flex gap="small" wrap justify='center'>
      {/* Button displaying total number of tasks */}
      <Button type="primary" style={{backgroundColor:"white", color:"blue", border:"1px solid blue"}}>
        Total: {tasks.length}
      </Button>
      {/* Button displaying number of pending tasks */}
      <Button type="primary" style={{backgroundColor:"white", color:"blue", border:"1px solid blue"}}>
        Pending: {tasks.filter((item) => item.status === "Pending").length}
      </Button>
      {/* Button displaying number of tasks in progress */}
      <Button type="primary" style={{backgroundColor:"white", color:"blue", border:"1px solid blue"}}>
        In Progress: {tasks.filter((item) => item.status === "In Progress").length}
      </Button>
      {/* Button displaying number of completed tasks */}
      <Button type="primary" style={{backgroundColor:"white", color:"blue", border:"1px solid blue"}}>
        Completed: {tasks.filter((item) => item.status === "Completed").length}
      </Button>
    </Flex>
  );
};

export default App;
