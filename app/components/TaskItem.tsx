"use client";
import axios from 'axios';
// @ts-ignore: allow importing CSS without type declarations
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useRef, useState } from 'react'
import EditTaskPage from './editTaskPage';
interface TaskItemProps {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    fetchTasks: () => void;
}
function TaskItem({ title, id, description, completed, fetchTasks
}: TaskItemProps) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const menuRef = useRef<HTMLDivElement | null>(null);
    const [showEditModal, setShowEditModal] = useState(false);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuVisible(false);
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    // Show menu on right click
    const handleAuxClick = (e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
        console.log("right click detected");
        document.querySelectorAll(".custom-context-menu").forEach((el) => {
            (el as HTMLElement).style.display = "none";
        });
        setMenuPosition({ x: e.pageX, y: e.pageY });
        setMenuVisible(true);
    };

    // Delete task
    const handleDelete = async () => {
        try {
            await axios.delete(`http://127.0.0.1:8000/tasks/${id}`);
            setMenuVisible(false);
            fetchTasks();
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    };

    // Edit task
    const handleEdit = async (newDesc: string) => {
        if (!newDesc) return;
        try {
            await axios.put(`http://127.0.0.1:8000/tasks/${id}`, {
                description: newDesc,
                completed,
            });
            setMenuVisible(false);
            fetchTasks();
        } catch (err) {
            console.error("Error editing task:", err);
        }
    };

    return (
        <>
            <li className="list-group-item" key={id

            } onClick={() => SelectItem(id
                , title)} onContextMenu={(e) => handleAuxClick(e)} style={{ cursor: "context-menu" }}>
                <input className="form-check-input me-1" type="checkbox" ></input>
                <label className="form-check-label" htmlFor="firstCheckbox">{description}</label>
            </li>
            {menuVisible && (
                <div
                    ref={menuRef}
                    className="custom-context-menu position-absolute bg-white border rounded shadow-sm"
                    style={{
                        top: menuPosition.y,
                        left: menuPosition.x,
                        zIndex: 1000,
                        padding: "0.5rem",
                    }}
                >
                    <button className="btn btn-sm btn-primary w-100 mb-1" onClick={() => setShowEditModal(true)}>
                        ✏️ Edit
                    </button>
                    <button className="btn btn-sm btn-danger w-100" onClick={handleDelete}>
                        🗑 Delete
                    </button>
                </div>

            )}
            <EditTaskPage showModal={showEditModal} onClose={() => setShowEditModal(false)}  handleEdit={handleEdit} />
        </>
    );
}

function SelectItem(id: number, title: string): void {
    console.log(title +
        + " selected");
}

export default TaskItem
