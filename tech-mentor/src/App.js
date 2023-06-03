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
import MentorProfile from "./components/Mentor/MentorProfile";
import ChatWithMentor from "./components/chat/ChatWithMentor";
import ChatWithAdmin from "./components/chat/ChatWithAdmin";
import UserChat from "./components/user/UserChat";
import BecomeMentor from "./components/user/BecomeMentor";
import MentorChat from "./components/Mentor/MentorChat";
import AdminChat from "./components/admin/AdminChat";
import UserHome from "./components/user/UserHome";
import Yt from "./Youtube/components/Yt";
import PlayVideo from "./Youtube/components/PlayVideo";
import About from "./components/Layout/About/About";

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

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Mentors />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/:id" element={<Admin />} />
        <Route path="/user/:id" element={<UserHome />} />
        <Route path="/mentor/:id/edit" element={<EditMentor />} />
        <Route path="/mailrequest" element={<MailRequest />} />
        <Route path="/mentor/:id" element={<MentorDetail />} />
        <Route path="/mentor/:id/profile" element={<MentorProfile />} />
        <Route path="/user/:id/become" element={<BecomeMentor />} />
        <Route path="/admin/:id/requests" element={<Requests />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/user/:id/chat" element={<UserChat />} />
        <Route path="/mentor/:id/chat" element={<MentorChat />} />
        <Route path="/admin/:id/chat" element={<AdminChat />} />
        <Route path="/chatwithmentor/:uid" element={<ChatWithMentor />} />
        <Route path="/chatwithadmin/:uid" element={<ChatWithAdmin />} />
        <Route path="/videos" element={<Yt />} />
        <Route path="/videos/play/:id" element={<PlayVideo />} />
      </Routes>
    </div>
  );
}
