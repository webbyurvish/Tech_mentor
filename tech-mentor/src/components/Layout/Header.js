import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../redux/slices/authSlice";

export const Header = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const [menu, setmenu] = useState(false);

  const handleShowMenu = () => {
    setmenu((prevstate) => !prevstate);
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    setmenu((prevstate) => !prevstate);
  };

  return (
    <div>
      <header className="header">
        <div className="container-fluid">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-8">
              <div className="logo-and-navbar">
                <div className="logo">
                  <a href="javascript:void(0)">
                    <img
                      src="/images/circle.png"
                      width={120}
                      height={40}
                      alt=""
                    />
                  </a>
                </div>
                <div className="nav-bar">
                  <ul>
                    <li>
                      <a href="/about">About</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">Mentorship Guidelines</a>
                    </li>
                    <li>
                      <a href="javascript:void(0)">Sessions Calendar</a>
                    </li>
                    {user && user.role == "user" && (
                      <li>
                        <Link to={`/me/${user.id}/become`}>
                          Become a mentor
                        </Link>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="login-register">
                {user && (
                  <a>
                    <img
                      onClick={handleShowMenu}
                      src="/images/user.png"
                      width={50}
                      height={50}
                      alt=""
                    />
                  </a>
                )}

                {menu && (
                  <div className="manageandlogin">
                    {user && user.role == "mentor" && (
                      <Link to={`/me/${Number(user.id)}`}>Dashboard</Link>
                    )}
                    {user && user.role == "admin" && (
                      <Link to={`/admin/${Number(user.id)}`}>Dashboard</Link>
                    )}

                    {user && user.role !== "admin" && (
                      <Link to={`/me/${Number(user.id)}`}>MentorShips</Link>
                    )}

                    <a onClick={handleLogout} href="javascript:void(0)">
                      Logout
                    </a>
                  </div>
                )}

                {!user && <a href="/login"> "Login / Register"</a>}
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
