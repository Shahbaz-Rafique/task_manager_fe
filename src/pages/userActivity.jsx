import { useEffect, useState } from 'react';
import { Layout, Menu } from 'antd';
import { HomeOutlined, PlusOutlined, LogoutOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { CategoryScale } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const { Sider } = Layout;

Chart.register(CategoryScale);

const UserActivity = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [tasks, setTasks] = useState([]);

    const priority = {
        Happy: 6,
        'In Love': 5,
        Excited: 4,
        Sad: 3,
        Annoyed: 2,
        Angry: 1,
    }

    const moodColors = {
        Happy: 'rgba(76, 175, 80, 0.2)', // Green
        Sad: 'rgba(33, 150, 243, 0.2)', // Blue
        Angry: 'rgba(244, 67, 54, 0.2)', // Red
        Excited: 'rgba(255, 235, 59, 0.2)', // Yellow
        Annoyed: 'rgba(255, 152, 0, 0.2)', // Orange
        'In Love': 'rgba(233, 30, 99, 0.2)' // Pink
    };

    const borderColor = {
        Happy: 'rgba(76, 175, 80, 1)',
        Sad: 'rgba(33, 150, 243, 1)',
        Angry: 'rgba(244, 67, 54, 1)',
        Excited: 'rgba(255, 235, 59, 1)',
        Annoyed: 'rgba(255, 152, 0, 1)',
        'In Love': 'rgba(233, 30, 99, 1)'
    };

    const handleLogout = () => {
        Cookies.remove('email');
        Cookies.remove('token');
        Cookies.remove('name');
        Cookies.remove('userid');
        Cookies.remove('image');
        window.location.href = "/login";
    };

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/gettasks?id=${Cookies.get("userid")}`)
            .then(response => {
                if (response.status === 200) {
                    setTasks(response.data.data);
                }
            })
            .catch(error => {
                console.error('There was an error fetching the tasks:', error);
            });
    }, []);



    const data = {
        labels: tasks?.sort(
            (a, b) => priority[b.mood] - priority[a.mood]
        ).map(task => {
            return task.name;
        })
        ,
        datasets: [
            {
                label: 'Popularity of colours',
                data: tasks?.map(task => {
                    return priority[task.mood];
                }
                ),
                backgroundColor: tasks?.map(task => {
                    return moodColors[task.mood];
                }
                ),
                borderColor: tasks?.map(task => {
                    return borderColor[task.mood];
                }
                ),
                borderWidth: 1,



            },
        ],
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
                    boxShadow: '0px 0px 10px rgba(201, 201, 201, 0.3)'
                }}
            >
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                    <Menu.Item key="2" icon={<HomeOutlined />} onClick={() => { window.location.href = "/dashboard" }}>
                        Dashboard
                    </Menu.Item>
                    <Menu.Item key="1" icon={<PlusOutlined />} onClick={() => { window.location.href = "/manage-tasks" }}>
                        Tasks
                    </Menu.Item>
                    <Menu.Item key="3" icon={<LogoutOutlined />} onClick={handleLogout}>
                        Logout
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout
                style={{
                    marginLeft: collapsed ? 45 : 200,
                    backgroundColor: "#001529"
                }}
            >
             <div className="set-padding text-white myShadow h-full">
    <h3 className='font-medium text-white text-center sm-heading text-xl mb-6'>
        User Activity
    </h3>
    <div className='flex items-center text-white justify-center w-full'>
        <div className='w-[50rem] text-white h-[40rem] backdrop-blur-xl bg-[#001529] shadow-lg shadow-slate-700 p-3 rounded-3xl flex items-center'>
            {tasks &&
                <Bar
                    data={data}
                    options={{
                        plugins: {
                            title: {
                                display: true,
                                text: "Users task and Mood",
                                color: "white" // Title color
                            },
                            legend: {
                                display: false // Legend display is false so no need to set color
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(context) {
                                        return context.label + ': ' + context.formattedValue; // Tooltip label
                                    }
                                },
                                titleFont: {
                                    color: 'white' // Tooltip title color
                                },
                                bodyFont: {
                                    color: 'white' // Tooltip body color
                                }
                            }
                        },
                        scales: {
                            x: {
                                ticks: {
                                    color: 'white' // X-axis ticks color
                                },
                              
                            },
                            y: {
                                ticks: {
                                    color: 'white' // Y-axis ticks color
                                },
                               
                            }
                        }
                    }}
                    height={400} width={600}
                />
            }
        </div>
    </div>
</div>

            </Layout>
        </Layout>
    );
};

export default UserActivity;
