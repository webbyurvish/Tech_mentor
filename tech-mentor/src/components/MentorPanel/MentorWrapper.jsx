import React from "react";
import HomeLink from "../Layout/Dashboardlinks/HomeLink";
import ConnectLink from "../Layout/Dashboardlinks/ConnectLink";
import MentorspageLink from "../Layout/Dashboardlinks/MentorspageLink";
import LogoutLink from "../Layout/Dashboardlinks/LogoutLink";
import ConnectWithAdminLink from "../Layout/Dashboardlinks/ConnectWithAdminLink";
import ReviewsLink from "../Layout/Dashboardlinks/ReviewsLink";

export const MentorWrapper = ({ children }) => {
  return (
    <div className="managment-account">
      <div className="container-fluid">
        <div className="account-side-bar">
          <nav style={{ width: "77px" }} className="sc-iqseJM eWrBEk">
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

            {/* Reviews */}
            {/* <ReviewsLink /> */}
          </nav>
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
};
