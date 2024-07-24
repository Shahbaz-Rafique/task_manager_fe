import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Modal, Form, Input, Select, Button } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useTable, useSortBy } from "react-table";
import {
  SmileFilled,
  FrownFilled,
  MehFilled,
  ThunderboltFilled,
  DislikeFilled,
  CheckOutlined,
  LikeFilled,
  HeartFilled,
  MehOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";

const { Option } = Select;

const SubTasklist = ({ title }) => {
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [taskname, setTaskname] = useState("");
  const [mood, setMode] = useState("");
  const [priority, setpriority] = useState("");

  const [date, setDate] = useState();
  const [id, setId] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [showAddNotes, setShowAddNotes] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dropIndex, setDropIndex] = useState(null);

  useEffect(() => {
    fetchData();
    fetchUsersData();
  }, []);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const taskId = query.get("id");
  const fetchUsersData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/getPositions`
      );
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = React.useCallback(async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/gettasks/getsubtasks?id=${Cookies.get(
          "userid"
        )}&taskId=${taskId}`
      );
      const tasks = response.data.data.filter(
        (item) => item.status !== "Completed"
      );
      setList(tasks);

      const tasksByDate = tasks.reduce((acc, task) => {
        const date = new Date(task.date).toISOString().split("T")[0];
        if (!acc[date]) acc[date] = [];
        acc[date].push(task);
        return acc;
      }, {});

      const hasMoreThanTwoTasks = Object.values(tasksByDate).some(
        (tasks) => tasks.length > 2
      );
      setShowButton(hasMoreThanTwoTasks);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const changeStatus = React.useCallback(
    async (status, id) => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/api/v1/changestatus/changesubtaskstatus?status=${status}&id=${id}&userid=${Cookies.get(
            "userid"
          )}`
        );
        if (response.data.message == "success") {
          toast.success("Status Changed");
          fetchData();
          // window.location.href = "/manage-tasks";
        }
      } catch (error) {
        console.log(error);
      }
    },
    [fetchData]
  );

  const DeleteTask = React.useCallback(
    async (id) => {
      if (window.confirm("Are you sure you want to delete?")) {
        try {
          const response = await axios.get(
            `${
              import.meta.env.VITE_API_URL
            }/api/v1/deletetask/deletesubtask?taskid=${id}`
          );
          if (response.data.message == "success") {
            toast.success("Task Deleted");
            fetchData();
          }
        } catch (error) {
          console.log(error);
        }
      }
    },
    [fetchData]
  );

  const handleEdit = React.useCallback((item) => {
    // event.preventDefault()
    setId(item.subtaskId);
    setTaskname(item.name);
    setMode(item.mood);
    setpriority(item.priority);
    setDate(item.date);
    setOpenModal(true);
  }, []);

  const handleTaskNameChange = (e) => {
    setTaskname(e.target.value);
  };

  const handleMoodChange = (value) => {
    setMode(value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  //   const handleSubmit = async () => {
  //     const response = await axios.get(
  //       `${
  //         import.meta.env.VITE_API_URL
  //       }/api/v1/updatetask/updatesubtask?name=${taskname}&mood=${mood}&date=${date}&id=${id}&priority=${priority}`
  //     );
  //     if (response.data.message == "success") {
  //       toast.success("Task updated");
  //       fetchData();
  //     }
  //   };

  const handleSubmit = async (values) => {
    console.log("These are the values:", values);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/updatetask/updatesubtask`,
        {
          params: {
            id,
            name: values.taskName,
            mood: values.mood,
            date: values.dueDate,
            priority: values.priority,
          },
        }
      );

      if (response.data.message === "success") {
        toast.success("Task updated");
        fetchData();
        setOpenModal(false); // Close the modal after successful submission
      }
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    }
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const manageTasks = React.useCallback(async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/updatetask/managetask?id=${Cookies.get("userid")}`
      );
      if (response.data.message === "success") {
        toast.success("Tasks managed successfully");
        fetchData();
      }
    } catch (error) {
      console.error(error);
      toast.error("Error managing tasks");
    }
  }, [fetchData]);

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

  const columns = React.useMemo(
    () => [
      {
        Header: "Task Name",
        accessor: "name",
      },
      {
        Header: "Mood",
        accessor: "mood",
        Cell: ({ cell: { value } }) => (
          <span
            style={{ display: "flex", alignItems: "center", color: "white" }}
          >
            {value}
            <span style={{ marginLeft: "8px" }}>
              <MoodIcon mood={value} />
            </span>
          </span>
        ),
      },

      {
        Header: "Priority",
        accessor: "priority",
        Cell: ({ cell: { value } }) => (
          <span
            style={{ display: "flex", alignItems: "center", color: "white" }}
          >
            {value}
            <span style={{ marginLeft: "8px" }}></span>
          </span>
        ),
      },
      {
        Header: "Due Date",
        accessor: "date",
        Cell: ({ cell: { value } }) => (
          <span style={{ color: "white" }}>{formatDate(value)}</span>
        ),
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row: { original } }) => (
          <select
            value={original.status}
            onChange={(e) => changeStatus(e.target.value, original.subtaskId)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        ),
      },
      {
        Header: "Manage Tasks",
        accessor: "manageTasks",
        Cell: () => <Link to="/manage-tasks">Go to</Link>,
      },

      {
        Header: "Edit",
        accessor: "edit",
        Cell: ({ row: { original } }) => (
          <Link
            to="#"
            onClick={(e) => {
              e.preventDefault(); // Prevent URL change
              handleEdit(original);
            }}
          >
            Edit
          </Link>
        ),
      },
      {
        Header: "Delete",
        accessor: "delete",
        Cell: ({ row: { original } }) => (
          <Link to="" onClick={() => DeleteTask(original.subtaskId)}>
            Delete
          </Link>
        ),
      },
    ],
    [
      handleEdit,
      setShowAddNotes,
      setShowInvite,
      manageTasks,
      changeStatus,
      DeleteTask,
    ]
  );





  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data: list }, useSortBy);

  const handleDrop = (e, dropIndex) => {
    const dragIndex = parseInt(e.dataTransfer.getData("index"));
    const draggedItem = list[dragIndex];

    const newItems = list.filter((_, index) => index !== dragIndex);
    newItems.splice(dropIndex, 0, draggedItem);

    setList(
      newItems.map((item) => {
        if (item.id != null) {
          return {
            ...item,
            order: newItems.indexOf(item),
          };
        }
        return item;
      })
    );

    handleDragEnd();
  };
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("index", index.toString());
    setDraggedIndex(index);
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDropIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDropIndex(null);
  };

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const [filteredRows, setfilteredrows] = useState(rows);


  const allOriginals = rows.map(element => element.original);


  console.log(allOriginals,"originals");
  useEffect(() => {
    setfilteredrows(rows);
    setfilteredrows(rows.filter((item)=>item.original.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())))
  }, [searchQuery, list]);


  return (
    <div className="set-padding myShadow h-full ">
      <h3 className="font-medium sm-heading text-xl mb-6">{title}</h3>

      <div className="flex justify-end items-center mb-4 w-full px-4">
        <div className="flex items-center justify-end w-1/3 ">
        <input
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="border w-full border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="relative overflow-x-auto tableScroll snap-x">
        <table
          {...getTableProps()}
          className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 snap-center"
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            {headerGroups.map((headerGroup, index) => (
              <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  <th
                    key={index}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-6 py-3"
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody {...getTableBodyProps()}>
            {filteredRows.map((row, index) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  key={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragEnd={handleDragEnd}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`min-w-full bg-white border-b dark:border-gray-700 cursor-move ${
                    draggedIndex === index ? "opacity-50" : ""
                  } ${dropIndex === index ? "opacity-10" : ""} transition-all`}
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showInvite && (
        <div>
          <Modal
            title="Invite User"
            visible={showInvite}
            onOk={handleSubmit}
            onCancel={() => setShowInvite(false)}
          >
            <Form layout="vertical" name="inviteForm" onFinish={handleSubmit}>
              <Form.Item
                name="users"
                label="Users"
                rules={[{ required: true, message: "Please select the user!" }]}
              >
                <Select placeholder="Select the user">
                  {users?.map((item, index) => (
                    <Option key={index} value={item.name}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      )}
      {showAddNotes && (
        <div>
          <Modal
            title="Add Notes"
            visible={showAddNotes}
            onOk={handleSubmit}
            onCancel={() => setShowAddNotes(false)}
          >
            <Form layout="vertical" name="notesForm" onFinish={handleSubmit}>
              <Form.Item
                name="note"
                label="Note"
                rules={[{ required: true, message: "Please input the note!" }]}
              >
                <TextArea rows={8} />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      )}
      {showButton && (
        // <div>
        //   <button
        //     className="bg-blue-500 mt-4 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
        //     onClick={() => manageTasks(date)}
        //     type="button"
        //   >
        //     Manage Tasks
        //   </button>
        // </div>

        <></>
      )}
      <Modal
        title="Edit Task"
        visible={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null} // Remove default footer if you are handling it manually
      >
        <Form
          layout="vertical"
          name="taskForm"
          initialValues={{
            taskName: taskname,
            mood: mood,
            dueDate: date,

            // priority:priority,
            // recurringType:recurringType
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="taskName"
            label="Task Name"
            rules={[{ required: true, message: "Please input the task name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="mood"
            label="Mood"
            rules={[{ required: true, message: "Please select a mood!" }]}
          >
            <Select placeholder="Select your mood regarding the task">
              <Option value="Happy">Happy</Option>
              <Option value="Sad">Sad</Option>
              <Option value="Angry">Angry</Option>
              <Option value="Hopeful">Hopeful</Option>
              <Option value="Disappointed">Disappointed</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="priority"
            label="Priority"
            rules={[{ required: true, message: "Please select a priority!" }]}
          >
            <Select placeholder="Select priority">
              <Option value="High">
                High
                <HeartFilled style={{ color: "#f44336", marginLeft: "8px" }} />
              </Option>
              <Option value="Medium">
                Medium
                <CheckOutlined
                  style={{ color: "#ff9800", marginLeft: "8px" }}
                />
              </Option>
              <Option value="Low">
                Low
                <DislikeFilled
                  style={{ color: "#64dd17", marginLeft: "8px" }}
                />
              </Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="dueDate"
            label="Due Date"
            rules={[{ required: true, message: "Please select the due date!" }]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Toaster />
    </div>
  );
};

export default SubTasklist;
