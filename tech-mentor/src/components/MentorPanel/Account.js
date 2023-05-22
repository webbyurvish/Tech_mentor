import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Account.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export default function Account({ mentor }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  console.log(mentor);

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
              <a className="sc-crHmcD layWKW active">
                <i className="fa-solid fa-house-user"></i>
                <div className="sc-bqiRlB bfSpmb">Home</div>
              </a>
              <a className="sc-crHmcD layWKW">
                <i className="fa-solid fa-file-lines"></i>
                <div className="sc-bqiRlB bfSpmb">Mentorships</div>
              </a>
              <a className="sc-crHmcD layWKW">
                <i className="fas fa-comments"></i>
                <div className="sc-bqiRlB bfSpmb">Conversations</div>
              </a>
              <a href="/" className="sc-crHmcD layWKW">
                <i className="fa-solid fa-people-arrows"></i>
                <div className="sc-bqiRlB bfSpmb">Mentors</div>
              </a>
              <a
                onClick={handleLogout}
                className="sc-crHmcD sc-ksdxgE layWKW feLfRC krxgFs"
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                <div className="sc-bqiRlB bfSpmb">Logout</div>
              </a>
            </nav>
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
                      <h2>{mentor.name}</h2>
                      <p>{mentor.title}</p>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="profile-details details-cover">
                      <div className="row align-items-center justify-content-between detail-name">
                        <a href="javascript:void(0)">My Profile</a>
                        <Link to={`/me/${mentor.id}/edit`}>Edit</Link>
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
                                  {index !== mentor.languages.length - 1 &&
                                    " , "}
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
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
