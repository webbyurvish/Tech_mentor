import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser } from "../../redux/slices/authSlice";
import { Link } from "react-router-dom";
import { CometChat } from "@cometchat-pro/chat";

export const MentorWrapper = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    CometChat.logout().then(
      () => {
        console.log("Logout completed successfully");
      },
      (error) => {
        console.log("Logout failed with exception:", { error });
      }
    );
    navigate("/");
  };

  const mentor = "webbyurvish";

  return (
    <div className="managment-account">
      <div className="container-fluid">
        <div className="account-side-bar">
          <div class="flex-container">
            <div class="flex-child magenta">
              <nav className="sc-iqseJM eWrBEk">
                <img
                  src="/images/coding.png"
                  alt="Logo"
                  className="sc-egiyK dhAbpN"
                />
                <Link
                  to={`/mentor/${user.id}`}
                  className="sc-crHmcD layWKW active"
                >
                  <i className="fa-solid fa-house-user"></i>
                  <div className="sc-bqiRlB bfSpmb">Home</div>
                </Link>
                <Link
                  to={`/chatwithmentor/${mentor}`}
                  className="sc-crHmcD layWKW"
                >
                  <i className="fa-solid fa-house-signal"></i>
                  <div className="sc-bqiRlB bfSpmb">
                    Connect with <br />
                    Admin
                  </div>
                </Link>

                <Link className="sc-crHmcD layWKW" to={`/chat`}>
                  <i className="fas fa-comments"></i>
                  <div className="sc-bqiRlB bfSpmb">Conversations</div>
                </Link>
                <Link to={"/"} className="sc-crHmcD layWKW">
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
            </div>

            <div class="flex-child green">
              <div>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
