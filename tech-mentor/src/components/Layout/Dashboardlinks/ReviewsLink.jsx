import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function ReviewsLink() {
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);

  // become a mentor link
  return (
    <div>
      <Link
        className={`sc-crHmcD layWKW ${
          location.pathname === `/mentor/${user.id}/reviews` ? "active" : ""
        } `}
        to={`/mentor/${user.id}/reviews `}
      >
        <i class="fa-brands fa-squarespace"></i>
        <div className="sc-bqiRlB bfSpmb">Reviews</div>
      </Link>
    </div>
  );
}
