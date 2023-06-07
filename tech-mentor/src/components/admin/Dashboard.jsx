import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../MentorPanel/Styles/Account.css";
import { useNavigate } from "react-router";
import AdminWrapper from "./AdminWrapper";
import { fetchAllMentors } from "../../redux/slices/dataSlice";
import Loading from "../Layout/Loading/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ChangePasswordModal from "../Layout/ChangePassword/ChangePasswordModal";

export default function Admin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const { mentors, loading } = useSelector((state) => state.data);
  const { paswordloading } = useSelector((state) => state.account);

  if (!user) {
    navigate("/login");
  }

  useEffect(() => {
    dispatch(fetchAllMentors());
  }, [dispatch]);

  return (
    <AdminWrapper>
      <ToastContainer />
      {loading || paswordloading ? (
        <Loading />
      ) : (
        <>
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
                    <img src="img/navlogo.jpg" alt="" />
                    {/* Name of admin */}
                    <h2> {user.name}</h2>
                    <p>Admin of Tech-mentor</p>
                    <div className="likes-card">
                      <h3>Total Mentors</h3>
                      <p style={{ border: "none" }} className="likes-count">
                        {mentors?.length}
                      </p>
                    </div>

                    <div className="likes-card">
                      <h3>Total Ratings</h3>
                      <p style={{ border: "none" }} className="likes-count">
                        {mentors?.reduce(
                          (count, mentor) => count + mentor.ratings.length,
                          0
                        )}
                      </p>
                    </div>

                    <div className="likes-card">
                      <h3>Total Likes</h3>
                      <p style={{ border: "none" }} className="likes-count">
                        {mentors?.reduce(
                          (count, mentor) => count + mentor.likes.length,
                          0
                        )}
                      </p>
                    </div>

                    <a data-bs-toggle="modal" data-bs-target="#exampleModal">
                      <div className="saveorclose-btn">
                        <button>change password</button>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Change password Model */}

      <ChangePasswordModal />
    </AdminWrapper>
  );
}
