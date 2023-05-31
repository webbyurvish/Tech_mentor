import React, { useState } from "react";
import "../MentorPanel/Account.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/slices/authSlice";
import { cometchatlogout } from "../chat/ChatServices";
import { extractUsername } from "../../Functions/Index";

export default function UserWrapper({ children }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [active, setActive] = useState("Home"); // Set default active state as "Home"

  const user = useSelector((state) => state.auth.user);
  const uid = extractUsername(user.email);

  if (!user) {
    navigate("/login  ");
  }

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div>
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
                className={`sc-crHmcD layWKW ${
                  location.pathname === `/me/${user.id}` ? "active" : ""
                } `}
                onClick={() => setActive("Home")}
                to={`/me/${user.id}`}
              >
                <i className="fa-solid fa-house-user"></i>
                <div className="sc-bqiRlB bfSpmb">Home</div>
              </Link>
              <Link
                className={`sc-crHmcD layWKW ${
                  location.pathname === `/me/${user.id}/become` ? "active" : ""
                } `}
                to={`/me/${user.id}/become`}
              >
                <i className="fa-solid fa-people-carry-box"></i>
                <div className="sc-bqiRlB bfSpmb">
                  Become <br /> a mentor
                </div>
              </Link>

              <Link
                to={`/user/${user.id}/chat`}
                className={`sc-crHmcD layWKW ${
                  location.pathname === `/user/${user.id}/chat` ? "active" : ""
                } `}
              >
                <i className="fas fa-comments"></i>
                <div className="sc-bqiRlB bfSpmb">Connect</div>
              </Link>
              <Link to={`/`} className="sc-crHmcD layWKW">
                <i className="fa-solid fa-people-arrows"></i>
                <div className="sc-bqiRlB bfSpmb">Mentors</div>
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
    </div>
  );
}
