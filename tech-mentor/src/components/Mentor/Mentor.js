import React, { useState } from "react";
import "./Mentor.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { API_URL } from "../../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchData } from "../../redux/slices/resultSlice";
import { setCurrentPage } from "../../redux/slices/dataSlice";

export default function Mentor({ mentor }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const filters = useSelector((state) => state.filters);
  const currentPage = useSelector((state) => state.data.currentPage);

  console.log(mentor.imageUrl.toString());

  const userId = user ? Number(user.id) : null;

  const handlelike = async (mentorId) => {
    // dispatch(setCurrentPage(1));
    try {
      await axios.post(
        `${API_URL}/like`,
        { userId, mentorId: mentorId },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(
        fetchData(
          filters.technology,
          filters.country,
          filters.name,
          filters.spokenLanguage,
          currentPage
        )
      );

      // dispatch(setMentors(updatedMentors));
    } catch (error) {
      toast.error(error);
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
                  class="fa-solid fa-location-dot"
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
            <img src={`https://localhost:7022${mentor.imageUrl}`} alt="" />
          </div>
          <h2>{mentor.name}</h2>
          <span>{mentor.title}</span>
          <p>{mentor.about}</p>
          <div className="technology">
            <ul>
              {mentor.skills.slice(0, 3).map((skill, index) => (
                <li key={index}>
                  <a href="javascript:void(0)">{skill}</a>
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
            <i class="fa-regular fa-hand-point-right"></i>
            <p>Go To Profile</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
