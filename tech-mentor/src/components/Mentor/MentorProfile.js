import React, { useEffect, useState } from "react";
import { Layout } from "../Layout/Layout";
import axios from "axios";
import { API_URL } from "../../config";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UserPage() {
  const { id } = useParams();
  const [mentor, setMentor] = useState(null);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    async function fetchMentor() {
      const mentor = await axios.get(`${API_URL}/mentors/${id}`);
      setMentor(mentor.data);
    }

    fetchMentor();
  }, []);

  console.log(mentor);

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
                class="fa-solid fa-language"
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
