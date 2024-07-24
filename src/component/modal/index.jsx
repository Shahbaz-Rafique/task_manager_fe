import React, { useState } from "react";
import { Modal, Form, Input, DatePicker, Select } from "antd";
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

const { Option } = Select;

const TaskModal = ({ isModalVisible, handleOk, handleCancel, form ,issubtask}) => {
  const [isRecurring, setIsRecurring] = useState(false);

  return (
    <Modal
      title="Add Task"
      visible={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical" name="taskForm">
        <Form.Item
          name="taskName"
          label="Task Name"
          rules={[{ required: true, message: "Please input the task name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="priority"
          label="Priority"
          rules={[{ required: true, message: "Please select a priority!" }]}
        >
          <Select placeholder="Select priority" style={{ width: "100%" }}>
            <Option value="High">
              High
              <HeartFilled style={{ color: "#f44336", marginLeft: "8px" }} />
            </Option>
            <Option value="Medium">
              Medium
              <CheckOutlined style={{ color: "#ff9800", marginLeft: "8px" }} />
            </Option>
            <Option value="Low">
              Low
              <DislikeFilled style={{ color: "#64dd17", marginLeft: "8px" }} />
            </Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="mood"
          label="Mood"
          rules={[{ required: true, message: "Please select a mood!" }]}
        >
          <Select placeholder="Select mood" style={{ width: "100%" }}>
            <Option value="Happy">
              Happy
              <SmileFilled style={{ color: "#64dd17", marginLeft: "8px" }} />
            </Option>
            <Option value="Sad">
              Sad
              <FrownFilled style={{ color: "#ff1744", marginLeft: "8px" }} />
            </Option>
            <Option value="Angry">
              Angry
              <MehOutlined style={{ color: "#f44336", marginLeft: "8px" }} />
            </Option>
            <Option value="Excited">
              Excited
              <LikeFilled style={{ color: "#2979ff", marginLeft: "8px" }} />
            </Option>
            <Option value="Annoyed">
              Annoyed
              <MehFilled style={{ color: "#ff6d00", marginLeft: "8px" }} />
            </Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="dueDate"
          label="Due Date"
          rules={[{ required: true, message: "Please select the due date!" }]}
        >
          {/* <DatePicker style={{ width: '100%' }} /> */}

          <input
            style={{ width: "100%" }}
            className="datetimeinput"
            type="datetime-local"
          />
        </Form.Item>



      {
      issubtask===false?
        <Form.Item name="isRecurring" label="Is this task recurring?">
          <input
            type="checkbox"
            onChange={(e) => setIsRecurring(e.target.checked)}
          />
        </Form.Item>:''
      }


        {isRecurring && (
          <Form.Item
            name="recurringType"
            label="Recurring Type"
            rules={[
              { required: true, message: "Please select the recurring type!" },
            ]}
          >
            <Select
    
              placeholder="Select recurring type"
              style={{ width: "100%" }}
            >
              <Option value="Weekly">Weekly</Option>
              <Option value="Monthly">Monthly</Option>
            </Select>
          </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

export default TaskModal;
