import React, { useState } from "react";
import { useSelector } from "react-redux";
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

export default function Account() {
  const user = useSelector((state) => state.auth.user);
  const mentor = useSelector((state) => state.data.mentor);

  const navigate = useNavigate();

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

    try {
      const response = await axios.post(
        `${API_URL}/account/changepassword`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success(response.data.message);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login"); // Redirect to the login page
      } else {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      }
    }
    console.log(oldPassword, newPassword);
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
                  <div class="likes-card">
                    <h3>Total Likes</h3>
                    <p style={{ border: "none" }} class="likes-count">
                      {mentor.likes.length}
                    </p>
                  </div>
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
              <div className="col-lg-4">
                <div className="profile-details details-cover">
                  <div className="row align-items-center justify-content-between detail-name">
                    <a href="javascript:void(0)">My Profile</a>
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
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="icon-mail"
                        >
                          <path
                            fill="#69d5b1"
                            d="M22 8.62V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.62l9.55 4.77a1 1 0 0 0 .9 0L22 8.62z"
                          ></path>
                          <path
                            fill="#179a6f"
                            d="M12 11.38l-10-5V6c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v.38l-10 5z"
                          ></path>
                        </svg>
                        <p>{mentor.email}</p>
                      </li>
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="icon-translate"
                        >
                          <path
                            fill="#69d5b1"
                            d="M10.41 10l1.3 1.3a1 1 0 0 1-1.42 1.4L9 11.42l-3.3 3.3a1 1 0 1 1-1.4-1.42L7.58 10l-1.3-1.3a1 1 0 0 1 1.42-1.4L9 8.58l.54-.54A5 5 0 0 0 10.98 5H3a1 1 0 1 1 0-2h5V2a1 1 0 1 1 2 0v1h5a1 1 0 0 1 0 2h-2.02a7 7 0 0 1-2.03 4.46l-.54.54z"
                          ></path>
                          <path
                            fill="#179a6f"
                            d="M13.33 18l-1.4 3.38a1 1 0 0 1-1.85-.76l5-12a1 1 0 0 1 1.84 0l5 12a1 1 0 0 1-1.84.76L18.67 18h-5.34zm.84-2h3.66L16 11.6 14.17 16z"
                          ></path>
                        </svg>
                        {mentor.languages.map((language, index) => (
                          <React.Fragment key={language}>
                            <p>
                              {language}
                              {index !== mentor.languages.length - 1 && " , "}
                            </p>
                          </React.Fragment>
                        ))}
                      </li>
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="icon-location-pin"
                        >
                          <path
                            fill="#69d5b1"
                            d="M5.64 16.36a9 9 0 1 1 12.72 0l-5.65 5.66a1 1 0 0 1-1.42 0l-5.65-5.66zM12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
                          ></path>
                          <path
                            fill="#179a6f"
                            d="M12 1a9 9 0 0 1 6.36 15.36l-5.65 5.66a1 1 0 0 1-.71.3V13a3 3 0 0 0 0-6V1z"
                          ></path>
                        </svg>
                        <p>{mentor.country}</p>
                      </li>
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="icon-work"
                        >
                          <path
                            fill="#69d5b1"
                            d="M10 14.92V16a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-1.08c2.83-.24 5.53-.96 8-2.1V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7.18a23.85 23.85 0 0 0 8 2.1z"
                          ></path>
                          <path
                            fill="#179a6f"
                            d="M14 12.92V12a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.92a23.85 23.85 0 0 1-8-2.1V8c0-1.1.9-2 2-2h3V5a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1h3a2 2 0 0 1 2 2v2.82a23.85 23.85 0 0 1-8 2.1zM15 6V5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v1h6z"
                          ></path>
                        </svg>
                        <p>{mentor.title}</p>
                      </li>
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="icon-code"
                        >
                          <rect
                            width="18"
                            height="18"
                            x="3"
                            y="3"
                            fill="#69d5b1"
                            rx="2"
                          ></rect>
                          <path
                            fill="#179a6f"
                            d="M8.7 13.3a1 1 0 0 1-1.4 1.4l-2-2a1 1 0 0 1 0-1.4l2-2a1 1 0 1 1 1.4 1.4L7.42 12l1.3 1.3zm6.6 0l1.29-1.3-1.3-1.3a1 1 0 1 1 1.42-1.4l2 2a1 1 0 0 1 0 1.4l-2 2a1 1 0 0 1-1.42-1.4zm-3.32 3.9a1 1 0 0 1-1.96-.4l2-10a1 1 0 0 1 1.96.4l-2 10z"
                          ></path>
                        </svg>
                        {mentor.skills.map((skill, index) => (
                          <React.Fragment key={skill}>
                            <p>
                              {skill}
                              {index !== mentor.skills.length - 1 && " , "}
                            </p>
                          </React.Fragment>
                        ))}
                      </li>
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="icon-check"
                        >
                          <circle
                            cx="12"
                            cy="12"
                            r="10"
                            fill="#69d5b1"
                          ></circle>
                          <path
                            fill="#179a6f"
                            d="M10 14.59l6.3-6.3a1 1 0 0 1 1.4 1.42l-7 7a1 1 0 0 1-1.4 0l-3-3a1 1 0 0 1 1.4-1.42l2.3 2.3z"
                          ></path>
                        </svg>
                        {mentor.available ? (
                          <p>available</p>
                        ) : (
                          <p>not available</p>
                        )}
                      </li>
                      <li>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="icon-information"
                        >
                          <path
                            fill="#69d5b1"
                            d="M12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20z"
                          ></path>
                          <path
                            fill="#179a6f"
                            d="M11 12a1 1 0 0 1 0-2h2a1 1 0 0 1 .96 1.27L12.33 17H13a1 1 0 0 1 0 2h-2a1 1 0 0 1-.96-1.27L11.67 12H11zm2-4a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"
                          ></path>
                        </svg>
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
                    Reset Password
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
