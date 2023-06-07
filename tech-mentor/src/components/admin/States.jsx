import React from "react";
import AdminWrapper from "./AdminWrapper";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Pie, PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function States() {
  const { mentors } = useSelector((state) => state.data);

  // count mentors by average count of stars given in rating
  const starCounts = Array(5).fill(0);

  mentors.forEach((mentor) => {
    const totalStars = mentor.ratings.reduce(
      (sum, rating) => sum + rating.stars,
      0
    );
    const averageStars = totalStars / mentor.ratings.length;
    const starCountIndex = Math.floor(averageStars) - 1;

    starCounts[starCountIndex]++;
  });

  // count mentors by likes count
  // Function to count mentors based on the range of likes
  function countMentorsByLikes(mentors) {
    const count = [0, 0, 0]; // Array to store counts for each range

    mentors.forEach((mentor) => {
      const likesCount = mentor.likes.length;

      if (likesCount >= 0 && likesCount <= 20) {
        count[0]++;
      } else if (likesCount > 20 && likesCount <= 40) {
        count[1]++;
      } else if (likesCount > 40 && likesCount <= 60) {
        count[2]++;
      } else if (likesCount > 60 && likesCount <= 80) {
        count[3]++;
      } else if (likesCount > 80) {
        count[4]++;
      }
    });

    return count;
  }

  // Count the mentors by likes
  const likesMentorCount = countMentorsByLikes(mentors);

  const likesData = {
    labels: [
      "0 - 20 Likes",
      "20 - 40 Likes",
      "40 - 60 Likes",
      "60 - 80 Likes",
      "Above 80 Likes",
    ],
    datasets: [
      {
        label: "Liked Mentors",
        data: likesMentorCount,
        backgroundColor: [
          "rgba(255, 178, 0, 0.8)",
          "rgba(31, 0, 63, 0.8)",
          "rgba(255, 9, 81, 0.8)",
          "rgba(68, 209, 88, 0.8)",
          "rgba(0, 10, 160, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const data = {
    labels: ["5 Star", "4 Star", "3 Star", "2 Star", "1 star"],
    datasets: [
      {
        label: "Mentors",
        data: starCounts,
        backgroundColor: [
          "rgba(255, 178, 0, 0.8)",
          "rgba(31, 0, 63, 0.8)",
          "rgba(255, 9, 81, 0.8)",
          "rgba(68, 209, 88, 0.8)",
          "rgba(0, 10, 160, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Function to count available mentors
  function countAvailableMentors(mentors) {
    let count = 0;

    mentors.forEach((mentor) => {
      if (mentor.available) {
        count++;
      }
    });

    return count;
  }

  // Count the available mentors
  const availableMentorCount = countAvailableMentors(mentors);

  return (
    <AdminWrapper>
      <>
        <ToastContainer />
        <div className="account-right-side">
          <div className="accont-home">
            <h2>States</h2>
          </div>
        </div>
        {mentors && (
          <div className="account-profile">
            <div className="accound-cover">
              <div className="row justify-content-center">
                <div className="col-lg-4">
                  <div className="profile-details">
                    {/* likes card */}
                    <div className="likes-card">
                      <h3>Total Mentors</h3>
                      <p style={{ border: "none" }} className="likes-count">
                        {mentors.length}
                      </p>
                    </div>

                    <div className="likes-card">
                      <h3>Total Ratings</h3>
                      <p style={{ border: "none" }} className="likes-count">
                        {mentors.reduce(
                          (count, mentor) => count + mentor.ratings.length,
                          0
                        )}
                      </p>
                    </div>

                    <div className="likes-card">
                      <h3>Total Likes</h3>
                      <p style={{ border: "none" }} className="likes-count">
                        {mentors.reduce(
                          (count, mentor) => count + mentor.likes.length,
                          0
                        )}
                      </p>
                    </div>

                    <div className="likes-card">
                      <h3>Active Mentors</h3>
                      <p style={{ border: "none" }} className="likes-count">
                        {availableMentorCount}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <div className="profile-details">
                    {/* likes card */}
                    <div className="doughnut-chart-container">
                      <h3
                        style={{
                          fontSize: "25px",
                          fontWeight: "bold",
                          marginTop: "25px",
                        }}
                        className="chart-title"
                      >
                        Rating States
                      </h3>
                      <Doughnut data={data} />
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{ marginTop: "3rem" }}
                className="row justify-content-center"
              >
                <div style={{ marginBottom: "50px" }} className="col-lg-4">
                  <div className="profile-details">
                    {/* likes card */}
                    <div className="doughnut-chart-container">
                      <h3
                        style={{
                          fontSize: "25px",
                          fontWeight: "bold",
                          marginTop: "25px",
                        }}
                        className="chart-title"
                      >
                        Likes States
                      </h3>
                      <PolarArea data={likesData} />
                    </div>
                  </div>
                </div>

                <div style={{ marginBottom: "50px" }} className="col-lg-4">
                  <div className="profile-details">
                    {/* likes card */}

                    <Pie data={data} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    </AdminWrapper>
  );
}
