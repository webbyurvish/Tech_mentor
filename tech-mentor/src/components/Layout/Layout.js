import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setTechnology,
  setCountry,
  setSpokenLanguage,
  setName,
  setLiked,
} from "../../redux/slices/filterSlice";
import "./Layout.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomPagination from "./Pagination";
import { Header } from "./Header";
import {
  fetchCountries,
  fetchLanguages,
  fetchSkills,
  setCurrentPage,
} from "../../redux/slices/dataSlice";
import { fetchData } from "../../redux/slices/resultSlice";
import { useNavigate } from "react-router";

export const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const result = useSelector((state) => state.result);
  const countries = useSelector((state) => state.data.countries);
  const skills = useSelector((state) => state.data.skills);
  const languages = useSelector((state) => state.data.languages);
  const filters = useSelector((state) => state.filters);

  const userId = user !== null ? Number(user.id) : null;

  const currentPage = useSelector((state) => state.data.currentPage);

  useEffect(() => {
    dispatch(
      fetchData(
        filters.technology,
        filters.country,
        filters.name,
        filters.spokenLanguage,
        currentPage,
        filters.isLiked,
        userId
      )
    );

    dispatch(fetchCountries);
    dispatch(fetchLanguages);
    dispatch(fetchSkills);
  }, [filters, currentPage, dispatch]);

  if (!result.mentors) {
    return <h1>loading</h1>;
  }

  const handleTechnologyChange = (e) => {
    const selectedTechnology = e.target.value;
    navigate("/");
    dispatch(
      setTechnology(selectedTechnology !== "" ? selectedTechnology : null)
    );
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    navigate("/");
    dispatch(setCountry(selectedCountry !== "" ? selectedCountry : null));
  };

  const handleNameChange = (e) => {
    const selectedName = e.target.value;
    navigate("/");
    dispatch(setName(selectedName !== "" ? selectedName : null));
  };

  const handleLikedChange = (e) => {
    const checked = e.target.checked; // Use checked instead of value
    navigate("/");
    dispatch(setLiked(checked));
  };

  const handleSpokenLanguageChange = (e) => {
    const selectedSpokenLanguage = e.target.value;
    // navigate("/");
    dispatch(
      setSpokenLanguage(
        selectedSpokenLanguage !== "" ? selectedSpokenLanguage : null
      )
    );
  };

  return (
    <div>
      <ToastContainer />
      <Header />
      <div className="main-cover">
        <div className="container-fluid">
          <div className="fixed-menu">
            <div className="title-text">
              <h3>FILTER</h3>
              <p>{result.mentors.length} MENTORS</p>
            </div>
            <form>
              <div className="fillter-cover">
                <div className="filter-input">
                  <label htmlFor="text">TECHNOLOGY</label>
                  <input
                    type="text"
                    list="skills"
                    value={filters.technology}
                    onChange={handleTechnologyChange}
                  />
                  <datalist id="skills">
                    {skills.map((skill, index) => {
                      return <option key={index} value={skill.name} />;
                    })}
                  </datalist>
                </div>

                <div className="filter-input">
                  <label htmlFor="text">COUNTRY</label>
                  <input
                    type="text"
                    list="countries"
                    value={filters.country}
                    onChange={handleCountryChange}
                  />
                  <datalist id="countries">
                    {countries.map((country, index) => {
                      return <option key={index} value={country.name} />;
                    })}
                  </datalist>
                </div>
                <div className="filter-input">
                  <label htmlFor="text">NAME</label>
                  <input
                    type="text"
                    value={filters.name}
                    list="names"
                    onChange={handleNameChange}
                  />
                  <datalist id="names">
                    {result.mentors.map((mentor, index) => {
                      return <option key={index} value={mentor.name} />;
                    })}
                  </datalist>
                </div>
                <div className="filter-input">
                  <label htmlFor="text">LANGUAGE </label>
                  <input
                    type="text"
                    list="languages"
                    value={filters.spokenLanguage}
                    onChange={handleSpokenLanguageChange}
                  />
                  <datalist id="languages">
                    {languages.map((language, index) => {
                      return <option key={index} value={language.name} />;
                    })}
                  </datalist>
                </div>
              </div>
            </form>
            <div className="myfavourits">
              <p>MY FAVORITES</p>
              <label className="switch">
                <input
                  checked={filters.isLiked}
                  onChange={handleLikedChange}
                  type="checkbox"
                />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="social-icon">
              <ul>
                <li>
                  <a href="javascript:void(0)">
                    <i className="fa-brands fa-github"></i>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i className="fa-brands fa-square-facebook"></i>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <i className="fa-brands fa-instagram"></i>
                  </a>
                </li>
              </ul>
            </div>
            <div className="social-link">
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
