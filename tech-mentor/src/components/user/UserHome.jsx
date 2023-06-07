import React, { useState } from "react";
import UserWrapper from "./UserWrapper";
import { useDispatch, useSelector } from "react-redux";
import "../MentorPanel/Styles/Account.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Layout/Loading/Loading";
import { changePassword } from "../../redux/slices/authSlice";
import ChangePasswordModal from "../Layout/ChangePassword/ChangePasswordModal";

export default function UserHome() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const { loading } = useSelector((state) => state.account);

  return (
    <UserWrapper>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ToastContainer />
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
                    {/* User Name */}
                    <h2 style={{ marginBottom: "30px" }}>{user.name}</h2>
                    {/* User Email */}

                    <h6 style={{ marginBottom: "30px" }}>{user.email}</h6>
                    {/* user's profile image */}
                    <img src={user.imageUrl} alt="" />
                    {/* change password button ( on click its open a modal ) */}
                    <div>
                      <a
                        href="javascript:vid(0)"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <div className="saveorclose-btn">
                          <button>change password</button>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Change password Modal */}
      <ChangePasswordModal />
    </UserWrapper>
  );
}
