import React, { useEffect, useState } from "react";
import "./EditMentor.css";
import Multiselect from "multiselect-react-dropdown";
import { API_URL } from "../../config";
import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import {
  setMentorDetails,
  updateMentorDetails,
} from "../../redux/slices/mentorSlice";

export default function EditMentor() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const mentor = useSelector((state) => state.mentor.details);

  const [name, setName] = useState(user.name);
  const [title, setTitle] = useState(mentor.title);
  const [country, setCountry] = useState(mentor.country);
  const [about, setAbout] = useState(mentor.about);
  const [isChecked, setIsChecked] = useState(true);
  const [countries, setCountries] = useState(null);
  const [skills, setSkills] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleLanguagesSelection = (selectedList, selectedItem) => {
    const ids = selectedList.map((item) => item.id);
    setSelectedLanguages(ids);
  };

  const handleSkillsSelection = (selectedList, selectedItem) => {
    const ids = selectedList.map((item) => item.id);
    setSelectedSkills(ids);
  };

  useEffect(() => {
    // Fetch mentor details from API
    const fetchMentorDetails = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/mentors/get/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response);
        dispatch(setMentorDetails(response.data));
      } catch (error) {
        console.log(error);
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

    fetchMentorDetails();
    fetchCountries();
    fetchLanguages();
    fetchSkills();
  }, [user.email]);

  if (!countries || !skills || !languages) {
    return <h6>Loading...</h6>;
  }

  if (!mentor) {
    return <h1>Loading...</h1>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const mentorData = {
      id: user.id,
      name: name,
      title: title.length > 0 ? title : null,
      about: about.length > 0 ? about : null,
      email: user.email,
      country: country,
      languageIds: selectedLanguages.length > 0 ? selectedLanguages : null,
      skillIds: selectedSkills.length > 0 ? selectedSkills : null,
      available: isChecked,
    };

    console.log(mentorData);

    try {
      dispatch(updateMentorDetails(mentorData));
      toast.success("details updated successfully");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="mainwrapper">
      <ToastContainer />
      <div className="editprofile">
        <div>
          <div className="edit-profile">
            <h2>Update Profile</h2>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-lg-6">
                  <div className="profile-input">
                    <label htmlFor="text">
                      <p>Name </p>(Please use your real name)
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="profile-input">
                    <label htmlFor="text">
                      <p>Title </p>(e.g. Software Developer)
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(event) => setTitle(event.target.value)}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="profile-input">
                    <label htmlFor="text">
                      <p>About </p>
                      (Up to 400 characters)
                    </label>
                    <textarea
                      name="text"
                      value={about}
                      onChange={(event) => setAbout(event.target.value)}
                      placeholder="brief about you..."
                      id=""
                      cols="30"
                      rows="3"
                    ></textarea>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="profile-input">
                    <label htmlFor="text">Country</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      value={country}
                      onChange={handleCountryChange}
                    >
                      <option selected>Select your Country</option>
                      {countries.map((country) => (
                        <option key={country.id} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="multiSelect">
                    <label htmlFor="text">Spoken Languages</label>
                    <Multiselect
                      options={languages}
                      selectionLimit="5"
                      displayValue="name"
                      onSelect={handleLanguagesSelection}
                      onRemove={handleLanguagesSelection}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="multiSelect">
                    <label htmlFor="text">Skills (Up to 10)</label>

                    <Multiselect
                      options={skills}
                      selectionLimit="10"
                      displayValue="name"
                      onSelect={handleSkillsSelection}
                      onRemove={handleSkillsSelection}
                      className="multiSelect_field"
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="profile-input">
                    <label htmlFor="text">
                      <p>Email </p>
                    </label>
                    <input disabled type="email" value={user.email} />
                  </div>
                </div>
              </div>
              <div className="form-text">
                <p>Available for new mentees</p>
                <span>
                  Please define how would you like to drive the mentorship and
                  how many mentees you can take.
                </span>
                <div className="formcheckinput">
                  <label htmlFor="checkbox-text">
                    <input
                      type="checkbox"
                      name=""
                      id="checkbox-text"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    Available for new mentees
                  </label>
                </div>
                {/* <div className="deleted-btn">
                  <a onClick={handleDelete} href="javascript:void(0)">
                    Delete my account
                  </a>
                </div> */}
                <div className="saveorclose-btn">
                  <button type="submit">Save</button>
                  <Link
                    to="javascriopt:void(0)"
                    onClick={() => window.history.back()}
                  >
                    Close
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
