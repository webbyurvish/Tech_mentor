import React from "react";
import "./Mentor.css";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { API_URL } from "../../config";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Mentor({ mentor }) {
  const user = useSelector((state) => state.auth.user);

  const handlelike = async () => {
    try {
      await axios.post(
        `${API_URL}/like`,
        { userId: user.id, mentorId: mentor.id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      toast.error(error);
    }
  };

  console.log(mentor);
  return (
    <div className="col-lg-4">
      <div className="mentor-card-cover">
        <div className="card-inner">
          <div className="row align-items-center justify-content-between mentor-location">
            <div className="location-cover">
              <a href="javascript:void(0)">
                <i class="fa-sharp fa-solid fa-location-dot"></i>
                <p>{mentor.country}</p>
              </a>
            </div>
            <a onClick={handlelike} href="javascript:void(0)">
              <i class="fa-regular fa-heart"></i>
            </a>
          </div>
          <div className="card-img">
            <img
              src="https://api.codingcoach.io/avatars/tns/abcb24517b43bf54000984ef4b2291fd"
              alt=""
            />
          </div>
          <h2>{mentor.name}</h2>
          <span>{mentor.title}</span>
          <p>{mentor.about}</p>
          <div className="technology">
            <ul>
              {mentor.skills.map((skill, index) => (
                <li key={index}>
                  <a href="javascript:void(0)">{skill}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="go-to-profile">
          <Link to={`/mentor/${mentor.id}`}>
            <i class="fa-regular fa-hand-point-right"></i>
            <p>Go To Profile</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
