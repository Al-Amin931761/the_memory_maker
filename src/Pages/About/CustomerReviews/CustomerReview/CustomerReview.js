import { useState } from "react";
import "./CustomerReview.css";
import { StarPicker } from "react-star-picker";
import { BiSolidEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import auth from "../../../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReusableModal from "../../../../components/ReusableModal";
import Form from "../../../../components/reusableForm/Form";
import Textarea from "../../../../components/reusableForm/Textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addAndUpdateReviewSchema } from "../../../../components/reusableForm/Validation";
import FormSubmit from "../../../../components/reusableForm/FormSubmit";
import { Button } from "react-bootstrap";

const CustomerReview = ({ data }) => {
  const [user] = useAuthState(auth);
  const { name, rating, review, today, email, _id } = data;
  const [reviewId, setReviewId] = useState("");
  const navigate = useNavigate("");
  // update modal
  const [showReviewUpdateModal, setShowReviewUpdateModal] = useState(false);
  // delete modal
  const [showReviewDeleteModal, setShowReviewDeleteModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(addAndUpdateReviewSchema) });

  // edit and delete icon
  let updateReviewIcon;
  let deleteReviewIcon;
  if (email === user?.email) {
    updateReviewIcon = (
      <span className="me-2" onClick={() => setShowReviewUpdateModal(true)}>
        <button
          onClick={() => setReviewId(_id)}
          className="btn btn-outline-dark"
        >
          <BiSolidEdit className="fs-3" />
        </button>
      </span>
    );

    deleteReviewIcon = (
      <span onClick={() => setShowReviewDeleteModal(true)}>
        <button
          onClick={() => setReviewId(_id)}
          className="btn btn-outline-danger"
        >
          <AiFillDelete className="fs-3" />
        </button>
      </span>
    );
  }

  // update review
  const handleUpdateReview = (review) => {
    if (reviewId) {
      fetch(`https://the-memory-maker-server.vercel.app/review/${reviewId}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(review),
      })
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            signOut(auth);
            localStorage.removeItem("accessToken");
            navigate("/login");
          }
          return res.json();
        })
        .then((data) => {
          if (data?.modifiedCount > 0) {
            toast.success("Review updated successfully");
            reset();
            setShowReviewUpdateModal(false);
          }
        });
    }
  };

  // delete review
  const handleDeleteReview = () => {
    fetch(`https://the-memory-maker-server.vercel.app/review/${reviewId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          signOut(auth);
          localStorage.removeItem("accessToken");
          navigate("/login");
        }
        return res.json();
      })
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success(`Your review has been successfully deleted`);
        }
      });
  };

  return (
    <div data-aos="fade-down" data-aos-duration="2000">
      <div className="border border-2 rounded p-2 review common-hover-effect customer-review-container">
        <p className="second-font fs-3 text-center m-0">{name}</p>

        <StarPicker
          value={rating}
          halfStars
          size={40}
          className="text-center"
        />

        <p className="m-0">{review}</p>
        <p className="text-end m-0">{today}</p>
        <div className="update-and-delete-review-button">
          {updateReviewIcon}
          {deleteReviewIcon}
        </div>
      </div>

      {/* update review modal */}
      <ReusableModal
        modalShow={showReviewUpdateModal}
        setModalShow={setShowReviewUpdateModal}
        modalTitle="Update Review"
        modalBody={
          <Form onSubmit={handleSubmit(handleUpdateReview)}>
            <Textarea
              name="review"
              register={register("review")}
              placeholder="Review content"
              errors={errors}
            />
            <FormSubmit variant="outline-dark">Update</FormSubmit>
          </Form>
        }
      />

      {/* delete review modal */}
      <ReusableModal
        modalShow={showReviewDeleteModal}
        setModalShow={setShowReviewDeleteModal}
        modalTitle="Delete Review"
        modalBody={
          <div>
            <p>Are you sure to delete your review?</p>
            <div className="d-flex justify-content-end">
              <Button
                variant="outline-dark"
                onClick={() => setShowReviewDeleteModal(false)}
                className="me-2"
              >
                Close
              </Button>
              <Button variant="outline-danger" onClick={handleDeleteReview}>
                Delete
              </Button>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default CustomerReview;
