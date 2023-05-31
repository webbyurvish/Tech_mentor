import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { logoutUser } from "../../redux/slices/authSlice";
import { Link } from "react-router-dom";
import { CometChat } from "@cometchat-pro/chat";
import { cometchatlogout } from "../chat/ChatServices";

export const MentorWrapper = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);

  const [active, setActive] = useState("Home"); // Set default active state as "Home"

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  const mentor = "webbyurvish";

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
            <Link
              to={`/mentor/${user.id}`}
              className={`sc-crHmcD layWKW ${
                location.pathname === `/mentor/${user.id}` ? "active" : ""
              } `}
              onClick={() => setActive("Home")}
            >
              <i className="fa-solid fa-house-user"></i>
              <div className="sc-bqiRlB bfSpmb">Home</div>
            </Link>
            <Link
              to={`/chatwithadmin/${mentor}`}
              className={`sc-crHmcD layWKW ${
                location.pathname === `/chatwithadmin/${mentor}` ? "active" : ""
              } `}
            >
              <i className="fa-solid fa-house-signal"></i>
              <div className="sc-bqiRlB bfSpmb">
                Connect with <br />
                Admin
              </div>
            </Link>

            <Link
              className={`sc-crHmcD layWKW ${
                location.pathname === `/mentor/${user.id}/chat` ? "active" : ""
              } `}
              to={`/mentor/${user.id}/chat`}
            >
              <i className="fas fa-comments"></i>
              <div className="sc-bqiRlB bfSpmb">Connect</div>
            </Link>
            <Link to={"/"} className="sc-crHmcD layWKW">
              <i className="fa-solid fa-people-arrows"></i>
              <div className="sc-bqiRlB bfSpmb">Mentors</div>
            </Link>
            <Link
              to={`/mentor/${user.id}/reach`}
              className={`sc-crHmcD layWKW ${
                location.pathname === `/mentor/${user.id}/reach` ? "active" : ""
              } `}
            >
              <i className="fa-solid fa-house-signal"></i>
              <div className="sc-bqiRlB bfSpmb">Reach</div>
            </Link>
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
