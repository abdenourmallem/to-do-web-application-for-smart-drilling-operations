"use client";
import React, { useState } from "react";
import axios from "axios";
interface TaskModalProps {
    showModal: boolean;
    onClose: () => void;
    fetchTasks: () => void;
}

const TaskModal: React.FC<TaskModalProps> = ({ showModal, onClose, fetchTasks }) => {
    if (!showModal) return null;
    const [task, setTask] = React.useState("");

    // don't render if hidden

    const handleSubmit = () => {
        if (task.trim() === "") return;
        addTask(task);

        setTask("");
        onClose();
    };
    const addTask = async (task: string) => {
        try {
            const res = await axios.post(`http://127.0.0.1:8000/tasks`, { description: task, completed: false });
            fetchTasks();
        } catch (err) {
            console.error("Error adding task:", err);
        }
    }
    return (
        <div
            className="modal d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content p-3">
                    <div className="modal-header">
                        <h5 className="modal-title">Add New Task</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter task name"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                        />
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={handleSubmit}>
                            Add Task
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
