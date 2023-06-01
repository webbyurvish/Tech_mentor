import React, { useEffect, useState } from "react";
import "../../components/MentorPanel/EditMentor.css";
import axios from "axios";
import { API_URL } from "../../config";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Multiselect from "multiselect-react-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Layout/Loading";
import UserWrapper from "./UserWrapper";
import {
  fetchCountries,
  fetchLanguages,
  fetchSkills,
} from "../../redux/slices/dataSlice";

export default function BecomeMentor() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const skills = useSelector((state) => state.data.skills);
  const countries = useSelector((state) => state.data.countries);
  const languages = useSelector((state) => state.data.languages);

  const [name, setName] = useState(user.name);
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [about, setAbout] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  //   const [countries, setCountries] = useState(null);
  //   const [skills, setSkills] = useState(null);
  //   const [languages, setLanguages] = useState(null);
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loading, setLoading] = useState(null);

  const [errors, setErrors] = useState({
    titleError: "",
    countryError: "",
    aboutError: "",
    selectedLanguagesError: "",
    selectedSkillsError: "",
  });

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
    // fetch all data for form ( countries , languages and skills )
    dispatch(fetchCountries);
    dispatch(fetchLanguages);
    dispatch(fetchSkills);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    let valid = true;
    const newErrors = {
      titleError: "",
      countryError: "",
      aboutError: "",
      selectedLanguagesError: "",
      selectedSkillsError: "",
    };

    if (title.trim() === "") {
      newErrors.titleError = "Title is required";
      valid = false;
    }

    if (country === "") {
      newErrors.countryError = "Country is required";
      valid = false;
    }

    if (about.trim() === "") {
      newErrors.aboutError = "About is required";
      valid = false;
    } else if (about.length > 400) {
      newErrors.aboutError = "About must be less than 400 characters";
      valid = false;
    }

    if (selectedLanguages.length === 0) {
      newErrors.selectedLanguagesError = "Please select at least one language";
      valid = false;
    }

    if (selectedSkills.length === 0) {
      newErrors.selectedSkillsError = "Please select at least one skill";
      valid = false;
    }

    if (!valid) {
      setErrors(newErrors);
      return;
    }

    const mentorData = {
      name: name,
      title: title,
      about: about,
      email: user.email,
      country: country,
      languageIds: selectedLanguages,
      skillIds: selectedSkills,
      available: isChecked,
    };
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/mentors/add`, mentorData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      console.log(response.data.message);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setLoading(false);
    setErrors({
      titleError: "",
      countryError: "",
      aboutError: "",
      selectedLanguagesError: "",
      selectedSkillsError: "",
    });
  };

  return (
    <UserWrapper>
      <div className="mainwrapper">
        <ToastContainer />
        {(!countries || !skills || !languages || loading) && <Loading />}
        {!loading && countries && skills && languages && (
          <div className="editprofile">
            <div>
              <div className="edit-profile">
                <h2>Become a Mentor</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    {/* Name input ( disabled ) */}
                    <div className="col-lg-6">
                      <div className="profile-input">
                        <label htmlFor="text">
                          <p>Name </p>
                        </label>
                        <input
                          disabled
                          type="text"
                          value={name}
                          onChange={(event) => setName(event.target.value)}
                        />
                      </div>
                    </div>
                    {/* mentor Title input */}
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
                        {errors.titleError && (
                          <p className="error">{errors.titleError}</p>
                        )}
                      </div>
                    </div>
                    {/* About textarea input */}
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
                        {errors.aboutError && (
                          <p className="error">{errors.aboutError}</p>
                        )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="profile-input">
                        {/* country input dropdown */}
                        <label htmlFor="text">Country</label>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          value={country}
                          onChange={handleCountryChange}
                        >
                          <option value="">Select your Country</option>
                          {countries.map((country) => (
                            <option key={country.id} value={country.name}>
                              {country.name}
                            </option>
                          ))}
                        </select>
                        {errors.countryError && (
                          <p className="error">{errors.countryError}</p>
                        )}
                      </div>
                    </div>

                    {/* multiselect for languages */}
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
                        {errors.selectedLanguagesError && (
                          <p className="error">
                            {errors.selectedLanguagesError}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* multi select for skills */}
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
                        {errors.selectedSkillsError && (
                          <p className="error">{errors.selectedSkillsError}</p>
                        )}
                      </div>
                    </div>
                    {/* Email input (disabled) */}
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
                      Please define how would you like to drive the mentorship
                      and how many mentees you can take.
                    </span>

                    {/* Checkbox for user is available for mentorship or not */}
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
                    <div className="saveorclose-btn">
                      <button type="submit">send request</button>
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
        )}
      </div>
    </UserWrapper>
  );
}
