import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function HomeLink() {
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);

  // User's dashboard home
  return (
    <Link
      to={`/${user.role}/${user.id}`}
      className={`sc-crHmcD layWKW ${
        location.pathname === `/${user.role}/${user.id}` ? "active" : ""
      } `}
    >
      <i className="fa-solid fa-house-user fa-2xs"></i>
      <div className="sc-bqiRlB bfSpmb">Home</div>
    </Link>
  );
}
