import React from "react";
import "../MentorPanel/Account.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/slices/authSlice";

const Wrapper = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
                to={`/admin/${user.id}`}
                className="sc-crHmcD layWKW active"
              >
                <i className="fa-solid fa-house-user"></i>
                <div className="sc-bqiRlB bfSpmb">Home</div>
              </Link>

              {user && user.role == "admin" && (
                <Link
                  to={`/admin/${user.id}/requests`}
                  className="sc-crHmcD layWKW"
                >
                  <i class="fa-solid fa-user-plus"></i>
                  <div className="sc-bqiRlB bfSpmb">Requests</div>
                </Link>
              )}
              <a className="sc-crHmcD layWKW">
                <i className="fas fa-comments"></i>
                <div className="sc-bqiRlB bfSpmb">Conversations</div>
              </a>
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

export default Wrapper;
