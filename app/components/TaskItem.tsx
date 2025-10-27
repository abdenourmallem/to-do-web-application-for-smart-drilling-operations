"use client";
import axios from 'axios';
// @ts-ignore: allow importing CSS without type declarations
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useRef, useState } from 'react'
import EditTaskPage from './editTaskPage';
import { FaTrash, FaPlus, FaEdit, FaCheck, } from 'react-icons/fa';
interface TaskItemProps {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    fetchTasks: () => void;
    onSelect: () => void;
    isSelected: boolean;
}
function TaskItem({ title, id, description, completed, fetchTasks, onSelect, isSelected
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
    const handleSetCompleted = async () => {
        try {
            await axios.put(`http://127.0.0.1:8000/tasks/${id}`, {
                description: description,
                completed: true,
            });
            setMenuVisible(false);
            fetchTasks();
        } catch (err) {
            console.error("Error deleting task:", err);
        }
    }
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
        if (!newDesc.trim()) return;
        console.log(newDesc);
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
            <li className={`list-group-item ${completed ? ' opacity-50 ' : ''}`} key={id

            } onClick={() => SelectItem(id
                , title)} onContextMenu={(e) => handleAuxClick(e)} style={{ cursor: "context-menu" }}>
                <input className="form-check-input me-1" type="checkbox" checked={isSelected}
                    onChange={onSelect}></input>
                <label className="form-check-label" htmlFor="firstCheckbox">{description}</label>
            </li>
            {(menuVisible) && (
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
                    {!completed && (<><button className="btn btn-sm border-t-cyan-50 w-100 mb-1" onClick={handleSetCompleted}>
                        <FaCheck className="inline-block mr-1" />
                        complete
                    </button>
                        <button className="btn btn-sm border-t-cyan-50 w-100 mb-1" onClick={() => setShowEditModal(true)}>
                            <FaEdit className="inline-block mr-1" />
                            Edit
                        </button></>)}
                    <button className="btn btn-sm btn-danger w-100 opacity-75" onClick={handleDelete}>
                        <FaTrash className="inline-block mr-1" />Delete
                    </button>

                </div>

            )}
            <EditTaskPage showModal={showEditModal} onClose={() => setShowEditModal(false)} handleEdit={handleEdit} />
        </>
    );
}

function SelectItem(id: number, title: string): void {
    console.log(title +
        + " selected");
}

export default TaskItem
