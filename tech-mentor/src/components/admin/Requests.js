import React, { useEffect, useState } from "react";
import Wrapper from "./Wrapper";
import "./admin.css";
import axios from "axios";
import { API_URL } from "../../config";
import { Button, Modal } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "react-bootstrap/Form";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [rejectmessage, setRejectMessage] = useState("");
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  console.log(rejectmessage);

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

      setLoading(false);
      toast.success(response.data.message);
      setToggle(false);

      setRequests(
        requests.filter((request) => request.email !== e.target.value)
      );
    } catch (error) {
      toast.error(error);
    }
  };

  const handleReject = async (e) => {
    e.preventDefault();
    const data = { email: e.target.value, rejectmessage: rejectmessage };
    console.log(data);
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

      setLoading(false);
      toast.success(response.data);
      setToggle(false);

      setRequests(
        requests.filter((request) => request.email !== e.target.value)
      );
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/requests`);
        console.log(response);
        setRequests(response.data);
        // dispatch(setMentorDetails(response.data));
      } catch (error) {
        return error.response;
      }
    };

    fetchRequests();
  }, []);

  //   const toggleRequest = (email) => {
  //     setToggledRequests((prevToggledRequests) => ({
  //       ...prevToggledRequests,
  //       [email]: !prevToggledRequests[email],
  //     }));
  //   };

  console.log(requests);
  return (
    <>
      <Wrapper>
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
                    {/* <div className="col-lg-4">
                      <div className="profile-details">
                        <div className="share-details-2">
                          <p>Mentorship Requests</p>
                          <div className="mentorship-profile-detail">
                            <a href="javascript:void(0)">
                              <div className="poifile-details">
                                <img src="/images/navlogo.jpg" alt="" />
                                <div className="poifile-details-cover">
                                  <p>
                                    Urvish Vaghas....
                                    <span className="green-color">
                                      Approved
                                    </span>
                                  </p>
                                  <span>Full stack web....</span>
                                </div>
                              </div>
                              <div className="mentorship-day">
                                <p>4 Days Ago</p>
                              </div>
                            </a>
                          </div>
                          <div className="details-message">
                            <div className="details-message-cover">
                              <p>Message</p>
                              <span>
                                Please help me in this for better understanging
                                in my internship
                              </span>
                            </div>
                            <div className="details-message-cover">
                              <p>Message</p>
                              <span>
                                Please help me in this for better understanging
                                in my internship
                              </span>
                            </div>
                            <div className="details-message-cover">
                              <p>Message</p>
                              <span>
                                Please help me in this for better understanging
                                in my internship
                              </span>
                            </div>
                            <div className="details-link">
                              <a href="javascript:void(0)">Video Call</a>
                              <a href="javascript:void(0)">Send a message </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
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
                                      <p>
                                        {request.name}
                                        {/* <span className="green-color">
                                          Pending
                                        </span> */}
                                      </p>
                                      <span>{request.title}</span>
                                    </div>
                                  </div>
                                  <div className="mentorship-day">
                                    {/* <p>4 Days Ago</p> */}
                                  </div>
                                </a>
                                {isToggled && (
                                  <div>
                                    {showModal && <div></div>}

                                    <div className="details-message-cover">
                                      <p>Name</p>
                                      <span>{request.name}</span>
                                    </div>
                                    <div className="details-message-cover">
                                      <p>About</p>
                                      <span>{request.about}</span>
                                    </div>
                                    <div className="details-message-cover">
                                      <p>Languages known</p>
                                      <span>
                                        {request.languages.map((language) => (
                                          <p>{language}</p>
                                        ))}
                                      </span>
                                    </div>
                                    <div className="details-link">
                                      {!loading && (
                                        <button
                                          value={request.email}
                                          onClick={handleApprove}
                                        >
                                          Approve
                                        </button>
                                      )}
                                      {loading && <p>loading</p>}
                                      <button
                                        value={request.email}
                                        variant="primary"
                                        onClick={handleReject}
                                      >
                                        Reject
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                          {/* <Modal show={showModal} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>
                                Give reason to user for rejecting request
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <form>
                                <label>reason</label>
                                <textarea
                                  onChange={(e) =>
                                    setRejectMessage(e.target.value)
                                  }
                                  as="textarea"
                                  rows={3}
                                />
                              </form>
                            </Modal.Body>
                            <Modal.Footer>
                              <button variant="secondary" onClick={handleClose}>
                                Close
                              </button>
                              <button value={e.target.value} variant="primary" onClick={handleReject}>
                                Submit
                              </button>
                            </Modal.Footer>
                          </Modal> */}
                        </div>
                        {/* <div className="share-details-2">
                          <div className="mentorship-profile-detail">
                            <a href="javascript:void(0)">
                              <div className="poifile-details">
                                <img src="/images/navlogo.jpg" alt="" />
                                <div className="poifile-details-cover">
                                  <p>
                                    Urvish Vaghas....
                                    <span className="green-color">
                                      Approved
                                    </span>
                                  </p>
                                  <span>Full stack web....</span>
                                </div>
                              </div>
                              <div className="mentorship-day">
                                <p>4 Days Ago</p>
                              </div>
                            </a>
                          </div>
                          <div className="details-message d-none">
                            <div className="details-message-cover">
                              <p>Message</p>
                              <span>
                                Please help me in this for better understanging
                                in my internship
                              </span>
                            </div>
                            <div className="details-message-cover">
                              <p>Message</p>
                              <span>
                                Please help me in this for better understanging
                                in my internship
                              </span>
                            </div>
                            <div className="details-message-cover">
                              <p>Message</p>
                              <span>
                                Please help me in this for better understanging
                                in my internship
                              </span>
                            </div>
                            <div className="details-link">
                              <a href="javascript:void(0)">Video Call</a>
                              <a href="javascript:void(0)">Send a message </a>
                            </div>
                          </div>
                        </div>
                        <div className="share-details-2">
                          <div className="mentorship-profile-detail">
                            <a href="javascript:void(0)">
                              <div className="poifile-details">
                                <img src="/images/navlogo.jpg" alt="" />
                                <div className="poifile-details-cover">
                                  <p>
                                    Urvish Vaghas....
                                    <span className="green-color">
                                      Approved
                                    </span>
                                  </p>
                                  <span>Full stack web....</span>
                                </div>
                              </div>
                              <div className="mentorship-day">
                                <p>4 Days Ago</p>
                              </div>
                            </a>
                          </div>
                          <div className="details-message d-none">
                            <div className="details-message-cover">
                              <p>Message</p>
                              <span>
                                Please help me in this for better understanging
                                in my internship
                              </span>
                            </div>
                            <div className="details-message-cover">
                              <p>Message</p>
                              <span>
                                Please help me in this for better understanging
                                in my internship
                              </span>
                            </div>
                            <div className="details-message-cover">
                              <p>Message</p>
                              <span>
                                Please help me in this for better understanging
                                in my internship
                              </span>
                            </div>
                            <div className="details-link">
                              <a href="javascript:void(0)">Video Call</a>
                              <a href="javascript:void(0)">Send a message </a>
                            </div>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Requests;
