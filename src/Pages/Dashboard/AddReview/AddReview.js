import { useState } from "react";
import "./AddReview.css";
import { StarPicker } from "react-star-picker";
import reviewImage from "../../../images/review.png";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import PageTitle from "../../../components/shared/PageTitle";
import Container from "../../../components/Container";
import SectionTitle from "../../../components/shared/SectionTitle";
import Form from "../../../components/reusableForm/Form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addAndUpdateReviewSchema } from "../../../components/reusableForm/Validation";
import Textarea from "../../../components/reusableForm/Textarea";
import FormSubmit from "../../../components/reusableForm/FormSubmit";
import Sidebar from "../../../components/shared/Sidebar/Sidebar";

const AddReview = () => {
  const [rating, setRating] = useState(null);
  const [user] = useAuthState(auth);

  // ratings
  const onChange = (value) => {
    setRating(value);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(addAndUpdateReviewSchema) });

  const handleAddReview = (data) => {
    // date
    const today = new Date();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August ",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[today.getMonth()];
    const year = today.getFullYear();
    const date = today.getDate();

    const review = {
      name: user?.displayName,
      email: user?.email,
      rating: rating,
      review: data.review,
      today: `${date} ${month} ${year}`,
    };

    fetch("https://the-memory-maker-server.vercel.app/addReview", {
      method: "POST",
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
        }
        return res.json();
      })
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Review submitted successfully");
        } else {
          toast.error("Review was not successfully submitted");
        }
      });
    setRating(null);
    reset();
  };

  return (
    <Container>
      <PageTitle title="Add Review" />
      <div className="d-flex align-items-center">
        <Sidebar />

        <div className="w-100">
          <SectionTitle title="Leave a Review" />
        </div>
      </div>

      <div className="review-container">
        {/* image */}
        <div
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-duration="1500"
          data-aos-easing="ease-in-sine"
        >
          <img className="img-fluid" src={reviewImage} alt="" />
        </div>

        {/* review */}
        <div
          className="w-100 d-flex flex-column justify-content-center"
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-duration="1500"
          data-aos-easing="ease-in-sine"
        >
          <div className=" d-flex flex-column">
            <div className="mb-3">
              <p className="mb-0 ms-2">Click stars to rate</p>
              <StarPicker
                onChange={onChange}
                value={rating}
                halfStars
                doubleTapResets={true}
                numberStars={5}
                size={60}
              />
            </div>

            <Form onSubmit={handleSubmit(handleAddReview)}>
              <Textarea
                name="review"
                register={register("review")}
                placeholder="Review content"
                errors={errors}
              />
              <FormSubmit
                disabled={!rating}
                variant={!rating ? "dark" : "outline-dark"}
              >
                add review
              </FormSubmit>
            </Form>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AddReview;
