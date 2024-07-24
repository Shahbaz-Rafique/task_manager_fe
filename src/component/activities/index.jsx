import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Toaster } from 'react-hot-toast';
import {
  SmileFilled,
  MehFilled,
  LikeFilled,
  HeartFilled,
  FrownFilled,
  MehOutlined,
} from "@ant-design/icons";

// Component to display the list of completed activities
const ActivitiesList = ({ title }) => {
  // State to store the list of activities
  const [list, setList] = useState([]);

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []); 

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      // Fetch tasks from the API using the user ID from cookies
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/gettasks?id=${Cookies.get('userid')}`);
      // Filter out tasks that are not completed
      setList(response.data.data.filter((item) => item.status === "Completed"));
    } catch (error) {
      // Log any errors that occur during the fetch
      console.log(error);
    }
  };

  // Component to render mood icons based on the mood value
  const MoodIcon = ({ mood }) => {
    switch (mood) {
      case "Happy":
        return <SmileFilled style={{ color: "#64dd17" }} />;
      case "Sad":
        return <FrownFilled style={{ color: "#ff1744" }} />;
      case "Angry":
        return <MehOutlined style={{ color: "#f44336" }} />;
      case "Excited":
        return <LikeFilled style={{ color: "#2979ff" }} />;
      case "Annoyed":
        return <MehFilled style={{ color: "#ff6d00" }} />;
      case "In Love":
        return <HeartFilled style={{ color: "#d500f9" }} />;
      default:
        return null;
    }
  };

  return (
    <div className="set-padding myShadow h-full">
      {/* Header for the completed activities section */}
      <h3 className='font-medium sm-heading text-xl mb-6'>Completed Activities</h3>
      <div className="relative overflow-x-auto">
        {/* Table to display the list of completed activities */}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">Task Name</th>
              <th scope="col" className="px-6 py-3">Mood</th>
              <th scope="col" className="px-6 py-3">Due Date</th>
              <th scope="col" className="px-6 py-3">Points</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index} className="bg-white border-b dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                  {item.name}
                </td>
                <td className="px-6 py-4" style={{ color: "black" }}>
                  {item.mood}
                  <span className="modd" style={{ marginLeft: "8px" }}>
                    <MoodIcon mood={item.mood} />
                  </span>                
                </td>
                <td className="px-6 py-4" style={{ color: "black" }}>
                  {new Date(item.date).toDateString()}
                </td>
                <td className="px-6 py-4" style={{ color: "black" }}>
                  {item.points ? item.points : 0}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster />
    </div>
  );
}

export default ActivitiesList;
