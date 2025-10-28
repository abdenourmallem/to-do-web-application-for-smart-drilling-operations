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
                <div className="modal-content" style={{
                    border: 'none',
                    borderRadius: '24px',
                    padding: '40px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                }}>
                    <div className="modal-header" style={{
                        border: 'none',
                        padding: '0 0 32px 0'
                    }}>
                        <h5 className="modal-title" style={{
                            fontSize: '28px',
                            fontWeight: '600',
                            color: '#1a1a1a',
                            margin: 0
                        }}>
                            Add New Task
                        </h5>
                        <button
                            className="btn-close"
                            onClick={onClose}
                            style={{
                                fontSize: '20px',
                                opacity: 0.5
                            }}
                        ></button>
                    </div>
                    <div className="modal-body" style={{ padding: '0 0 32px 0' }}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter task name"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            style={{
                                borderRadius: '50px',
                                padding: '16px 24px',
                                border: '1px solid #e0e0e0',
                                fontSize: '16px',
                                backgroundColor: '#fafafa'
                            }}
                        />
                    </div>
                    <div className="modal-footer" style={{
                        border: 'none',
                        padding: 0,
                        gap: '12px'
                    }}>
                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                            style={{
                                borderRadius: '50px',
                                padding: '12px 32px',
                                border: 'none',
                                backgroundColor: '#f0f0f0',
                                color: '#666',
                                fontWeight: '500'
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-primary"
                            onClick={handleSubmit}
                            style={{
                                borderRadius: '50px',
                                padding: '12px 32px',
                                border: 'none',
                                backgroundColor: '#0d6efd',
                                fontWeight: '500'
                            }}
                        >
                            Add Task
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
