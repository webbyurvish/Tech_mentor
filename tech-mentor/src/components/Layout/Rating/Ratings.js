import React from "react";
import { formatDate } from "../../Mentor/MentorServices";

export default function Ratings({ mentor }) {
  return (
    <div>
      {" "}
      {mentor.ratings.map((rating) => (
        <>
          <div className="row d-flex">
            <div className="">
              <img
                className="profile-pic"
                src={`https://localhost:7022${rating.user.imageUrl}`}
              />
            </div>
            <div className="d-flex flex-column">
              <h5 className="mt-2 mb-0">{rating.user.name}</h5>
              <div>
                <p className="text-left">
                  <span className="text-muted">
                    {rating.stars.toFixed(1)} &nbsp;
                  </span>
                  {[...Array(Math.floor(rating.stars))].map((_, index) => (
                    <span className="fa fa-star star-active" key={index}></span>
                  ))}
                  {[...Array(5 - Math.floor(rating.stars))].map((_, index) => (
                    <span
                      className="fa fa-star star-inactive"
                      key={index}
                    ></span>
                  ))}
                </p>
              </div>
            </div>
            <div className="ml-auto">
              <p className="text-muted pt-5 pt-sm-3">
                {formatDate(rating.dateRated)}
              </p>
            </div>
          </div>
          <div style={{ marginBottom: "40px" }} className="row text-left">
            <p className="content mt-3">{rating.comment}</p>
          </div>
        </>
      ))}
    </div>
  );
}
