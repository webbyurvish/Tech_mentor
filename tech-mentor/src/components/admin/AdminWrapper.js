import React, { useState } from "react";
import "../MentorPanel/Account.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/slices/authSlice";
import ConnectLink from "../Layout/Dashboardlinks/ConnectLink";
import MentorspageLink from "../Layout/Dashboardlinks/MentorspageLink";
import LogoutLink from "../Layout/Dashboardlinks/LogoutLink";
import RequestsLink from "../Layout/Dashboardlinks/RequestsLink";
import HomeLink from "../Layout/Dashboardlinks/HomeLink";

const AdminWrapper = ({ children }) => {
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
              {/* Admin Dashboard home */}
              <HomeLink />

              {/* Dashboard Users Requests to become a mentor */}
              <RequestsLink />

              {/* Dashboard Chat and video call to mentors and users */}
              <ConnectLink />

              {/* Main mentors list page */}
              <MentorspageLink />

              {/* Logout */}
              <LogoutLink />
            </nav>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminWrapper;
