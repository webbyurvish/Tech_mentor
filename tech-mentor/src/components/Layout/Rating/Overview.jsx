import React from "react";
import { getActiveStars } from "../../Mentor/MentorServices";

export default function Overview({ mentor, averageRating }) {
  const classes = ["Excellent", "Good", "Average", "Poor", "Terrible"];

  const calculatePercentage = (count) => {
    if (totalCount === 0) return 0;
    return (count / totalCount) * 100;
  };

  const countObjectsWithStars = (stars) => {
    return (
      mentor && mentor.ratings.filter((rating) => rating.stars === stars).length
    );
  };

  const totalCount = mentor && mentor.ratings.length;

  return (
    <>
      <div className="col-md-4 d-flex flex-column">
        <div className="rating-box">
          <h1 className="pt-4" style={{ marginLeft: "30%" }}>
            {averageRating.toFixed(1)}
          </h1>
          <p style={{ marginLeft: "28%" }}>out of 5</p>
        </div>
        <div className="bar-container">{getActiveStars(averageRating)}</div>
      </div>
      <div className="col-md-8">
        <div className="rating-bar0 justify-content-center">
          <table className="text-left mx-auto">
            {classes.map((category, index) => {
              return (
                <tr>
                  <td className="rating-label td">{category}</td>
                  <td className="rating-bar td">
                    <div className="bar-container">
                      <div
                        style={{
                          width: `${calculatePercentage(
                            countObjectsWithStars(5 - index)
                          )}%`,
                          height: "13px",
                          backgroundColor: "#fbc02d",
                          borderRadius: "20px",
                        }}
                      ></div>
                    </div>
                  </td>
                  <td className="text-right td">
                    {calculatePercentage(
                      countObjectsWithStars(5 - index)
                    ).toFixed(1)}
                    %
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </>
  );
}
