import React, { useEffect, useState } from "react";
import { Layout } from "../Layout/Layout";
import axios from "axios";
import { API_URL } from "../../config";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { FeedBack } from "../Layout/FeedBack";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/slices/dataSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setTechnology } from "../../redux/slices/filterSlice";
import { fetchData } from "../../redux/slices/resultSlice";
import Loading from "../Layout/Loading";

export default function MentorProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.auth.user);
  const filters = useSelector((state) => state.filters);
  const selectedStars = useSelector((state) => state.data.selectedStars);
  const currentPage = useSelector((state) => state.data.currentPage);

  const userId = user ? Number(user.id) : null;

  const handleskillchange = (skill) => {
    setLoading(true);
    navigate("/");
    dispatch(setCurrentPage(1));
    dispatch(setTechnology(skill)); // Dispatch the setTechnology action with the selected skill
    dispatch(
      fetchData(
        filters.technology, // Use the selected skill instead of filters.technology
        filters.country,
        filters.name,
        filters.spokenLanguage,
        currentPage,
        filters.isLiked,
        userId
      )
    );
    setLoading(false);
  };

  const { id } = useParams();
  const [mentor, setMentor] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const countObjectsWithStars = (stars) => {
    return (
      mentor && mentor.ratings.filter((rating) => rating.stars === stars).length
    );
  };

  const totalCount = mentor && mentor.ratings.length;

  const calculatePercentage = (count) => {
    if (totalCount === 0) return 0;
    return (count / totalCount) * 100;
  };

  const ratingSum =
    mentor && mentor.ratings.reduce((sum, rating) => sum + rating.stars, 0);

  const averageRating = totalCount > 0 ? ratingSum / totalCount : 0;

  const getActiveStars = () => {
    const maxStars = 5;
    const activeStars = Math.round(averageRating);
    const stars = [];

    for (let i = 0; i < maxStars; i++) {
      if (i < activeStars) {
        stars.push(
          <span key={i} className="fa fa-star star-active mx-1"></span>
        );
      } else {
        stars.push(
          <span key={i} className="fa fa-star star-inactive mx-1"></span>
        );
      }
    }

    return stars;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const mentorResponse = await axios.get(`${API_URL}/mentors/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setMentor(mentorResponse.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error.response && error.response.status === 401) {
          navigate("/login"); // Redirect to the login page
        } else {
          console.error("Error fetching mentor data:", error);
        }
      }
    }
    fetchData();
  }, []);

  const handleRatingSubmit = async (e) => {
    e.preventDefault();

    const data = {
      userId: Number(user.id),
      mentorId: mentor.id,
      comment: feedbackMessage,
      stars: selectedStars,
    };

    try {
      const response = await axios.post(`${API_URL}/rating`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      toast.success(response.data.message);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login"); // Redirect to the login page
      } else {
        toast.error(error.response.data.message);
      }
    }

    console.log(mentor.id, Number(user.id), feedbackMessage, selectedStars);
  };

  if (!mentor || !user) {
    return <Loading />;
  }

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "short" };
    return date.toLocaleDateString("en-US", options);
  }

  function extractUsername(email) {
    const atIndex = email.indexOf("@");
    if (atIndex !== -1) {
      const username = email.substring(0, atIndex);
      return username;
    }
    return null; // Return null if the email format is invalid
  }

  return (
    <Layout>
      <div className="row justify-content-center">
        <Link style={{ "margin-top": "40px" }} to="/">
          Back to mentors list
        </Link>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-5 mentor-detail">
          <div className="mentor-card-cover">
            <div className="card-inner">
              <div className="row align-items-center justify-content-between mentor-location">
                <div className="location-cover">
                  <a href="javascript:void(0)">
                    <i className="fa-solid fa-location-dot"></i>
                    <p>{mentor && mentor.country}</p>
                  </a>
                </div>
                {/* <a
                  onClick={() => handlelike(mentor.id)}
                  href="javascript:void(0)"
                >
                  <i
                    className={
                      user !== null && mentor.likes.includes(Number(userId))
                        ? "fa-solid fa-heart"
                        : "fa-regular fa-heart"
                    }
                    style={{
                      color:
                        user !== null && mentor.likes.includes(Number(user.id))
                          ? "#e91c1c"
                          : "black",
                    }}
                  ></i>
                </a> */}
              </div>
              <div className="card-img">
                <img src={mentor.imageUrl} alt="" />
              </div>
              <h2>{mentor && mentor.name}</h2>
              <span>{mentor && mentor.title}</span>
              <p>{mentor && mentor.about}</p>
              <i
                style={{ marginRight: "7px" }}
                className="fa-solid fa-language"
              ></i>
              <span>
                {mentor &&
                  mentor.languages.map((language, index) => (
                    <React.Fragment key={index}>
                      {language}
                      {index !== mentor.languages.length - 1 && ", "}
                    </React.Fragment>
                  ))}
              </span>
              <div className="technology">
                <ul>
                  {mentor &&
                    mentor.skills.map((skill, index) => (
                      <li key={index}>
                        <a
                          onClick={() => handleskillchange(skill)}
                          href="javascript:void(0)"
                        >
                          {skill}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="go-to-profile">
              <a href="javascript:vid(0)">
                <i className="fa-regular fa-hand-point-right"></i>
                <p>Go To Profile</p>
              </a>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <a
                href="javascript:vid(0)"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <i className="fa-sharp fa-solid fa-face-smile"></i>
                <p>Rate mentor</p>
              </a>
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <Link to={`/chatwithmentor/${extractUsername(mentor.email)}`}>
                <i className="fa-solid fa-comments"></i> <p>Communicate</p>
              </Link>
            </div>
          </div>
        </div>

        <div className="ratingbody">
          <div className="card">
            <div className="row justify-content-left d-flex">
              <div className="col-md-4 d-flex flex-column">
                <div className="rating-box">
                  <h1 className="pt-4" style={{ marginLeft: "30%" }}>
                    {averageRating.toFixed(1)}
                  </h1>
                  <p style={{ marginLeft: "28%" }}>out of 5</p>
                </div>
                <div className="bar-container">{getActiveStars()}</div>
              </div>
              <div className="col-md-8">
                <div className="rating-bar0 justify-content-center">
                  <table className="text-left mx-auto">
                    <tr>
                      <td className="rating-label td">Excellent</td>
                      <td className="rating-bar td">
                        <div className="bar-container">
                          <div
                            style={{
                              width: `${calculatePercentage(
                                countObjectsWithStars(5)
                              )}%`,
                              height: "13px",
                              backgroundColor: "#fbc02d",
                              borderRadius: "20px",
                            }}
                          ></div>
                        </div>
                      </td>
                      <td className="text-right td">
                        {calculatePercentage(countObjectsWithStars(5)).toFixed(
                          1
                        )}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td className="rating-label td">Good</td>
                      <td className="rating-bar td">
                        <div className="bar-container">
                          <div
                            style={{
                              width: `${calculatePercentage(
                                countObjectsWithStars(4)
                              )}%`,
                              height: "13px",
                              backgroundColor: "#fbc02d",
                              borderRadius: "20px",
                            }}
                          ></div>
                        </div>
                      </td>
                      <td className="text-right">
                        {calculatePercentage(countObjectsWithStars(4)).toFixed(
                          1
                        )}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td className="rating-label td">Average</td>
                      <td className="rating-bar td">
                        <div className="bar-container">
                          <div
                            style={{
                              width: `${calculatePercentage(
                                countObjectsWithStars(3)
                              )}%`,
                              height: "13px",
                              backgroundColor: "#fbc02d",
                              borderRadius: "20px",
                            }}
                          ></div>
                        </div>
                      </td>
                      <td className="text-right td">
                        {calculatePercentage(countObjectsWithStars(3)).toFixed(
                          1
                        )}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td className="rating-label td">Poor</td>
                      <td className="rating-bar td">
                        <div className="bar-container">
                          <div
                            style={{
                              width: `${calculatePercentage(
                                countObjectsWithStars(2)
                              )}%`,
                              height: "13px",
                              backgroundColor: "#fbc02d",
                              borderRadius: "20px",
                            }}
                          ></div>
                        </div>
                      </td>
                      <td className="text-right td">
                        {calculatePercentage(countObjectsWithStars(2)).toFixed(
                          1
                        )}
                        %
                      </td>
                    </tr>
                    <tr>
                      <td className="rating-label td">Terrible</td>
                      <td className="rating-bar td">
                        <div className="bar-container">
                          <div
                            style={{
                              width: `${calculatePercentage(
                                countObjectsWithStars(1)
                              )}%`,
                              height: "13px",
                              backgroundColor: "#fbc02d",
                              borderRadius: "20px",
                            }}
                          ></div>
                        </div>
                      </td>
                      <td className="text-right td">
                        {calculatePercentage(countObjectsWithStars(1)).toFixed(
                          1
                        )}
                        %
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <hr />
          {mentor &&
            mentor.ratings.map((rating) => (
              <div className="card">
                <div className="row d-flex">
                  <div className="">
                    <img
                      className="profile-pic"
                      src={`https://localhost:7022${rating.user.imageUrl}`}
                    />
                  </div>
                  <div className="d-flex flex-column">
                    <h5 className="mt-2 mb-0">{rating.user.name}</h5>
                    <div>
                      <p className="text-left">
                        <span className="text-muted">
                          {rating.stars.toFixed(1)} &nbsp;
                        </span>
                        {[...Array(Math.floor(rating.stars))].map(
                          (_, index) => (
                            <span
                              className="fa fa-star star-active"
                              key={index}
                            ></span>
                          )
                        )}
                        {[...Array(5 - Math.floor(rating.stars))].map(
                          (_, index) => (
                            <span
                              className="fa fa-star star-inactive"
                              key={index}
                            ></span>
                          )
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="ml-auto">
                    <p className="text-muted pt-5 pt-sm-3">
                      {formatDate(rating.dateRated)}
                    </p>
                  </div>
                </div>
                <div className="row text-left">
                  <p className="content mt-3">{rating.comment}</p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {mentor &&
              user &&
              mentor.ratings.some((obj) => obj.userId === Number(user.id)) && (
                <p
                  style={{
                    margin: "3rem",
                    padding: "1rem",
                    fontWeight: "bold",
                    fontSize: "2rem",
                  }}
                >
                  <span>
                    <i
                      className="fa-sharp fa-solid fa-face-smile"
                      style={{ color: "#e7eb00" }}
                    ></i>
                  </span>
                  &nbsp; You already rated this mentor !!!
                </p>
              )}
            {mentor &&
              !mentor.ratings.some((obj) => obj.userId === Number(user.id)) && (
                <>
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Add Rating
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <FeedBack />
                  <div className="modal-body">
                    <div className="reject-reason">
                      <label htmlFor="text">Give Feedback</label>
                      <textarea
                        type="text"
                        value={feedbackMessage}
                        onChange={(e) => setFeedbackMessage(e.target.value)}
                        rows={4}
                        cols={20}
                      ></textarea>
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
                      onClick={handleRatingSubmit}
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
    </Layout>
  );
}
