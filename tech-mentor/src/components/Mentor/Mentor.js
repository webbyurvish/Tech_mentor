import React, { useState } from "react";
import "./Mentor.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchData } from "../../redux/slices/resultSlice";
import { setTechnology } from "../../redux/slices/filterSlice";

export default function Mentor({ mentor }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const filters = useSelector((state) => state.filters);
  const currentPage = useSelector((state) => state.data.currentPage);

  const userId = user ? Number(user.id) : null;

  const handleskillchange = (skill) => {
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
  };

  const handlelike = async (mentorId) => {
    try {
      await axios.post(
        `${API_URL}/like`,
        { userId, mentorId: mentorId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(
        fetchData(
          filters.technology,
          filters.country,
          filters.name,
          filters.spokenLanguage,
          currentPage,
          filters.isLiked,
          userId
        )
      );
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate("/login"); // Redirect to the login page
      } else {
        console.error("Error fetching mentor data:", error);
      }
    }
  };

  return (
    <div className="col-lg-4">
      <ToastContainer />
      <div className="mentor-card-cover">
        <div className="card-inner">
          <div className="row align-items-center justify-content-between mentor-location">
            <div className="location-cover">
              <a href="javascript:void(0)">
                <i
                  className="fa-solid fa-location-dot"
                  style={{ color: "#123268" }}
                ></i>
                <p>{mentor.country}</p>
              </a>
            </div>
            <a onClick={() => handlelike(mentor.id)} href="javascript:void(0)">
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
            </a>
          </div>
          <div className="card-img">
            <img src={mentor.imageUrl} alt="" />
          </div>
          <h2>{mentor.name}</h2>
          <span>{mentor.title}</span>
          <p>{mentor.about}</p>
          <div className="technology">
            <ul>
              {mentor.skills.slice(0, 3).map((skill, index) => (
                <li key={index}>
                  <a
                    onClick={() => handleskillchange(skill)}
                    href="javascript:void(0)"
                  >
                    {skill}
                  </a>
                </li>
              ))}
              {mentor.skills.length > 3 && (
                <li>
                  <p href="javascript:void(0)">+{mentor.skills.length - 3}</p>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="go-to-profile">
          <Link to={`/mentor/${mentor.id}/profile`}>
            <i className="fa-regular fa-hand-point-right"></i>
            <p>Go To Profile</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
