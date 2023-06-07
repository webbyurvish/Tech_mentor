import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

export default function ConnectLink() {
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);

  // chat link
  return (
    <div>
      <Link
        to={`/${user.role}/${user.id}/chat`}
        className={`sc-crHmcD layWKW ${
          location.pathname === `/${user.role}/${user.id}/chat` ? "active" : ""
        } `}
      >
        <i className="fas fa-comments"></i>
        <div className="sc-bqiRlB bfSpmb">Connect</div>
      </Link>
    </div>
  );
}
