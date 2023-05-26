import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import "./admin.css";
import axios from "axios";
import { API_URL } from "../../config";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [rejectmessage, setRejectMessage] = useState("");
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mail, setMail] = useState("");

  const handleApprove = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(
        `${API_URL}/admin/approve`,
        e.target.value,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(response.data.message);

      setRequests(
        requests.filter((request) => request.email !== e.target.value)
      );
    } catch (error) {
      toast.error(error);
    }
    setLoading(false);
    setToggle(false);
  };

  const handlesubmit = async () => {
    // e.preventDefault();
    const email = mail;
    console.log(email);

    const data = { email: email, rejectmessage: rejectmessage };

    setLoading(true);

    try {
      const response = await axios({
        method: "DELETE",
        url: `${API_URL}/admin/reject`,
        data: data,
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success(response.data.message);

      setRequests(requests.filter((request) => request.email !== mail));
    } catch (error) {
      toast.error(error);
    }
    setLoading(false);
    setToggle(false);
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/requests`);
        console.log(response);
        setRequests(response.data);
      } catch (error) {
        return error.response;
      }
    };

    fetchRequests();
  }, []);

  return (
    <>
      <Wrapper>
        <ToastContainer />
        <div className="managment-account">
          <div className="container-fluid">
            <div className="account-side-bar">
              <div className="account-right-side">
                <div className="accont-home">
                  <h2>Requests to become a mentor</h2>
                </div>
              </div>
              <div className="account-profile">
                <div className="accound-cover">
                  <div className="row justify-content-center">
                    <div className="col-lg-4">
                      <div className="profile-details details-cover">
                        <div className="share-details-2">
                          <p>My Mentorship Requests</p>
                          {requests.length < 1 && (
                            <p>There is no request to become a mentor</p>
                          )}
                          {requests.map((request) => {
                            const isToggled =
                              toggle && request.email === toggle;
                            return (
                              <div
                                key={request.email}
                                onClick={() => {
                                  setToggle(isToggled ? false : request.email);
                                }}
                                className={`mentorship-profile-detail ${
                                  isToggled ? "toggled" : ""
                                }`}
                              >
                                <a href="javascript:void(0)">
                                  <div className="poifile-details">
                                    <img src="/images/navlogo.jpg" alt="" />
                                    <div className="poifile-details-cover">
                                      <p>{request.name}</p>
                                      <span>{request.title}</span>
                                    </div>
                                  </div>
                                  <div className="mentorship-day"></div>
                                </a>
                                {isToggled && (
                                  <div>
                                    <div className="details-message-cover">
                                      <p>Name</p>
                                      <ul>
                                        <li>{request.name}</li>
                                      </ul>
                                    </div>
                                    <div className="details-message-cover">
                                      <p>About</p>
                                      <ul>
                                        <li>{request.about}</li>
                                      </ul>
                                    </div>
                                    <div className="details-message-cover">
                                      <p>Languages known</p>
                                      <ul>
                                        {request.languages.map((language) => (
                                          <li>{language}</li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div className="details-link">
                                      {!loading && (
                                        <button
                                          className="approve-button"
                                          value={request.email}
                                          onClick={handleApprove}
                                        >
                                          Approve
                                        </button>
                                      )}
                                      {loading && (
                                        <button className="approve-button">
                                          Loading...
                                        </button>
                                      )}

                                      <button
                                        className="reject-button"
                                        variant="primary"
                                        value={request.email}
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => setMail(request.email)}
                                      >
                                        Reject
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Mentorship Request
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="reject-reason">
                <label for="text">Reason to reject user's request</label>
                <textarea
                  type="text"
                  value={rejectmessage}
                  onChange={(e) => setRejectMessage(e.target.value)}
                  rows={4}
                  cols={20}
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              {loading ? (
                <button type="submit" className="btn btn-primary" disabled>
                  Loading...
                </button>
              ) : (
                <button
                  type="submit"
                  onClick={handlesubmit}
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Requests;
