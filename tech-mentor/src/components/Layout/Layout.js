import { Children, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/authSlice";
import "./Layout.css";
// import "./Pagination.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { API_URL } from "../../config";
import { setMentors } from "../../redux/slices/mentorsSlice";
import axios from "axios";
import CustomPagination from "./Pagination";
import { Header } from "./Header";

export const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const mentors = useSelector((state) => state.mentors.mentors.items);

  const [countries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [skills, setSkills] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [spokenLanguage, setSpokenLanguage] = useState("");
  const [country, setCountry] = useState("");
  const [technology, setTechnology] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/mentors`, {
          params: {
            technology: technology,
            country: country,
            name: name,
            spokenLanguage: spokenLanguage,
            pageNumber: currentPage,
            pageSize: 3, // Number of items per page
          },
        });

        dispatch(setMentors(response.data));
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error(error);
      }
    };

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

    fetchData();
    fetchCountries();
    fetchLanguages();
    fetchSkills();
  }, [technology, country, name, spokenLanguage, currentPage]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (!mentors) {
    return <h1>loading</h1>;
  }

  const handleTechnologyChange = (e) => {
    setTechnology(e.target.value);
    console.log(e);
  };

  const handleCountryChange = (e) => {
    setCountry(e.target.value);
    console.log(e);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSpokenLanguageChange = (e) => {
    setSpokenLanguage(e.target.value);
  };

  return (
    <div>
      <ToastContainer />

      <Header />
      <div className="main-cover">
        <div className="container-fluid">
          <div class="fixed-menu">
            <div class="title-text">
              <h3>FILTER</h3>
              <p>{mentors.length} MENTORS</p>
            </div>
            <form>
              <div class="fillter-cover">
                <div class="filter-input">
                  <label for="text">TECHNOLOGY</label>
                  <input
                    type="text"
                    list="skills"
                    onChange={handleTechnologyChange}
                  />
                  <datalist id="skills">
                    {skills.map((skill) => {
                      return <option value={skill.name} />;
                    })}
                  </datalist>
                </div>

                <div class="filter-input">
                  <label for="text">COUNTRY</label>
                  <input
                    type="text"
                    list="countries"
                    onChange={handleCountryChange}
                  />
                  <datalist id="countries">
                    {countries.map((country) => {
                      return <option value={country.name} />;
                    })}
                  </datalist>
                </div>
                <div class="filter-input">
                  <label for="text">NAME</label>
                  <input type="text" list="names" onChange={handleNameChange} />
                  <datalist id="names">
                    {mentors.map((mentor) => {
                      return <option value={mentor.name} />;
                    })}
                  </datalist>
                </div>
                <div class="filter-input">
                  <label for="text">LANGUAGE </label>
                  <input
                    type="text"
                    list="languages"
                    onChange={handleSpokenLanguageChange}
                  />
                  <datalist id="languages">
                    {languages.map((language) => {
                      return <option value={language.name} />;
                    })}
                  </datalist>
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
                  <div>
                    {children}
                    <div>
                      <CustomPagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                        handlePageChange={(page) => handlePageChange(page)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
