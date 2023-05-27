import React from "react";
import UserWrapper from "./UserWrapper";
import { useSelector } from "react-redux";
import "../components/MentorPanel/Account.css";

export const UserHome = () => {
  const user = useSelector((state) => state.auth.user);
  console.log(user);

  return (
    <UserWrapper>
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
                <h2>{user.name}</h2>
                {/* <p>Admin of Tech-mentor</p> */}
                <img src={`https://localhost:7022${user.imageUrl}`} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserWrapper>
  );
};
