import { useEffect, useState } from "react";
import "./CustomerReviews.css";
import { BsPeopleFill } from "react-icons/bs";
import CustomerReview from "./CustomerReview/CustomerReview";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import SectionTitle from "../../../components/shared/SectionTitle";
import LinkButton from "../../../components/LinkButton";

const CustomerReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [user] = useAuthState(auth);

  // load all reviews
  useEffect(() => {
    fetch("https://the-memory-maker-server.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [reviews]);

  return (
    <div>
      <SectionTitle
        title="Love from customers!"
        icon={<BsPeopleFill className="mb-1" />}
      />

      <div className="reviews">
        {reviews.map((data) => (
          <CustomerReview key={data._id} data={data} />
        ))}
      </div>

      {/* add review button */}
      {user?.email === "alamin931761@gmail.com" ? (
        ""
      ) : (
        <div className="d-flex justify-content-center mb-4">
          <LinkButton
            variant="outline-dark"
            to="/dashboard/addReview"
            name="Add review"
          />
        </div>
      )}
    </div>
  );
};

export default CustomerReviews;
