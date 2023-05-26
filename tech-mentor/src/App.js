import Mentors from "./components/Mentor/Mentors";

import { Route, Routes } from "react-router";
import Login from "./components/Login/Login";
import UserPage from "./components/Mentor/MentorProfile";
import "@fortawesome/fontawesome-free/css/all.css";
import MentorDetail from "./components/MentorPanel/MentorDetail";
import EditMentor from "./components/MentorPanel/EditMentor";
import BecomeMentor from "./components/User/BecomeMentor";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import ForgotPassword from "./components/Login/ForgotPassword";
import MailRequest from "./components/Login/MailRequest";
import Admin from "./components/admin/Dashboard";
import Requests from "./components/admin/Requests";
import { CometChat } from "@cometchat-pro/chat";

const appId = "239573399dceb131";
const region = "us";
const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build();
CometChat.init(appId, appSetting).then(
  () => {
    console.log("Initialization completed successfully");
    // You can now call login function.
  },
  (error) => {
    console.log("Initialization failed with error:", error);
    // Check the reason for error and take appropriate action.
  }
);

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Mentors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/me/:id" element={<MentorDetail />} />
        <Route path="/mentor/:id" element={<UserPage />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/mailrequest" element={<MailRequest />} />
        <Route path="/me/:id/edit" element={<EditMentor />} />
        <Route path="/me/:id/become" element={<BecomeMentor />} />
        <Route path="/admin/:id" element={<Admin />} />
        <Route path="/admin/:id/requests" element={<Requests />} />
      </Routes>
    </div>
  );
}

export default App;
