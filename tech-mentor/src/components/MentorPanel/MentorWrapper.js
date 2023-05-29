import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser } from "../../redux/slices/authSlice";
import { Link } from "react-router-dom";

export const MentorWrapper = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div className="managment-account">
      <div className="container-fluid">
        <div className="account-side-bar">
          <nav className="sc-iqseJM eWrBEk">
            <img
              src="/images/coding.png"
              alt="Logo"
              className="sc-egiyK dhAbpN"
            />
            <a className="sc-crHmcD layWKW active">
              <i className="fa-solid fa-house-user"></i>
              <div className="sc-bqiRlB bfSpmb">Home</div>
            </a>
            <a className="sc-crHmcD layWKW">
              <i className="fa-solid fa-file-lines"></i>
              <div className="sc-bqiRlB bfSpmb">Mentorships</div>
            </a>

            <Link className="sc-crHmcD layWKW" to={"/chat"}>
              <i className="fas fa-comments"></i>
              <div className="sc-bqiRlB bfSpmb">Conversations</div>
            </Link>
            <a href="/" className="sc-crHmcD layWKW">
              <i className="fa-solid fa-people-arrows"></i>
              <div className="sc-bqiRlB bfSpmb">Mentors</div>
            </a>
            <a
              onClick={handleLogout}
              className="sc-crHmcD sc-ksdxgE layWKW feLfRC krxgFs"
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              <div className="sc-bqiRlB bfSpmb">Logout</div>
            </a>
          </nav>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};
