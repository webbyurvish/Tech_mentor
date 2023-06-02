import React, { useEffect, useState } from "react";
import { Layout } from "../Layout/Layout";
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
import Overview from "../Layout/Rating/Overview";
import { extractUsername, fetchMentorData } from "./MentorServices";
import Ratings from "../Layout/Rating/Ratings";
import { submitRating } from "../../redux/slices/likeratingSlice";

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
      fetchData({
        technology: skill, // Use the selected skill directly instead of filters.technology
        country: filters.country,
        name: filters.name,
        spokenLanguage: filters.spokenLanguage,
        currentPage,
        isLiked: filters.isLiked,
        userId,
      })
    );
    setLoading(false);
  };

  const { id } = useParams();
  const [mentor, setMentor] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  // total numbers of ratings
  const totalCount = mentor && mentor.ratings.length;

  // sum of all ratings stars
  const ratingSum =
    mentor && mentor.ratings.reduce((sum, rating) => sum + rating.stars, 0);

  // average of all ratings
  const averageRating = totalCount > 0 ? ratingSum / totalCount : 0;

  useEffect(() => {
    // fetch mentor details
    async function fetchMentorDatabyid() {
      try {
        setLoading(true);
        const mentorData = await fetchMentorData(id, navigate);
        setMentor(mentorData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }

    fetchMentorDatabyid();
  }, []);

  // submit ratings to mentor
  const handleRatingSubmit = async (e) => {
    e.preventDefault();

    const data = {
      userId: Number(user.id),
      mentorId: mentor.id,
      comment: feedbackMessage,
      stars: selectedStars,
    };

    dispatch(submitRating(data));
  };

  return (
    <Layout>
      <ToastContainer />
      {!mentor || !user || loading ? (
        <Loading />
      ) : (
        <>
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
                    {/* Mentor's country */}
                    <div className="location-cover">
                      <a href="javascript:void(0)">
                        <i className="fa-solid fa-location-dot"></i>
                        <p>{mentor.country}</p>
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
                  {/* Mentor's Profile image */}
                  <div className="card-img">
                    <img src={mentor.imageUrl} alt="" />
                  </div>
                  {/* Mentor Name */}
                  <h2>{mentor.name}</h2>

                  {/* Mentor title */}
                  <span>{mentor.title}</span>

                  {/* About mentor */}
                  <p>{mentor.about}</p>

                  {/* List of Languages that mentor knows */}
                  <i
                    style={{ marginRight: "7px" }}
                    className="fa-solid fa-language"
                  ></i>
                  <span>
                    {mentor.languages.map((language, index) => (
                      <React.Fragment key={index}>
                        {language}
                        {index !== mentor.languages.length - 1 && ", "}
                      </React.Fragment>
                    ))}
                  </span>

                  {/* List of Skills */}
                  <div className="technology">
                    <ul>
                      {mentor.skills.map((skill, index) => (
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
                  {/* Link for rating mentor ( on click its open a modal ) */}
                  <a
                    href="javascript:vid(0)"
                    // onClick={openModal}
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    <i className="fa-sharp fa-solid fa-face-smile"></i>
                    <p>Rate mentor</p>
                  </a>
                  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                  {/* Link to direct chat with mentor */}
                  <Link to={`/chatwithmentor/${extractUsername(mentor.email)}`}>
                    <i className="fa-solid fa-comments"></i> <p>Communicate</p>
                  </Link>
                </div>
              </div>
            </div>

            <div className="ratingbody">
              {/* Rating overview of mentor */}
              <div className="card">
                <div className="row justify-content-left d-flex">
                  <Overview averageRating={averageRating} mentor={mentor} />
                </div>
              </div>
              <hr />

              {/* List of ratings */}
              <div className="card">
                <Ratings mentor={mentor} />
              </div>
            </div>
          </div>

          {/* Rating modal */}
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
                  mentor.ratings.some(
                    (obj) => obj.userId === Number(user.id)
                  ) && (
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
                  !mentor.ratings.some(
                    (obj) => obj.userId === Number(user.id)
                  ) && (
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
                          onClick={(e) => handleRatingSubmit(e)}
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
        </>
      )}
    </Layout>
  );
}
