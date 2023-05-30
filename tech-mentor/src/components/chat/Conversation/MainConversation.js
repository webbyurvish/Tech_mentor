import React from "react";
import { MentorWrapper } from "../../MentorPanel/MentorWrapper";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const MainConversation = () => {
  const admin = "webbyurvish";
  const user = useSelector((state) => state.auth.user);

  return (
    <MentorWrapper>
      <div className="account-right-side">
        <div className="accont-home">
          <h2>Home</h2>
        </div>
      </div>

      <div className="account-profile">
        <div className="accound-cover">
          <div className="row justify-content-center">
            <div className="col-lg-4">
              <div className="profile-details">
                <div className="share-details">
                  <a href="javascript:void(0)">
                    <i className="fa-solid fa-share-nodes"></i>
                  </a>
                </div>
                <img src="img/navlogo.jpg" alt="" />
                <h2>mentor.name</h2>
                <p>mentor.title</p>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="profile-details details-cover">
                <div className="row align-items-center justify-content-between detail-name">
                  <Link
                    to={`/chatwithmentor/${admin}`}
                    href="javascript:void(0)"
                  >
                    Chat With Admin
                  </Link>
                </div>
              </div>
              <div className="profile-details details-cover">
                <div className="row align-items-center justify-content-between detail-name">
                  <Link
                    to={`/mentor/${user.id}/groups`}
                    href="javascript:void(0)"
                  >
                    Groups
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MentorWrapper>
  );
};
