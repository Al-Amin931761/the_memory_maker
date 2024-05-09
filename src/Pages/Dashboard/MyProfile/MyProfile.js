import { useEffect, useState } from "react";
import "./MyProfile.css";
import auth from "../../../firebase.init";
import Sidebar from "../../../components/shared/Sidebar/Sidebar";
import {
  useAuthState,
  useUpdatePassword,
  useUpdateProfile,
} from "react-firebase-hooks/auth";
import { Button } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import PageTitle from "../../../components/shared/PageTitle";
import Loading from "../../../components/Loading";
import Container from "../../../components/Container";
import SectionTitle from "../../../components/shared/SectionTitle";
import Form from "../../../components/reusableForm/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../components/reusableForm/Input";
import FormSubmit from "../../../components/reusableForm/FormSubmit";
import TogglePassword from "../../../components/reusableForm/TogglePassword";
import ReusableModal from "../../../components/ReusableModal";
import {
  updatePasswordSchema,
  updateProfileSchema,
} from "../../../components/reusableForm/Validation";

const MyProfile = () => {
  const [user] = useAuthState(auth);
  const [updatePassword, passwordUpdating, updatePasswordError] =
    useUpdatePassword(auth);
  const [updateProfile, profileUpdating, updateProfileError] =
    useUpdateProfile(auth);
  const [profileData, setProfileData] = useState([]);

  // update password
  const {
    register: registerUpdatePassword,
    handleSubmit: handleSubmitUpdatePassword,
    reset: resetUpdatePassword,
    formState: { errors: errorsUpdatePassword },
  } = useForm({ resolver: zodResolver(updatePasswordSchema) });

  // update profile
  const {
    register: registerUpdateProfile,
    formState: { errors: errorsUpdateProfile },
    handleSubmit: handleSubmitUpdateProfile,
    reset: resetUpdateProfileProfile,
  } = useForm({ resolver: zodResolver(updateProfileSchema) });

  const [showPassword, setShowPassword] = useState(false);
  const [showUpdateProfileModal, setShowUpdateProfileModal] = useState(false);

  // update profile
  const handleUpdateProfile = async (data) => {
    const name = user?.displayName;
    const email = user?.email;

    const profilePicture = data.imageURL;
    const address = data.address;
    const phoneNumber = data.phoneNumber;
    await updateProfile({ displayName: name, photoURL: profilePicture });

    const profileInfo = {
      name: name,
      email: email,
      address: address,
      phoneNumber: phoneNumber,
      image: profilePicture,
    };

    fetch(`https://the-memory-maker-server.vercel.app/user/${email}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(profileInfo),
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          signOut(auth);
          localStorage.removeItem("accessToken");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Profile updated successfully");
        } else {
          toast.error("Profile was not successfully updated");
        }
      });
    resetUpdateProfileProfile();
    setShowUpdateProfileModal(false);
  };

  // load profile data
  useEffect(() => {
    fetch(`https://the-memory-maker-server.vercel.app/user/${user?.email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          signOut(auth);
          localStorage.removeItem("accessToken");
        }
        return res.json();
      })
      .then((data) => setProfileData(data));
  }, [user, profileData]);

  // update password
  const handleUpdatePassword = async (data) => {
    if (data.newPassword === data.confirmNewPassword) {
      const success = await updatePassword(data.confirmNewPassword);
    } else {
      toast.error("Passwords did not match. Try again.");
    }

    // update password error
    if (updatePasswordError) {
      toast.error(updatePasswordError?.message);
    } else {
      toast.success(`Password updated successfully`);
    }
    resetUpdatePassword();
  };

  // loading
  if (profileUpdating || passwordUpdating) {
    return <Loading />;
  }

  // update profile error
  if (updateProfileError) {
    toast.info(updateProfileError?.message);
  }

  return (
    <Container>
      <PageTitle title="My Profile" />
      <div className="d-flex align-items-center">
        <Sidebar />

        <div className="w-100">
          <SectionTitle title="My Profile" />
        </div>
      </div>

      <div className="my-profile-container mb-5">
        {/* profile info */}
        <div
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-duration="1500"
          data-aos-easing="ease-in-sine"
          className="d-flex justify-content-center"
        >
          <div className="shadow-lg px-2 py-3 rounded-3 w-100 profile-card">
            <div className="edit-profile-button">
              <Button
                variant="outline-dark"
                onClick={() => setShowUpdateProfileModal(true)}
              >
                <FaRegEdit className="me-1 mb-1" />
                Update
              </Button>
            </div>
            {/* image */}
            <div className="profile-picture">
              <img
                className="img-fluid shadow-sm img-thumbnail"
                src={user.photoURL}
                alt=""
              />
            </div>

            <p>Name: {user.displayName}</p>
            <p>Email: {user.email}</p>
            <p>Phone Number: {profileData[0]?.phoneNumber}</p>
            <p>Address: {profileData[0]?.address}</p>
          </div>
        </div>

        {/* update password */}
        <div
          className="d-flex align-items-center w-100"
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-duration="1500"
          data-aos-easing="ease-in-sine"
        >
          <div className="w-100">
            <Form onSubmit={handleSubmitUpdatePassword(handleUpdatePassword)}>
              <Input
                register={registerUpdatePassword("newPassword")}
                name="newPassword"
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                errors={errorsUpdatePassword}
              />

              <Input
                register={registerUpdatePassword("confirmNewPassword")}
                name="confirmNewPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                errors={errorsUpdatePassword}
                className="mb-1"
              />

              <TogglePassword
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />

              <FormSubmit variant="outline-dark">Update</FormSubmit>
            </Form>
          </div>
        </div>
      </div>

      {/* update profile modal */}
      <ReusableModal
        size="lg"
        modalShow={showUpdateProfileModal}
        setModalShow={setShowUpdateProfileModal}
        modalTitle="Update Profile"
        modalBody={
          <Form onSubmit={handleSubmitUpdateProfile(handleUpdateProfile)}>
            {/* name */}
            <Input
              register={registerUpdateProfile("name")}
              name="name"
              type="text"
              placeholder="Name"
              value={user.displayName}
              disabled={true}
              errors={errorsUpdateProfile}
            />

            {/* image url */}
            <Input
              register={registerUpdateProfile("imageURL")}
              name="imageURL"
              type="text"
              placeholder="Image URL"
              errors={errorsUpdateProfile}
            />

            {/* email */}
            <Input
              register={registerUpdateProfile("email")}
              name="email"
              type="email"
              placeholder="Email"
              value={user.email}
              errors={errorsUpdateProfile}
              disabled={true}
            />

            {/* phone number */}
            <Input
              register={registerUpdateProfile("phoneNumber")}
              name="phoneNumber"
              type="text"
              placeholder="Phone Number"
              errors={errorsUpdateProfile}
            />

            {/* address */}
            <Input
              register={registerUpdateProfile("address")}
              name="address"
              type="text"
              placeholder="Address"
              errors={errorsUpdateProfile}
            />

            <FormSubmit variant="outline-dark">Update</FormSubmit>
          </Form>
        }
      />
    </Container>
  );
};

export default MyProfile;
