import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Table = ({ title }) => {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/getPositions`);
      setList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="set-padding myShadow h-full">
      <h3 className='font-medium sm-heading text-xl mb-6'>Leader Board</h3>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3">
                Position
              </th>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Level
              </th>
              <th scope="col" className="px-6 py-3">
                badge
              </th>
              <th scope="col" className="px-6 py-3">
                Points
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr key={index} className="bg-white border-b dark:border-gray-700">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                  {index+1}
                </td>
                <td className="px-6 py-4" style={{color:"black"}}>
                  {item.name}
                </td>
                <td className="px-6 py-4" style={{color:"black"}}>
                  {item.level}
                </td>
                <td className="px-6 py-4" style={{color:"black"}}>
                  {item.badge}
                </td>
                <td className="px-6 py-4" style={{color:"black"}}>
                  {item.userPoints}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
