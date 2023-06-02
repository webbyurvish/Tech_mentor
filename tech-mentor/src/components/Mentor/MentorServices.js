import axios from "axios";
import { API_URL } from "../../config";

// count active stars based on average rating

export const getActiveStars = (averageRating) => {
  const maxStars = 5;
  const activeStars = Math.round(averageRating);
  const stars = [];

  for (let i = 0; i < maxStars; i++) {
    if (i < activeStars) {
      stars.push(<span key={i} className="fa fa-star star-active mx-1"></span>);
    } else {
      stars.push(
        <span key={i} className="fa fa-star star-inactive mx-1"></span>
      );
    }
  }

  return stars;
};

// function to extract username from email

export const extractUsername = (email) => {
  const atIndex = email.indexOf("@");
  if (atIndex !== -1) {
    const username = email.substring(0, atIndex);
    return username;
  }
  return null; // Return null if the email format is invalid
};

// function for formatting datetime to date (10 sep)
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "short" };
  return date.toLocaleDateString("en-US", options);
};

// fetch mentor data by id

export const fetchMentorData = async (id, navigate) => {
  try {
    const mentorResponse = await axios.get(`${API_URL}/mentors/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return mentorResponse.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      navigate("/login"); // Redirect to the login page
    } else {
      console.error("Error fetching mentor data:", error);
    }
    throw error; // Re-throw the error to handle it in the component
  }
};
