import React from "react";

export const DashboardRating = ({ mentor }) => {
  const classes = ["Excellent", "Good", "Average", "Poor", "Terrible"];

  const totalCount = mentor && mentor.ratings.length;

  const calculatePercentage = (count) => {
    if (totalCount === 0) return 0;
    return (count / totalCount) * 100;
  };

  const countObjectsWithStars = (stars) => {
    return (
      mentor && mentor.ratings.filter((rating) => rating.stars === stars).length
    );
  };

  return (
    <div>
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
              {calculatePercentage(countObjectsWithStars(5 - index)).toFixed(1)}
              %
            </td>
          </tr>
        );
      })}
    </div>
  );
};
