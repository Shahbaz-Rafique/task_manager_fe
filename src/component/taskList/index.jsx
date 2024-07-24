import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Modal, Form, Input, Select, Button } from "antd";
import {
  SmileFilled,
  MehFilled,
  LikeFilled,
  HeartFilled,
  FrownFilled,
  MehOutlined,
  CheckOutlined,
  DislikeFilled,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import Confetti from 'react-confetti';
import { useTable, useSortBy } from "react-table";

const { Option } = Select;

const Tasklist = ({ title }) => {
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [taskname, setTaskname] = useState("");
  const [mood, setMode] = useState("");
  const [date, setDate] = useState();
  const [id, setId] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [showAddNotes, setShowAddNotes] = useState(false);
  const [showInvite, setShowInvite] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dropIndex, setDropIndex] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    document.body.style.overflowX="hidden";
    fetchData();
    fetchUsersData();
  }, []);

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
        `${import.meta.env.VITE_API_URL}/api/v1/gettasks?id=${Cookies.get(
          "userid"
        )}`
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
          }/api/v1/changestatus?status=${status}&id=${id}&userid=${Cookies.get(
            "userid"
          )}`
        );
        if (response.data.message == "success") {
          toast.success("Status Changed");
          fetchData();
          if (status == "Completed") {
            setShowConfetti(true);
            setTimeout(() => {
              setShowConfetti(false);
            }, 5000);
          }
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
            `${import.meta.env.VITE_API_URL}/api/v1/deletetask?taskid=${id}`
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

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleEdit = React.useCallback((item) => {
    setId(item.taskId);
    setTaskname(item.name);
    setMode(item.mood);
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

  const handleSubmit = async (values) => {
    console.log("These are the values:", values);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/updatetask`,
        {
          params: {
            id,
            name: values.taskName,
            mood: values.mood,
            date: values.dueDate,
            recurringType: values.recurringType,
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

  const [taskdetails, settaskdetails] = useState();

  const handlesettingshowinvite = (taskdetails) => {
    console.log("TaskDetails", taskdetails);
    settaskdetails(taskdetails);

    setShowInvite(true);
  };

  const settingparameteraddingnote = (taskdetails) => {
    console.log("TaskDetails", taskdetails);
    settaskdetails(taskdetails);

    setShowAddNotes(true);
  };

  const [note, setNote] = useState(null);
  const handleAddNote = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/notes/addnote`,
        {
          userid: Cookies.get("userid"),
          taskId: taskdetails.taskId,
          note: note,
        }
      );

      if (response.data.message === "success") {
        toast.success("Note added successfully");
        fetchData();
      } else {
        toast.error("Failed to add note");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding note");
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
            onChange={(e) => changeStatus(e.target.value, original.taskId)}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        ),
      },
      {
        Header: "Manage Sub Tasks",
        accessor: "manageSubTasks",
        Cell: ({ row: { original } }) => (
          <Link to={`/manage-sub-tasks?id=${original.taskId}`}>Go to</Link>
        ),
      },
      {
        Header: "Add Notes",
        accessor: "addNotes",
        Cell: ({ row: { original } }) => (
          <span
            className="cursor-pointer hover:text-[#58b1ff]"
            onClick={() => settingparameteraddingnote(original)}
          >
            Add
          </span>
        ),
      },
      {
        Header: "View Notes",
        accessor: "viewNotes",
        Cell: ({ row: { original } }) => (
          <Link to={`/tasknotes/${original.taskId}`}>View</Link>
        ),
      },
      {
        Header: "Invite User",
        accessor: "inviteUser",
        Cell: ({ row: { original } }) => (
          <span
            className="cursor-pointer hover:text-[#58b1ff]"
            onClick={() => handlesettingshowinvite(original)}
          >
            Invite
          </span>
        ),
      },
      {
        Header: "Edit",
        accessor: "edit",
        Cell: ({ row: { original } }) => (
          <Link to="" onClick={() => handleEdit(original)}>
            Edit
          </Link>
        ),
      },
      {
        Header: "Delete",
        accessor: "delete",
        Cell: ({ row: { original } }) => (
          <Link to="" onClick={() => DeleteTask(original.taskId)}>
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

  const handleDrop = async (e, dropIndex) => {
    const dragIndex = parseInt(e.dataTransfer.getData("index"));
    const draggedItem = list[dragIndex];

    const newItems = list.filter((_, index) => index !== dragIndex);
    newItems.splice(dropIndex, 0, draggedItem);

    const updatedItems = newItems.map((item, index) => ({
      ...item,
      order: index,
    }));

    setList(updatedItems);

    handleDragEnd();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/updatetask/updateorder`,
        {
          tasks: updatedItems.map((item) => ({
            taskId: item.taskId,
            userid: item.userid,
            name: item.name,
            mood: item.mood,
            date: item.date,
            status: item.status,
            points: item.points,
            priority: item.priority,
            recurring: item.recurring,
            order: item.order,
          })),
        }
      );

      if (response.data.message === "success") {
        toast.success("Task order updated successfully!");
      } else {
        toast.error("Failed to update task order.");
      }
    } catch (error) {
      console.error(
        "Error updating task order:",
        error.response ? error.response.data : error.message
      );
      toast.error("Error updating task order.");
    }
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

  const [recieverId, setrecieverId] = useState();

  const handlesentinvite = () => {
    // API call to send the selected user to the backend
    axios
      .post(
        `${
          import.meta.env.VITE_API_URL
        }/api/v1/invitation/addinvitation?senderId=${Cookies.get(
          "userid"
        )}&recieverId=${recieverId}&taskId=${taskdetails.taskId}`,
        {}
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success("User invited successfully!");
          // form.resetFields();
          setShowInvite(false);
        }
      })
      .catch((error) => {
        console.error("There was an error inviting the user:", error);
        toast.error("Failed to invite user. Please try again.");
      });
  };

  const handleSelectrecieveruser = (value) => {
    setrecieverId(value);
    console.log("Selected user:", value);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Update filteredRows whenever list or searchQuery changes

  const [filteredRows, setfilteredrows] = useState(rows);


  const allOriginals = rows.map(element => element.original);

  useEffect(() => {
    setfilteredrows(rows);
    setfilteredrows(rows.filter((item)=>item.original.name.toLowerCase().includes(searchQuery.toLowerCase())));
  }, [searchQuery, list]);

  return (
    <div className="set-padding myShadow h-full">
      {showConfetti && <Confetti /> }
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
            onOk={handlesentinvite}
            onCancel={() => setShowInvite(false)}
          >
            <Form
              layout="vertical"
              name="inviteForm"
              onFinish={handlesentinvite}
            >
              <Form.Item
                name="users"
                label="Users"
                rules={[{ required: true, message: "Please select the user!" }]}
              >
                <Select
                  onChange={handleSelectrecieveruser}
                  placeholder="Select the user"
                >
                  {users?.map((item, index) => {
                    return (
                      <Option key={index} value={item.Id}>
                        {item.name}
                      </Option>
                    );
                  })}
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
            onOk={handleAddNote}
            onCancel={() => setShowAddNotes(false)}
          >
            <Form layout="vertical" name="notesForm" onFinish={handleAddNote}>
              <Form.Item
                name="note"
                label="Note"
                rules={[{ required: true, message: "Please input the note!" }]}
              >
                <TextArea
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                  rows={8}
                />
              </Form.Item>
            </Form>
          </Modal>
        </div>
      )}
      {showButton && (
        <div>
          <button
            className="bg-blue-500 mt-4 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
            onClick={() => manageTasks(date)}
            type="button"
          >
            Manage Tasks
          </button>
        </div>
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
            name="recurringType"
            label="Recurring Type"
            rules={[
              { required: true, message: "Please select the recurring type!" },
            ]}
          >
            <Select placeholder="Select recurring type">
              <Option value="Weekly">Weekly</Option>
              <Option value="Monthly">Monthly</Option>
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

export default Tasklist;
