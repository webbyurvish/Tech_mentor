import Mentors from "./components/Mentor/Mentors";
import { Route, Routes } from "react-router";
import Login from "./components/Login/Login";
import "@fortawesome/fontawesome-free/css/all.css";
import MentorDetail from "./components/MentorPanel/MentorDetail";
import EditMentor from "./components/MentorPanel/EditMentor";
import ForgotPassword from "./components/Login/ForgotPassword";
import MailRequest from "./components/Login/MailRequest";
import Admin from "./components/admin/Dashboard";
import Requests from "./components/admin/Requests";
import { CometChat } from "@cometchat-pro/chat";
import UserDashboard from "./components/user/UserDashboard";
import MentorProfile from "./components/Mentor/MentorProfile";
import ChatWithMentor from "./components/chat/ChatWithMentor";
import ChatWithAdmin from "./components/chat/ChatWithAdmin";
import AdminChat from "./components/admin/AdminChat";
import UserChat from "./components/user/UserChat";
import BecomeMentor from "./components/user/BecomeMentor";
import MentorChat from "./components/Mentor/MentorChat";
const appId = process.env.REACT_APP_COMETCHAT_APP_ID;

const region = process.env.REACT_APP_COMETCHAT_REGION;
const appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .build();
CometChat.init(appId, appSetting).then(
  () => {
    console.log("Initialization completed successfully");
  },
  (error) => {
    console.log("Initialization failed with error:", error);
  }
);

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Mentors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/:id" element={<Admin />} />
        <Route path="/me/:id" element={<UserDashboard />} />
        <Route path="/me/:id/edit" element={<EditMentor />} />
        <Route path="/mailrequest" element={<MailRequest />} />
        <Route path="/mentor/:id" element={<MentorDetail />} />
        <Route path="/mentor/:id/profile" element={<MentorProfile />} />
        <Route path="/me/:id/become" element={<BecomeMentor />} />
        <Route path="/admin/:id/requests" element={<Requests />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/user/:id/chat" element={<UserChat />} />
        <Route path="/mentor/:id/chat" element={<MentorChat />} />
        <Route path="/chatwithmentor/:uid" element={<ChatWithMentor />} />
        <Route path="/chatwithadmin/:uid" element={<ChatWithAdmin />} />
        <Route path="/admin/chat" element={<AdminChat />} />
      </Routes>
    </div>
  );
}

export default App;
