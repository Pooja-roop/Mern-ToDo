import React, { useState } from 'react';
import axios from 'axios';

const AddTask = ({ fetchTasks }) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        const taskData = {
            title: taskTitle,
            description: taskDescription,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/tasks', taskData);
            console.log('Response from server:', response.data); // Debugging line
            fetchTasks(); // Refresh tasks after adding
            setTaskTitle(''); // Clear input field after successful submission
            setTaskDescription(''); // Clear input field after successful submission
        } catch (error) {
            console.error('Error adding task:', error); // Log any errors
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={taskTitle} 
                onChange={(e) => setTaskTitle(e.target.value)} 
                placeholder="Task Title" 
                required 
            />
            <input 
                type="text" 
                value={taskDescription} 
                onChange={(e) => setTaskDescription(e.target.value)} 
                placeholder="Task Description" 
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default AddTask;



