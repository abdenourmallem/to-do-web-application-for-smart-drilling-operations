'use client';
// @ts-ignore: allow importing CSS without type declarations
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import TaskList from './TaskList';
import TaskModal from './TaskModal';
import axios from 'axios';

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}


const TaskForm = () => {
    const [showModal, setShowModal] = useState(false);
    const [tasks, setTasks] = useState<Task[]>([]);



    const fetchTasks = async () => {
        try {
            const res = await axios.get("http://127.0.0.1:8000/tasks");
            setTasks(res.data);

            console.log("tasks data: " + res.data);
            console.log("tasks task type: " + typeof tasks);
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
            <h1>My Tasks</h1>
            <TaskList tasks={tasks} fetchTasks={fetchTasks} />
            <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
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
