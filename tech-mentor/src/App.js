import Mentors from "./components/Mentor/Mentors";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "./config";
import { Route, Routes } from "react-router";
import Login from "./components/Login/Login";
import UserPage from "./components/Mentor/MentorProfile";
import "@fortawesome/fontawesome-free/css/all.css";
import Account from "./components/MentorPanel/Account";
import MentorDetail from "./components/MentorPanel/MentorDetail";
import EditMentor from "./components/MentorPanel/EditMentor";

function App() {
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    async function fetchMentors() {
      try {
        const response = await axios.get(`${API_URL}/mentors/all`);
        setMentors(response.data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
        setMentors([]); // Set mentors to an empty array on error
      }
    }

    fetchMentors();
  }, []);

  console.log(mentors);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Mentors mentors={mentors} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/me/:id" element={<MentorDetail />} />
        <Route path="/me/:id/edit" element={<EditMentor />} />
        <Route path="/mentor/:id" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
