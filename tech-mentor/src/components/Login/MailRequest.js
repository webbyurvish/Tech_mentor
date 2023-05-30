import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser } from "../../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
// import "./MailRequest.css";
import { API_URL } from "../../config";
import axios from "axios";
import { sendMail } from "./AuthServices";

export default function MailRequest() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSendMail = async (event) => {
    event.preventDefault();

    try {
      // Send a POST request to the backend API endpoint
      setLoading(true);

      const response = sendMail(email)

      // const response = await axios.post(
      //   `${API_URL}/account/forgotpassword`,
      //   email,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );

      //   setMessage("");
      setLoading(false);
      setSuccessMessage(response.data.message);
      setEmailSent(true);

      toast.success(response.data.message);
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("You are not registered");
      } else {
        toast.error("An error occurred. Please try again.");
      }
      setSuccessMessage("");
    }
  };

  return (
    <div className="wrapper">
      {loading && <div className="sbl-circ-ripple"></div>}
      <ToastContainer />
      {!loading && (
        <div className="passwordcontainer" id="container">
          <div className="form-container passwordsign-in-container">
            {successMessage.length > 0 && (
              <body className="bodyformail">
                <div className="cardformail">
                  <div className="divformail">
                    <i className="checkmark iformail">✓</i>
                  </div>
                  <h1 className="h1formail">Mail Sent</h1>
                  <p className="pformail">
                    We Sent mail for reset password Check your mail !!!
                  </p>
                  {/* <Link to={"/login"}>Back to login</Link> */}
                </div>
                {/* <a onClick={setSuccessMessage("")}>Resend Mail</a> */}
              </body>
            )}

            {!emailSent && (
              <form className="formmail" onSubmit={handleSendMail}>
                <h1 className="h1mail">Forgot Password</h1>
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  required
                  onChange={(event) => setEmail(event.target.value)}
                />
                <Link className="a" to={"/login"}>
                  Go back to login
                </Link>
                <button className="button" type="submit">
                  Send Mail
                </button>
              </form>
            )}
            {/* <Link className="a" to={"/login"}>
              Go back to login
            </Link> */}
          </div>
        </div>
      )}
    </div>
  );
}
