"use client";
// @ts-ignore: CSS module declaration missing for bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react'
import TaskItem from './TaskItem';
import axios from 'axios';

interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
}

interface TaskProps {
    tasks: Task[];
    fetchTasks: () => void;
}

const TaskList = ({ tasks, fetchTasks }: TaskProps) => {
    const [showdeleteButton, setShowDeleteButton] = useState(false);
    const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
    const toggleSelect = (taskId: number) => {
        console.log('hey');
        setSelectedTasks(prev =>
            prev.includes(taskId)
                ? prev.filter(id => id !== taskId)
                : [...prev, taskId]
        );
        if (selectedTasks.length <= 0) {
            useEffect
            setShowDeleteButton(false);
        } else {
            setShowDeleteButton(true);
        }
    };
    const handleDeleteSelected = async () => {
        if (selectedTasks.length === 0) return alert("No tasks selected!");

        try {
            await axios.post(`http://127.0.0.1:8000/tasks/delete-multiple`, {
                ids: selectedTasks,
            });
            // setTasks(tasks.filter(task => !selectedTasks.includes(task.id)));
            setSelectedTasks([]);
            fetchTasks();
        } catch (err) {
            console.error("Error deleting selected tasks:", err);
        }
    };
    return (<>

        <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Tasks</h2>{selectedTasks.length > 0 &&
                <button
                    onClick={handleDeleteSelected}
                    className="bg-red-500 text-white px-4 py-2 rounded opacity-65"
                >
                    Delete Selected
                </button>}</div>

        <ul className="list-group">
            {tasks.map((task) => (
                <TaskItem key={task.id} id={task.id} title={task.title} description={task.description} completed={task.completed} fetchTasks={fetchTasks} isSelected={selectedTasks.includes(task.id)}
                    onSelect={() => toggleSelect(task.id)} />))}
        </ul>
    </>);
}

export default TaskList;
