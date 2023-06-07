import React from "react";
import { useSelector } from "react-redux";
import { formatDate } from "../Mentor/MentorServices";
import Loading from "../Layout/Loading/Loading";

export const Reviews = () => {
  const mentor = useSelector((state) => state.mentor.details);
  console.log(mentor);

  return (
    <>
      <div>
        <div>
          {mentor.ratings.length > 0 ? (
            <div>
              {mentor.ratings.map((rating) => (
                <>
                  <div className="row d-flex">
                    <div>
                      <img className="profile-pic" src={rating.user.imageUrl} />
                    </div>
                    <div className="d-flex flex-column">
                      <h5 className="mt-2 mb-0">{rating.user.name}</h5>
                      <div>
                        <p className="text-left">
                          <span className="text-muted">
                            {rating.stars.toFixed(1)} &nbsp;
                          </span>
                          {[...Array(Math.floor(rating.stars))].map(
                            (_, index) => (
                              <span
                                className="fa fa-star star-active"
                                key={index}
                              ></span>
                            )
                          )}
                          {[...Array(5 - Math.floor(rating.stars))].map(
                            (_, index) => (
                              <span
                                className="fa fa-star star-inactive"
                                key={index}
                              ></span>
                            )
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <p className="text-muted pt-5 pt-sm-3">
                        {formatDate(rating.dateRated)}
                      </p>
                    </div>
                    <div
                      style={{ marginBottom: "40px" }}
                      className="d-flex flex-column text-left"
                    >
                      <p className="content mt-3">{rating.comment}</p>
                    </div>
                  </div>
                </>
              ))}
            </div>
          ) : (
            <p>No Ratings to show</p>
          )}
        </div>
      </div>
    </>
  );
};
