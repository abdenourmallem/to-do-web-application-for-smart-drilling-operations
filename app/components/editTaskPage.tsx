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
            style={{ backgroundColor: "rgba(0,0,0,0.5)", fontFamily: "'Segoe UI' , sans-serif" }}

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
                            Edit Task
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
                            value={newDesc}
                            onChange={(e) => setNewDesc(e.target.value)}
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
                            className="btn btn-secondary cancel"
                            onClick={onClose}
                            style={{
                                borderRadius: '50px',
                                padding: '12px 32px',
                                border: '1px solid #e0e0e0',
                                backgroundColor: 'white',
                                color: '#ff6b6b',
                                fontWeight: '400',
                                fontSize: '17px'
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
                                backgroundColor: '#0ea5e9', // Sky blue like the template
                                fontWeight: '500'
                            }}
                        >
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default editTaskPage
