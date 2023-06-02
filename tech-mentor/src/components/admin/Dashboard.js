import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../MentorPanel/Account.css";
import { useNavigate } from "react-router";
import AdminWrapper from "./AdminWrapper";
import { fetchAllMentors } from "../../redux/slices/dataSlice";
import Loading from "../Layout/Loading";

export default function Admin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const mentors = useSelector((state) => state.data.mentors);
  const loading = useSelector((state) => state.data.loading);
  console.log(mentors);

  if (!user) {
    navigate("/login");
  }

  useEffect(() => {
    dispatch(fetchAllMentors());
  }, [dispatch]);
  return (
    <AdminWrapper>
      {loading ? (
        <Loading />
      ) : (
        <>
          {" "}
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
                    {/* Name of admin */}
                    <h2> {user.name}</h2>
                    <p>Admin of Tech-mentor</p>
                    <div class="likes-card">
                      <h3>Total Mentors</h3>
                      <p style={{ border: "none" }} class="likes-count">
                        {mentors.length}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </AdminWrapper>
  );
}
