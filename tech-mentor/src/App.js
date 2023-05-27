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
import { UserDashboard } from "./user/UserDashboard";
import { Communication } from "./components/Communication/Communication";
import MentorProfile from "./components/Mentor/MentorProfile";

// const appId = "239573399dceb131";
// const region = "us";
// const appSetting = new CometChat.AppSettingsBuilder()
//   .subscribePresenceForAllUsers()
//   .setRegion(region)
//   .build();
// CometChat.init(appId, appSetting).then(
//   () => {
//     console.log("Initialization completed successfully");
//     // You can now call login function.
//   },
//   (error) => {
//     console.log("Initialization failed with error:", error);
//     // Check the reason for error and take appropriate action.
//   }
// );

// const authKey = "1ac07ca05aafc7ebf4eec044a895c5451eadf638";
// const uid = "user2";

// CometChat.login(uid, authKey).then(
//   (user) => {
//     console.log("Login Successful:", { user });
//   },
//   (error) => {
//     console.log("Login failed with exception:", { error });
//   }
// );

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Mentors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/:id" element={<Admin />} />
        <Route path="/chat" element={<Communication />} />
        <Route path="/me/:id" element={<UserDashboard />} />
        <Route path="/me/:id/edit" element={<EditMentor />} />
        <Route path="/mailrequest" element={<MailRequest />} />
        <Route path="/mentor/:id" element={<MentorDetail />} />
        <Route path="/mentor/:id/profile" element={<MentorProfile />} />
        <Route path="/me/:id/become" element={<BecomeMentor />} />
        <Route path="/admin/:id/requests" element={<Requests />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
