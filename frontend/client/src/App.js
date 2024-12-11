import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTask from './AddTask';

function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/tasks');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const removeTask = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/tasks/${id}`);
            fetchTasks(); // Refresh tasks after deletion
        } catch (error) {
            console.error('Error removing task:', error);
        }
    };

    const completeTask = async (id) => {
        try {
            await axios.put(`http://localhost:5000/api/tasks/${id}`);
            fetchTasks(); // Refresh tasks after marking as complete
        } catch (error) {
            console.error('Error completing task:', error);
        }
    };

    return (
        <div>
            <h1>To-Do List</h1>
            <AddTask fetchTasks={fetchTasks} />
            <ul>
                {tasks.map(task => (
                    <li key={task._id}>
                        {task.title} - {task.completed ? 'Completed' : 'Not Completed'}
                        <button onClick={() => completeTask(task._id)}>Complete</button>
                        <button onClick={() => removeTask(task._id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;


