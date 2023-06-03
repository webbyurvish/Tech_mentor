import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../MentorPanel/Account.css";
import { useNavigate } from "react-router";
import AdminWrapper from "./AdminWrapper";
import { fetchAllMentors } from "../../redux/slices/dataSlice";
import Loading from "../Layout/Loading";
import { handleResetPasswordSubmit } from "../../redux/slices/accountSlice";
import { changePassword } from "../../redux/slices/authSlice";

export default function Admin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const { mentors, loading } = useSelector((state) => state.data);
  const { paswordloading } = useSelector((state) => state.account);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleresetpasswordsubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: user.email,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };
    dispatch(changePassword(data));
  };

  if (!user) {
    navigate("/login");
  }

  useEffect(() => {
    dispatch(fetchAllMentors());
  }, [dispatch]);

  return (
    <AdminWrapper>
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
        </>
      )}
      {/* Change password Model */}
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
                    Change Password
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
                    <label htmlFor="oldpassword">Old Password</label>
                    <input
                      name="oldpassword"
                      id="oldpassword"
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
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
    </AdminWrapper>
  );
}
