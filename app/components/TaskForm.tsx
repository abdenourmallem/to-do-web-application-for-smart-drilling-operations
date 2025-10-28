'use client';
// @ts-ignore: allow importing CSS without type declarations
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import TaskList from './TaskList';
import TaskModal from './TaskModal';
import axios from 'axios';
import { FaHome } from 'react-icons/fa';
import { DashBoard } from './DashBoard';
interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}



const TaskForm = () => {
    const [showModal, setShowModal] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);

    //this function fetch data to update the page correctly
    const fetchTasks = async () => {
        try {
            const res = await axios.get(`http://127.0.0.1:8000/tasks`);
            setTasks(res.data);
        } catch (err) {
            console.log("Error fetching tasks:");
            console.error(err);
        }
    };
    useEffect(() => {
        fetchTasks();
    }, []);
    return (
        <>

            <h1><FaHome className="inline-block mr-4 size-16"></FaHome>My To-Do List</h1>
            <TaskList tasks={tasks} fetchTasks={fetchTasks} />
            <button className="btn btn-primary mb-3 mt-20" onClick={() => setShowModal(true)} style={{
                borderRadius: '50px',
                padding: '12px 32px',
                border: 'none',
                backgroundColor: '#0ea5e9', // Sky blue like the template
                fontWeight: '500'
            }}>
                Add Task
            </button>
            <TaskModal
                showModal={showModal}
                onClose={() => setShowModal(false)}
                fetchTasks={fetchTasks
                }
            // onAdded={fetchTasks} 
            />
        </>
    )
}

export default TaskForm

