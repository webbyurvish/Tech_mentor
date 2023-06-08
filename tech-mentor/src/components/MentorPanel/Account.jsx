import React from "react";
import { useSelector } from "react-redux";
import { MentorWrapper } from "./MentorWrapper";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Styles/Ratings.css";
import "./Styles/Account.css";
import "./Styles/EditMentor.css";
import ChangePasswordModal from "../Layout/ChangePassword/ChangePasswordModal";
import { RatingCard } from "./RatingCard";
import { MentorDetailsCard } from "./MentorDetailsCard";

// Mentor Home page
export default function Account() {
  const mentor = useSelector((state) => state.mentor.details);

  return (
    <MentorWrapper>
      <ToastContainer />
      <div className="account-right-side">
        <div className="accont-home">
          <h2>Home</h2>
        </div>
      </div>

      {/* Main details */}
      {mentor && (
        <div className="account-profile">
          <div className="accound-cover">
            <div className="row justify-content-center">
              <div className="col-lg-4">
                <div className="profile-details">
                  <img src="img/navlogo.jpg" alt="" />
                  <h2>{mentor.name}</h2>
                  <p style={{ border: "none" }}>{mentor.title}</p>

                  {/* likes card */}
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                    className="likes-card"
                  >
                    <div>
                      <h3>Total Likes</h3>
                      <p style={{ border: "none" }} className="likes-count">
                        {mentor.likes.length}
                      </p>
                    </div>
                    <div>
                      <h3>Total Ratings</h3>
                      <p style={{ border: "none" }} className="likes-count">
                        {mentor.ratings.length}
                      </p>
                    </div>
                  </div>

                  {/* ratings overview card */}
                  {mentor.ratings.length > 0 && <RatingCard />}
                </div>
              </div>

              {/* Details card */}
              <MentorDetailsCard />
            </div>
          </div>
        </div>
      )}

      {/* Change password Model */}
      <ChangePasswordModal />
    </MentorWrapper>
  );
}
