import React, { useEffect, useState } from "react";
import "./EditMentor.css";
import Multiselect from "multiselect-react-dropdown";
import { API_URL } from "../../config";
import axios from "axios";
import { useSelector } from "react-redux";
// import { useLocation } from "react-router";

export default function EditMentor() {
  //   const location = useLocation();
  //   const { mentor } = location.state;
  //   console.log(mentor);
  const user = useSelector((state) => state.auth.user);

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [about, setAbout] = useState("");
  const [isChecked, setIsChecked] = useState(true);
  const [spokenLanguages, setspokenLanguag] = useState([]);
  //   const [email, setEmail] = useState("");
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
  console.log(country);
  console.log(selectedLanguages);
  console.log(selectedSkills);

  useEffect(() => {
    // Fetch mentor details from API
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

  if (!countries || !skills || !languages) {
    return <h6>Loading...</h6>;
  }

  let plainArray = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"];

  let objectArray = [
    { key: "Option 1", cat: "Group 1" },
    { key: "Option 2", cat: "Group 1" },
    { key: "Option 3", cat: "Group 1" },
    { key: "Option 4", cat: "Group 2" },
    { key: "Option 5", cat: "Group 2" },
    { key: "Option 6", cat: "Group 2" },
    { key: "Option 7", cat: "Group 2" },
  ];

  return (
    <div>
      <div className="editprofile">
        <div className="container">
          <div className="edit-profile">
            <h2>Update Profile</h2>
            <form>
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
                      placeholder="I am software developer at surat"
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
                    {/* <select
                      value={spokenLanguages}
                      onChange={(event) =>
                        setspokenLanguag([
                          ...spokenLanguages,
                          event.target.value,
                        ])
                      }
                      multiple
                      className="multiSelect_field"
                    >
                      <option value="chrome">Chrome</option>
                      <option value="firefox">Firefox</option>
                      <option value="opera">Opera</option>
                      <option value="safari">Safari</option>
                      <option value="edge">Edge</option>
                      <option value="vivaldi">Vivaldi</option>
                    </select>
                    <Multiselect
                      showArrow
                      options={plainArray}
                      isObject={false}
                    /> */}
                  </div>

                  {/* <svg xmlns="http://www.w3.org/2000/svg" style="display: none">
                    <symbol
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      id="iconX"
                    >
                      <g stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </g>
                    </symbol>
                  </svg> */}
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
                <div className="deleted-btn">
                  <a href="javascript:void(0)">Delete my account</a>
                </div>
                <div className="saveorclose-btn">
                  <a href="javascriopt:void(0)">Save</a>
                  <a href="javascriopt:void(0)">Close</a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
