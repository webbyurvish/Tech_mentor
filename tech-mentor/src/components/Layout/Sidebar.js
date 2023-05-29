import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../config";
import axios from "axios";
import { setMentors } from "../../redux/slices/mentorsSlice";

const Sidebar = () => {
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
      <div className="fixed-menu">
        <div className="title-text">
          <h3>FILTER</h3>
          <p>{mentors.length} MENTORS</p>
        </div>
        <form>
          <div className="fillter-cover">
            <div className="filter-input">
              <label htmlFor="text">TECHNOLOGY</label>
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

            <div className="filter-input">
              <label htmlFor="text">COUNTRY</label>
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
            <div className="filter-input">
              <label htmlFor="text">NAME</label>
              <input type="text" list="names" onChange={handleNameChange} />
              <datalist id="names">
                {mentors.map((mentor) => {
                  return <option value={mentor.name} />;
                })}
              </datalist>
            </div>
            <div className="filter-input">
              <label htmlFor="text">LANGUAGE </label>
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
        <div className="myfavourits">
          <p>MY FAVORITES</p>
          <label className="switch">
            <input type="checkbox" />
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
    </div>
  );
};

export default Sidebar;
