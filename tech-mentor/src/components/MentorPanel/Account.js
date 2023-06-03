import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./Account.css";
import "./EditMentor.css";
import { MentorWrapper } from "./MentorWrapper";
import axios from "axios";
import { API_URL } from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Ratings.css";
import { DashboardRating } from "../Layout/Rating/DashboardRating";
import { getActiveStars } from "../Mentor/MentorServices";
import {
  Aboutsvg,
  Availablesvg,
  Countrysvg,
  Languagesvg,
  Skillsvg,
  Titlesvg,
} from "../Layout/Icons/Languagesvg";
import { Mailsvg } from "../Layout/Icons/Languagesvg";
import { changePassword } from "../../redux/slices/authSlice";
import { handleResetPasswordSubmit } from "../../redux/slices/accountSlice";

export default function Account() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const mentor = useSelector((state) => state.mentor.details);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const totalCount = mentor && mentor.ratings.length;

  const ratingSum =
    mentor && mentor.ratings.reduce((sum, rating) => sum + rating.stars, 0);

  const averageRating = totalCount > 0 ? ratingSum / totalCount : 0;

  const handleresetpasswordsubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: user.email,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    dispatch(changePassword(data));
  };

  return (
    <MentorWrapper>
      <ToastContainer />
      <div className="account-right-side">
        <div className="accont-home">
          <h2>Home</h2>
        </div>
      </div>
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
                  <div class="likes-card">
                    <h3>Total Likes</h3>
                    <p style={{ border: "none" }} class="likes-count">
                      {mentor.likes.length}
                    </p>
                  </div>

                  {/* ratings card */}
                  <div class="likes-card">
                    <div className="mentorratingcard">
                      <div className="row justify-content-left d-flex">
                        <div
                          style={{
                            justifyContent: "center",
                            marginLeft: "-16px",
                            marginRight: "16px",
                          }}
                          className="col-md-4 d-flex flex-column"
                        >
                          <div className="mentor-rating-box">
                            <h5
                              className="pt-2"
                              style={{ color: "black", marginLeft: "7%" }}
                            >
                              {averageRating.toFixed(1)}
                            </h5>
                            <p style={{ border: "none", font: "bold" }}>
                              out of 5
                            </p>
                          </div>
                          <div style={{ width: "168%", marginLeft: "-28px" }}>
                            {getActiveStars(averageRating)}
                          </div>
                        </div>
                        <div className="col-md-8">
                          <div className="rating-bar0 justify-content-center">
                            <table
                              className="text-left mx-auto"
                              style={{ width: "221px" }}
                            >
                              <DashboardRating mentor={mentor} />
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details card */}
              <div className="col-lg-4">
                <div className="profile-details details-cover">
                  <div className="row align-items-center justify-content-between detail-name">
                    <a href="javascript:void(0)">My Profile</a>

                    {/* Edit profile link */}
                    <Link
                      to={{
                        pathname: `/mentor/${user.id}/edit`,
                        state: { mentor },
                      }}
                    >
                      Edit
                    </Link>
                  </div>
                  <div className="profiles-details-cover">
                    <ul>
                      <li>
                        <Mailsvg />
                        <p>{mentor.email}</p>
                      </li>

                      {/* Languages known by mentor */}
                      <li>
                        <Languagesvg />
                        {mentor.languages.map((language, index) => (
                          <React.Fragment key={language}>
                            <p>
                              {language}
                              {index !== mentor.languages.length - 1 && " , "}
                            </p>
                          </React.Fragment>
                        ))}
                      </li>

                      {/* Mentor's country */}
                      <li>
                        <Countrysvg />
                        <p>{mentor.country}</p>
                      </li>

                      {/* Mentor's title */}
                      <li>
                        <Titlesvg />
                        <p>{mentor.title}</p>
                      </li>

                      {/* Skill list of mentor */}
                      <li>
                        <Skillsvg />
                        {mentor.skills.map((skill, index) => (
                          <React.Fragment key={skill}>
                            <p>
                              {skill}
                              {index !== mentor.skills.length - 1 && " , "}
                            </p>
                          </React.Fragment>
                        ))}
                      </li>

                      {/* Mentor is available or not */}
                      <li>
                        <Availablesvg />
                        {mentor.available ? (
                          <p>available</p>
                        ) : (
                          <p>not available</p>
                        )}
                      </li>

                      {/* about mentor */}
                      <li>
                        <Aboutsvg />
                        <p>{mentor.about}</p>
                      </li>
                      <li>
                        <a
                          href="javascript:vid(0)"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal"
                        >
                          <div className="saveorclose-btn">
                            <button>change password</button>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change password Model */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {mentor && (
              <>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Change Password
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div>
                    <label htmlFor="oldpassword">Old Password</label>
                    <input
                      name="oldpassword"
                      id="oldpassword"
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <label htmlFor="newpassword">New Password</label>
                    <input
                      name="newpassword"
                      id="newpassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>

                  <button
                    type="submit"
                    onClick={handleresetpasswordsubmit}
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </MentorWrapper>
  );
}
