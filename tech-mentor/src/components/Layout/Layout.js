import { Children, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import "./Layout.css";
import { Link } from "react-router-dom";
import { logoutMentor } from "../../redux/slices/mentorSlice";
import { Dropdown } from "semantic-ui-react";
import { API_URL } from "../../config";
import { setMentors } from "../../redux/slices/mentorsSlice";
import axios from "axios";

export const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const mentors = useSelector((state) => state.mentors.mentors);

  const [countries, setCountries] = useState([]);
  const [names, setNames] = useState(mentors.map((mentor) => mentor.name));
  const [languages, setLanguages] = useState([]);
  const [skills, setSkills] = useState([]);

  //   const [mentorskills, setMentorsSkills] = useState([]);
  //   const [languages, setLanguages] = useState(null);

  const [spokenLanguage, setSpokenLanguage] = useState("");
  const [country, setCountry] = useState("");
  const [technology, setTechnology] = useState("");
  const [name, setName] = useState("");

  const [menu, setmenu] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(`${API_URL}/data/countries`);
        setCountries(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchLanguages = async () => {
      try {
        const response = await axios.get(`${API_URL}/data/languages`);
        setLanguages(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSkills = async () => {
      try {
        const response = await axios.get(`${API_URL}/data/skills`);
        setSkills(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountries();
    fetchLanguages();
    fetchSkills();
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    setmenu((prevstate) => !prevstate);
  };

  const handleShowMenu = () => {
    setmenu((prevstate) => !prevstate);
  };

  if (!mentors) {
    return <h1>loading</h1>;
  }

  const handleFilterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${API_URL}/mentors`, {
        params: {
          technology: technology,
          country: country,
          name: name,
          spokenLanguage: spokenLanguage,
        },
      });

      setMentors(response.data);
    } catch (error) {
      console.error(error);
    }
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
                  <input
                    type="text"
                    value={technology}
                    onChange={(e) => setTechnology(e.target.value)}
                  />
                  {/* <select name="selectList" id="selectList">
                      <option value="option 1">Option 1</option> 
                    <option value="option 2">Option 2</option>
                  </select> */}
                  {/* <Dropdown
                    placeholder="Select Country"
                    fluid
                    search
                    selection
                    options={skills}
                  /> */}
                </div>
                <div class="filter-input">
                  <label for="text">COUNTRY</label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                </div>
                <div class="filter-input">
                  <label for="text">NAME</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div class="filter-input">
                  <label for="text">LANGUAGE </label>
                  <input
                    type="text"
                    value={spokenLanguage}
                    onChange={(e) => setSpokenLanguage(e.target.value)}
                  />
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
