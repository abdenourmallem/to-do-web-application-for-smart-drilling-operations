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

const TaskList = ({ tasks ,fetchTasks}: TaskProps) => {



    return (
        <ul className="list-group">
            {tasks.map((task) => (
                <TaskItem key={task.id} id={task.id} title={task.title} description={task.description} completed={task.completed} fetchTasks={fetchTasks} />))}
        </ul>)
}

export default TaskList
