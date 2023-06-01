import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { logoutUser } from "../../redux/slices/authSlice";
import { Link } from "react-router-dom";
import { CometChat } from "@cometchat-pro/chat";
import { cometchatlogout } from "../chat/ChatServices";
import HomeLink from "../Layout/Dashboardlinks/HomeLink";
import ConnectLink from "../Layout/Dashboardlinks/ConnectLink";
import MentorspageLink from "../Layout/Dashboardlinks/MentorspageLink";
import LogoutLink from "../Layout/Dashboardlinks/LogoutLink";
import ConnectWithAdminLink from "../Layout/Dashboardlinks/ConnectWithAdminLink";

export const MentorWrapper = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);

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

            {/* Mentor Dashboard home */}
            <HomeLink />

            {/* Dashboard Chat and video call with Admin ==> directly Allowed only for mentors*/}
            <ConnectWithAdminLink />

            {/* Dashboard Chat and video call with mentors and users */}
            <ConnectLink />

            {/* Main mentors list page */}
            <MentorspageLink />

            {/* logout */}
            <LogoutLink />
          </nav>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};
