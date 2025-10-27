import axios from 'axios';
import React from 'react'

interface TaskModalProps {
    showModal: boolean;
    onClose: () => void;
    handleEdit: (desc: string) => void;

}

const editTaskPage: React.FC<TaskModalProps> = ({ showModal, onClose, handleEdit }) => {
    if (!showModal) return null;
    const [newDesc, setNewDesc] = React.useState("");
    const handleSubmit = () => {
        handleEdit(newDesc);
        onClose();
    };

    return (
        <div
            className="modal d-block"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content p-3">
                    <div className="modal-header">
                        <h5 className="modal-title">Edit Task</h5>
                        <button className="btn-close" onClick={onClose}></button>
                    </div>

                    <div className="modal-body">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter task name"
                            value={newDesc}
                            onChange={(e) => setNewDesc(e.target.value)}
                        />
                    </div>

                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                        <button className="btn btn-primary" onClick={handleSubmit}>
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default editTaskPage
