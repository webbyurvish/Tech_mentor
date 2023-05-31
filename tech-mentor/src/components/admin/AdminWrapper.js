import React, { useState } from "react";
import "../MentorPanel/Account.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/slices/authSlice";
import { cometchatlogout } from "../chat/ChatServices";

const AdminWrapper = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);
  const [active, setActive] = useState("Home"); // Set default active state as "Home"

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
                  location.pathname === `/admin/${user.id}` ? "active" : ""
                } `}
                to={`/admin/${user.id}`}
                onClick={() => setActive("Home")}
              >
                <i className="fa-solid fa-house-user"></i>
                <div className="sc-bqiRlB bfSpmb">Home</div>
              </Link>
              <Link
                to={`/admin/${user.id}/requests`}
                className={`sc-crHmcD layWKW ${
                  location.pathname.includes(`/admin/${user.id}/requests`)
                    ? "active"
                    : ""
                } `}
                onClick={() => setActive("Requests")}
              >
                <i className="fa-solid fa-user-plus"></i>
                <div className="sc-bqiRlB bfSpmb ">Requests</div>
              </Link>
              <Link
                className={`sc-crHmcD layWKW ${
                  location.pathname === "/admin/chat" ? "active" : ""
                } `}
                to={"/admin/chat"}
                onClick={() => setActive("Connect")}
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
};

export default AdminWrapper;
