import Mentors from "./components/Mentor/Mentors";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "./config";
import { Route, Routes } from "react-router";
import Login from "./components/Login/Login";
import UserPage from "./components/Mentor/MentorProfile";
import "@fortawesome/fontawesome-free/css/all.css";
import MentorDetail from "./components/MentorPanel/MentorDetail";
import EditMentor from "./components/MentorPanel/EditMentor";
import BecomeMentor from "./components/User/BecomeMentor";
import { setMentors } from "./redux/slices/mentorsSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function App() {
  // const [mentors, setMentors] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const mentors = useSelector((state) => state.mentors.mentors);
  console.log(mentors);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await axios.get(`${API_URL}/mentors/all`);

        dispatch(setMentors(response.data));
        setMentors(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
        dispatch(setMentors([])); // Set mentors to an empty array on error
        // setMentors([]);
      }
    };
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
        <Route path="/me/:id/become" element={<BecomeMentor />} />
      </Routes>
    </div>
  );
}

export default App;
