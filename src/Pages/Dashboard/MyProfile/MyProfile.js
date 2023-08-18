import React, { useEffect, useRef, useState } from 'react';
import './MyProfile.css';
import auth from '../../../firebase.init';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import Sidebar from '../Sidebar/Sidebar';
import { useAuthState, useUpdatePassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { Button, Modal } from 'react-bootstrap';
import { FaRegEdit } from 'react-icons/fa';
import Loading from '../../Shared/Loading/Loading';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';

const MyProfile = () => {
    const [user] = useAuthState(auth);
    const [updatePassword, passwordUpdating, updatePasswordError] = useUpdatePassword(auth);
    const [updateProfile, profileUpdating, updateProfileError] = useUpdateProfile(auth);
    const [modalShow, setModalShow] = useState(false);
    const [profileData, setProfileData] = useState([]);

    // update profile 
    const imageRef = useRef('');
    const addressRef = useRef('');
    const phoneNumberRef = useRef('');
    const handleUpdateProfile = async (event) => {
        event.preventDefault();
        const name = user.displayName;
        const email = user?.email;
        const profilePicture = imageRef.current.value;
        const address = addressRef.current.value;
        const phoneNumber = phoneNumberRef.current.value;
        await updateProfile({ displayName: name, photoURL: profilePicture });

        const profileInfo = {
            name: name,
            email: email,
            address: address,
            phoneNumber: phoneNumber,
            image: profilePicture
        }

        fetch(`http://localhost:5000/user/${email}`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(profileInfo)
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem("accessToken");
                }
                return res.json();
            })
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success("Profile updated successfully");
                } else {
                    toast.error("Profile was not successfully updated");
                }
            })
    }

    // load profile data
    useEffect(() => {
        fetch(`http://localhost:5000/user/${user?.email}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    signOut(auth);
                    localStorage.removeItem("accessToken");
                }
                return res.json();
            })
            .then(data => setProfileData(data))
    }, [user, profileData]);

    // update password 
    const newPasswordRef = useRef('');
    const confirmNewPasswordRef = useRef('');
    const handleUpdatePassword = async (event) => {
        event.preventDefault();
        const newPassword = newPasswordRef.current.value;
        const confirmNewPassword = confirmNewPasswordRef.current.value;
        if (newPassword === confirmNewPassword) {
            const success = await updatePassword(confirmNewPassword);
            if (success === undefined) {
                toast.info(`Password updated successfully`);
            }
        } else {
            toast.error("Passwords did not match. Try again.");
        }
        event.target.reset();
    }


    if (profileUpdating || passwordUpdating) {
        return <Loading></Loading>;
    };

    // update profile error 
    let error = '';
    if (updateProfileError) {
        error = <div><p className='text-danger'> {updateProfileError?.message}</p></div>
    };

    // update password error 
    let passwordError = '';
    if (updatePasswordError) {
        passwordError = <div><p className='text-danger'> {updatePasswordError?.message}</p></div>
    }

    return (
        <div className='common-styles'>
            <PageTitle title="My Profile"></PageTitle>
            <div className='d-flex align-items-center'>
                <Sidebar />
                <h2 className='title-margin'>My Profile</h2>
            </div>

            <div className='my-profile-container'>
                {/* profile info */}
                <div className='shadow-lg p-2 rounded-3 profile-card w-100'>
                    <div className='edit-profile-button'>
                        <Button variant="outline-dark" onClick={() => setModalShow(true)}><FaRegEdit className='me-1 mb-1' />Edit</Button>
                    </div>
                    {/* image */}
                    <div className='profile-picture'>
                        <img className='img-fluid shadow-sm img-thumbnail' src={user.photoURL} alt="" />
                    </div>

                    <p>Name: {user.displayName}</p>
                    <p>Email: {user.email}</p>
                    <p>Phone Number: {profileData[0]?.phoneNumber}</p>
                    <p>Address: {profileData[0]?.address}</p>
                </div>

                {/* change password */}
                <form onSubmit={handleUpdatePassword} className='border border-2 border-primary d-flex flex-column justify-content-center align-items-center px-3'>
                    <h3 className='text-center'>Update Password</h3>
                    {/* new password */}
                    <div className="form-floating my-3 w-100">
                        <input ref={newPasswordRef} type="password" className="form-control" id="newPassword" placeholder="New Password" required />
                        <label htmlFor="newPassword">New Password</label>
                    </div>

                    {/*confirm new password */}
                    <div className="form-floating w-100">
                        <input ref={confirmNewPasswordRef} type="password" className="form-control" id="confirmNewPassword" placeholder=" Confirm New Password" required />
                        <label htmlFor="confirmNewPassword">Confirm New Password</label>
                    </div>
                    <Button className='my-3 px-4' type='submit' variant="outline-dark">Update</Button>
                    {passwordError}
                </form>
            </div>

            {/* modal */}
            <div>
                <Modal size="lg" backdrop="static" keyboard={false} show={modalShow} onHide={() => setModalShow(false)} aria-labelledby="update-profile-modal">
                    <Modal.Header closeButton>
                        <Modal.Title id="update-profile-modal">
                            Update Profile
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <form onSubmit={handleUpdateProfile}>
                            {/* name */}
                            <div className="form-floating">
                                <input value={user.displayName} type="text" className="form-control" id="floatingInput" placeholder="Name" readOnly />
                                <label htmlFor="floatingInput">Name</label>
                            </div>

                            {/* image URL */}
                            <div className="form-floating my-3">
                                <input ref={imageRef} type="text" className="form-control" id="floatingInput" placeholder="Image URL" required />
                                <label htmlFor="floatingInput">Image URL</label>
                            </div>

                            {/* email */}
                            <div className="form-floating">
                                <input value={user.email} type="email" className="form-control" id="floatingInput" placeholder="Email" readOnly />
                                <label htmlFor="floatingInput">Email Address</label>
                            </div>

                            {/* Phone Number*/}
                            <div className="form-floating my-3">
                                <input ref={phoneNumberRef} type="text" className="form-control" id="floatingInput" placeholder="Phone Number" required />
                                <label htmlFor="floatingInput">Phone Number</label>
                            </div>

                            {/* Address */}
                            <div className="form-floating">
                                <input ref={addressRef} type="text" className="form-control" id="floatingInput" placeholder="Address" required />
                                <label htmlFor="floatingInput">Address</label>
                            </div>

                            <Button className='my-3' variant="outline-dark" type="submit">
                                Update
                            </Button>

                            {error}
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
};

export default MyProfile;