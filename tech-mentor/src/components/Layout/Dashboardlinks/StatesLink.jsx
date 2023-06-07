import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function StatesLink() {
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);

  // admin states link
  return (
    <Link
      to={`/admin/${user.id}/states`}
      className={`sc-crHmcD layWKW ${
        location.pathname === `/admin/${user.id}/states` ? "active" : ""
      } `}
    >
      <i className="fa-solid fa-flag-usa"></i>{" "}
      <div className="sc-bqiRlB bfSpmb">States</div>
    </Link>
  );
}
