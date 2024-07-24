import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import '../../styling/date.css';

const CustomCalendar = () => {
  // State for storing selected dates
  const [selectedDates, setSelectedDates] = useState([]);
  // State for storing the currently displayed month
  const [displayedMonth, setDisplayedMonth] = useState(new Date());
  // State for storing the list of tasks fetched from the API
  const [list, setList] = useState([]);
  // State for storing tasks associated with selected dates
  const [selectedTasks, setSelectedTasks] = useState([]);

  // Calculate the start and end dates of the current month and the surrounding dates for calendar view
  const startOfMonth = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth(), 1);
  const endOfMonth = new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1, 0);
  const startDate = new Date(startOfMonth);
  startDate.setDate(startOfMonth.getDate() - startOfMonth.getDay());
  const endDate = new Date(endOfMonth);
  endDate.setDate(endOfMonth.getDate() + (6 - endOfMonth.getDay()));

  // Generate an array of dates for the current calendar view
  const dates = [];
  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Fetch tasks from the API
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/gettasks?id=${Cookies.get('userid')}`
      );
      setList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Update selected tasks based on the selected dates
  useEffect(() => {
    const filteredTasks = list.filter(task =>
      selectedDates.some(selectedDate =>
        new Date(task.date).toDateString() === selectedDate.toDateString()
      )
    );
    setSelectedTasks(filteredTasks);
  }, [selectedDates, list]);

  // Handle date click to select or deselect a date
  const handleDateClick = date => {
    const dateIndex = selectedDates.findIndex(
      selectedDate => selectedDate.toDateString() === date.toDateString()
    );
    if (dateIndex >= 0) {
      // Deselect the date if already selected
      const newSelectedDates = selectedDates.filter(
        selectedDate => selectedDate.toDateString() !== date.toDateString()
      );
      setSelectedDates(newSelectedDates);
    } else {
      // Select the new date
      setSelectedDates([...selectedDates, date]);
    }
  };

  // Handle moving to the previous month
  const handlePrevMonth = () => {
    setDisplayedMonth(
      new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() - 1, 1)
    );
  };

  // Handle moving to the next month
  const handleNextMonth = () => {
    setDisplayedMonth(
      new Date(displayedMonth.getFullYear(), displayedMonth.getMonth() + 1, 1)
    );
  };

  // Render the header with navigation buttons and current month/year display
  const renderHeader = () => {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    return (
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <span>
          {monthNames[displayedMonth.getMonth()]} {displayedMonth.getFullYear()}
        </span>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>
    );
  };

  // Render the days of the week header
  const renderDaysOfWeek = () => {
    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    return (
      <div className="calendar-days">
        {daysOfWeek.map(day => (
          <div key={day} className="calendar-day">
            {day}
          </div>
        ))}
      </div>
    );
  };

  // Render the calendar dates
  const renderDates = () => {
    return (
      <div className="calendar-dates">
        {dates.map(date => {
          const isCurrentMonth = date.getMonth() === displayedMonth.getMonth();
          const isSelected = selectedDates.some(
            selectedDate => selectedDate.toDateString() === date.toDateString()
          );
          return (
            <div
              key={date}
              className={`calendar-date ${
                isCurrentMonth ? '' : 'disabled'
              } ${isSelected ? 'selected' : ''}`}
              onClick={() => handleDateClick(date)}
              tabIndex="0"
            >
              {date.getDate()}
            </div>
          );
        })}
      </div>
    );
  };

  // Render the tasks for the selected dates
  const renderSelectedTasks = () => {
    return (
      <div className="selected-tasks">
        <h2>Tasks for Selected Dates:</h2>
        {selectedTasks.length > 0 ? (
          selectedTasks.map(task => (
            <div key={task.taskId} className="task-card">
              <p>Name: {task.name}</p>
              <p className="task-date">Date: {new Date(task.date).toDateString()}</p>
            </div>
          ))
        ) : (
          <p>No tasks selected</p>
        )}
      </div>
    );
  };

  return (
    <div className="calendar-container myShadow">
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderDates()}
      {renderSelectedTasks()}
    </div>
  );
};

export default CustomCalendar;
