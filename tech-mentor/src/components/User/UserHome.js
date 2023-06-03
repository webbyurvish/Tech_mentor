import React, { useState } from "react";
import UserWrapper from "./UserWrapper";
import { useDispatch, useSelector } from "react-redux";
import "../MentorPanel/Account.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { handleResetPasswordSubmit } from "../../redux/slices/accountSlice";
import Loading from "../Layout/Loading";
import { changePassword } from "../../redux/slices/authSlice";

export default function UserHome() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { loading } = useSelector((state) => state.account);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // on submit password change model
  const handleresetpasswordsubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: user.email,
      oldPassword,
      newPassword,
    };

    dispatch(changePassword(data));
  };

  return (
    <UserWrapper>
      {loading ? (
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
                    <div className="share-details">
                      <a href="javascript:void(0)">
                        <i className="fa-solid fa-share-nodes"></i>
                      </a>
                    </div>
                    <img src="img/navlogo.jpg" alt="" />
                    {/* User Name */}
                    <h2>{user.name}</h2>
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
      <ToastContainer />

      {/* Change password Modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {user && (
              <>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Reset Password
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <div>
                    {/* old password input */}
                    <label htmlFor="oldpassword">Old Password</label>
                    <input
                      name="oldpassword"
                      id="oldpassword"
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                    {/* new Password input */}
                    <label htmlFor="newpassword">New Password</label>
                    <input
                      name="newpassword"
                      id="newpassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
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
                    onClick={handleresetpasswordsubmit}
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
    </UserWrapper>
  );
}
