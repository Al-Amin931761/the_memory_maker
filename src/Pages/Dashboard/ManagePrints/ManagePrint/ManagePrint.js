import React, { useRef, useState } from 'react';
import { BiSolidEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Button, Modal } from 'react-bootstrap';
import { signOut } from 'firebase/auth';
import auth from '../../../../firebase.init';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ManagePrint = ({ data, index }) => {
    const { name, image, location, _id } = data;
    const [printId, setPrintId] = useState("");
    const navigate = useNavigate('');

    // edit print
    const [showEditModal, setShowEditModal] = useState(false);
    const editModalClose = () => setShowEditModal(false);
    const editModalShow = () => setShowEditModal(true);

    // edit button 
    const handleEditButton = (id) => {
        editModalShow();
        setPrintId(id);
    };

    // form 
    const imageRef = useRef("");
    const nameRef = useRef("");
    const locationRef = useRef("");
    const handleSubmit = event => {
        event.preventDefault();
        const image = imageRef.current.value;
        const name = nameRef.current.value;
        const location = locationRef.current.value;
        const updatedPrint = { image, name, location }

        fetch(`http://localhost:5000/allPrint/${printId}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(updatedPrint)
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem('accessToken');
                    navigate('/login');
                }
                return res.json();
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('Print data has been successfully edited')
                } else {
                    toast.error(`Print data was not edited successfully`);
                }
            })
        event.target.reset();

        setTimeout(() => {
            editModalClose();
        }, 5000);
    };

    // delete print 
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const deleteModalClose = () => setShowDeleteModal(false);
    const deleteModalShow = () => setShowDeleteModal(true);

    // delete button 
    const handleDeleteButton = (id) => {
        deleteModalShow();
        setPrintId(id);
    };

    // delete print 
    const handleDeletePrint = () => {
        fetch(`http://localhost:5000/allPrint/${printId}`, {
            method: "DELETE",
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem('accessToken');
                    navigate('/login');
                }
                return res.json();
            })
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success(`${name} has been successfully deleted`)
                }
            })
    }

    return (
        <>
            <tr>
                <td className='text-center px-4'>{index + 1}</td>
                <td className='text-center px-4'><img width={100} className='img-fluid' src={image} alt={name} /></td>
                <td className='text-center px-4'>{name}</td>
                <td className='text-center px-4'>{location}</td>
                <td className='text-center px-4'><button onClick={() => handleEditButton(_id)} className='btn btn-outline-dark'><BiSolidEdit className='fs-3' /></button></td>
                <td className='text-center px-4'><button onClick={() => handleDeleteButton(_id)} className='btn btn-outline-danger'><AiFillDelete className='fs-3' /></button></td>
            </tr>

            {/*edit modal */}
            <Modal show={showEditModal} onHide={editModalClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit}>
                        {/* image url */}
                        <div className="form-floating mb-3">
                            <input ref={imageRef} type="text" className="form-control" id="image-url" placeholder="Image URL" required />
                            <label htmlFor="image-url">Image URL</label>
                        </div>

                        {/* name */}
                        <div className="form-floating mb-3">
                            <input ref={nameRef} type="text" className="form-control" id="name" placeholder="Name" required />
                            <label htmlFor="name">Name</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input ref={locationRef} type="text" className="form-control" id="location" placeholder="Location" required />
                            <label htmlFor="location">Location</label>
                        </div>
                        <Button variant="outline-dark" type="submit">Edit </Button>
                    </form>
                </Modal.Body>
            </Modal>

            {/* delete modal */}
            <Modal show={showDeleteModal} onHide={deleteModalClose} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{name}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='fs-5'>Are you sure to delete <span className='text-danger'>{name}</span>?</Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={deleteModalClose}>Close</Button>
                    <Button variant="outline-danger" onClick={handleDeletePrint}>Delete</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ManagePrint;