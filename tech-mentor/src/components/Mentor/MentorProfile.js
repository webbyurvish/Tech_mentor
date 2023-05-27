import React, { useEffect, useState } from "react";
import { Layout } from "../Layout/Layout";
import axios from "axios";
import { API_URL } from "../../config";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { FeedBack } from "../Layout/FeedBack";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import "./Rating.css";

export default function MentorProfile() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  if (!user) {
    navigate("/login");
  }
  const { id } = useParams();
  const [mentor, setMentor] = useState(null);
  const selectedStars = useSelector((state) => state.data.selectedStars);

  const [feedbackMessage, setFeedbackMessage] = useState("");

  useEffect(() => {
    async function fetchMentor() {
      const mentor = await axios.get(`${API_URL}/mentors/${id}`);
      setMentor(mentor.data);
    }

    fetchMentor();
  }, [mentor]);

  const handleSubmit = async (e) => {
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
        },
      });

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }

    console.log(mentor.id, Number(user.id), feedbackMessage, selectedStars);
  };
  if (!user || !mentor) {
    return <p>loading</p>;
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
                <img
                  src="https://api.codingcoach.io/avatars/tns/abcb24517b43bf54000984ef4b2291fd"
                  alt=""
                />
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
                        <a href="javascript:void(0)">{skill}</a>
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
            </div>
          </div>
        </div>
      </div>

      {/* modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
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
                      class="fa-sharp fa-solid fa-face-smile"
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
                      onClick={handleSubmit}
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
