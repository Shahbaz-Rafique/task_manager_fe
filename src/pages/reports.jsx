import { useEffect, useState } from "react";
import { Layout, Menu, Form, theme, Select } from "antd";
import { HomeOutlined, PlusOutlined } from "@ant-design/icons";
import { LogoutOutlined } from "@ant-design/icons";
import { SettingOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";
import Cookies from "js-cookie";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const { Sider } = Layout;
const { Option } = Select;

const Reports = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });

  const handleLogout = () => {
    Cookies.remove("email");
    Cookies.remove("token");
    Cookies.remove("name");
    Cookies.remove("userid");
    Cookies.remove("image");
    window.location.href = "/login";
  };

  const handleSubmit = async (e) => {
    const uppercaseRegex = /[A-Z]/;
    e.preventDefault();
    if (formData.name != "" && formData.name.length < 2) {
      toast.error("Name length must be 2 or more");
    }
    if (
      formData.password != "" &&
      (formData.password.length <= 7 || !uppercaseRegex.test(formData.password))
    ) {
      toast.error(
        "Password must be greater than 7 characters and contain at least one uppercase letter"
      );
    } else {
      try {
        const response = await axios.post(
          `${
            import.meta.env.VITE_API_URL
          }/api/v1/updatedetails?id=${Cookies.get("userid")}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (response.data.message == "success") {
          toast.success("Profile Update");

          Cookies.set("image", response.data.data[0].image, { expires: 1 });
          Cookies.set("email", response.data.data[0].email, { expires: 1 });
          Cookies.set("name", response.data.data[0].name, { expires: 1 });
          // window.location.href="/dashboard";
        }
        console.log(response.data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
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

  const [selectedCategory, setSelectedCategory] = useState("");
  const handleChangeselect = (value) => {
    setSelectedCategory(value);
  };
  const handledownload = async () => {
    console.log(selectedCategory);

    try {
        let response;

        if (selectedCategory === "Weekly") {
            response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/gettasks/getWeeklyTasks`,
                { responseType: 'blob' } 
            );
        } else if (selectedCategory === "Monthly") {
            response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/gettasks/getMonthlyTasks`,
                { responseType: 'blob' }
            );
        } else {
            throw new Error('Invalid category selected');
        }

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `tasks-${selectedCategory}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.remove();

        toast.success('File downloaded successfully!');
    } catch (error) {
        console.error('Error downloading tasks:', error);
        toast.error('Failed to download tasks. Please try again.');
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
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          paddingTop: "20px",
          color: "white",
          zIndex: 99,
          boxShadow: " 0px 0px 10px rgba(201, 201, 201, 0.3)",
        }}
      >
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            key="1"
            icon={<HomeOutlined />}
            onClick={() => {
              window.location.href = "/dashboard";
            }}
          >
            Dashboard
          </Menu.Item>
          <Menu.Item
            key="1"
            icon={<PlusOutlined />}
            onClick={() => {
              window.location.href = "/manage-tasks";
            }}
          >
            Tasks
          </Menu.Item>
          <Menu.Item key="1" icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout
        style={{
          marginLeft: collapsed ? 45 : 200,
          backgroundColor: "#001529",
        }}
      >
        {/* show dropdown with download button */}
        {/* heading Reports */}
        {/* show table with data */}
        <div className="set-padding myShadow h-full ">
          <h3 className="font-medium text-center sm-heading text-xl mb-6">
            Reports
          </h3>
          <Form
            onFinish={handleSubmit}
            onChange={handleChange}
            className="w-1/2 mx-auto"
            layout="vertical"
          >
            {/* select option to select monthly and weekly */}
            <Form.Item
              name="category"
              label="Period"
              className="text-white"
              rules={[{ required: true, message: "Please select an option" }]}
            >
              <Select
                onChange={handleChangeselect}
                value={selectedCategory}
                placeholder="Select your Category"
                style={{ width: "100%",backgroundColor:"#001529" }}
                dropdownStyle={{ textAlign: "left" }}
              >
                <Option value="Weekly">
                  <span
                    style={{
                      display: "inline-block",
                      width: "calc(100% - 24px)",
                      textAlign: "left",
                    }}
                  >
                    Weekly
                  </span>
                </Option>
                <Option value="Monthly">
                  <span
                    style={{
                      display: "inline-block",
                      width: "calc(100% - 24px)",
                      textAlign: "left",
                    }}
                  >
                    Monthly
                  </span>
                </Option>
              </Select>
            </Form.Item>

            {/* download button */}
            <div className="flex justify-center items-center mb-4">
              <button
                onClick={handledownload}
                type="submit"
                className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Download
              </button>
            </div>
          </Form>
        </div>
      </Layout>
    </Layout>
  );
};

export default Reports;
