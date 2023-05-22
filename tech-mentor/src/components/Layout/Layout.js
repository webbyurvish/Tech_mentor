import { Children, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import "./Layout.css";
import { Link } from "react-router-dom";
import { logoutMentor } from "../../redux/slices/mentorSlice";

export const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [menu, setmenu] = useState(false);
  console.log(user);

  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(logoutMentor());
    setmenu((prevstate) => !prevstate);
  };

  const handleShowMenu = () => {
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
                    {user && !user.isMentor && (
                      <li>
                        <a href="javascript:void(0)">Become a mentor</a>
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
                    {user.isMentor && (
                      <Link to={`/me/${user.id}`}>Manage Account</Link>
                    )}

                    {!user.isMentor && (
                      <Link to={`/me/${user.id}`}>MentorShips</Link>
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
      <div className="main-cover">
        <div className="container-fluid">
          <div class="fixed-menu">
            <div class="title-text">
              <h3>FILTER</h3>
              <p>1038 MENTORS</p>
            </div>
            <form>
              <div class="fillter-cover">
                <div class="filter-input">
                  <label for="text">TECHNOLOGY</label>
                  <input type="text" />
                </div>
                <div class="filter-input">
                  <label for="text">COUNTRY</label>
                  <input type="text" />
                </div>
                <div class="filter-input">
                  <label for="text">NAME</label>
                  <input type="text" />
                </div>
                <div class="filter-input">
                  <label for="text">LANGUAGE </label>
                  <input type="text" />
                </div>
              </div>
            </form>
            <div class="myfavourits">
              <p>MY FAVORITES</p>
              <label class="switch">
                <input type="checkbox" />
                <span class="slider round"></span>
              </label>
            </div>
            <div class="social-icon">
              <ul>
                <li>
                  <a href="javascript:void(0)">
                    <i class="fa-brands fa-github"></i>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i class="fa-brands fa-square-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i class="fa-brands fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div class="social-link">
              <ul>
                <li>
                  <a href="javascript:void(0)">Cookies policy</a>
                </li>
                <li>
                  <a href="javascript:void(0)">Code of Conduct</a>
                </li>
                <li>
                  <a href="javascript:void(0)">Terms & Conditions</a>
                </li>
                <li>
                  <a href="javascript:void(0)">Privacy Statement</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="right-side-section">
            <div className="row">
              <div className="col-lg-12">
                <div className="mentor-card">
                  <div>{children}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
