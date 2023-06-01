// RatingModal.js

import React from "react";
import { useSelector } from "react-redux";
import { FeedBack } from "../FeedBack";

const RatingModal = ({
  mentor,
  feedbackMessage,
  setFeedbackMessage,
  handleRatingSubmit,
}) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div
      className="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          {mentor &&
            mentor.ratings.some((obj) => obj.userId === Number(user.id)) && (
              <p
                style={{
                  margin: "3rem",
                  padding: "1rem",
                  fontWeight: "bold",
                  fontSize: "2rem",
                }}
              >
                <span>
                  <i
                    className="fa-sharp fa-solid fa-face-smile"
                    style={{ color: "#e7eb00" }}
                  ></i>
                </span>
                &nbsp; You already rated this mentor !!!
              </p>
            )}
          {mentor &&
            !mentor.ratings.some((obj) => obj.userId === Number(user.id)) && (
              <>
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Add Rating
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <FeedBack />
                <div className="modal-body">
                  <div className="reject-reason">
                    <label htmlFor="text">Give Feedback</label>
                    <textarea
                      type="text"
                      value={feedbackMessage}
                      onChange={(e) => setFeedbackMessage(e.target.value)}
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

                  <button
                    type="submit"
                    onClick={handleRatingSubmit}
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
