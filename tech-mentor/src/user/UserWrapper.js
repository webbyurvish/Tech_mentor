import React, { useState } from "react";
import "../components/MentorPanel/Account.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/slices/authSlice";

const UserWrapper = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeLink, setActiveLink] = useState(""); // Add state variable

  const user = useSelector((state) => state.auth.user);

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
                to={`/me/${user.id}`}
                className={`sc-crHmcD layWKW active`}
                isActive={() => setActiveLink("home")}
              >
                <i className="fa-solid fa-house-user"></i>
                <div className="sc-bqiRlB bfSpmb">Home</div>
              </Link>
              <Link to={`/me/${user.id}/become`} className="sc-crHmcD layWKW">
                <i class="fa-solid fa-people-carry-box"></i>
                <div className="sc-bqiRlB bfSpmb">Become a mentor</div>
              </Link>

              <Link to={"/userchat"} className="sc-crHmcD layWKW">
                <i className="fas fa-comments"></i>
                <div className="sc-bqiRlB bfSpmb">Conversations</div>
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
};

export default UserWrapper;
