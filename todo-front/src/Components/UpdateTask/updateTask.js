import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import '../../App.css';
import { useParams } from 'react-router-dom';
import UpdateTodo from './updateService';
import { bodyStyle } from '../Css/Backround';

const EditTask = () => {
  const { taskId } = useParams();

  const [task, setTask] = useState({
    title: '',
    description: '',
    due_date: '',
    due_time: '',
    completed: true,
  });

  useEffect(() => {
    const jwtToken = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${jwtToken}`,
      'Content-Type': 'application/json',
    };
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3300/todos/${taskId}`, {
          method: 'GET',
          headers: headers,
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = (await response.json()).data;
        if (
          'title' in data &&
          'description' in data &&
          'due_date' in data &&
          'due_time' in data &&
          'completed' in data
        ) {
          setTask(data);
        } else {
          console.error('Data from API does not have expected properties:', data);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, [taskId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setTask({
        ...task,
        [name]: checked,
      });
    } else {
      setTask({
        ...task,
        [name]: value,
      });
    }
  };
  let formattedDueDate = '';
  if (task.due_date) {
    try {
      formattedDueDate = format(parseISO(task.due_date), 'yyyy-MM-dd');
    } catch (error) {
      console.error('Error formatting due_date:', error);
      formattedDueDate = '';
    }
  }

  return (
    <div className="App">
      <h2 className='edit'>Edit Task</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Due Time</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="description"
                value={task.description}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="date"
                name="due_date"
                value={formattedDueDate}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="time"
                name="due_time"
                value={task.due_time}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="checkbox"
                name="completed"
                checked={task.completed}
                onChange={handleInputChange}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <br />
      <button onClick={() => UpdateTodo({ taskId: task.id, task: task })} className='button'>Update</button>
      <div style={bodyStyle}>
      </div>
    </div>
  );
};

export default EditTask;
