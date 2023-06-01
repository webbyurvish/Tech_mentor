import axios from "axios";
import { API_URL } from "../../config";
import { fetchData } from "../../redux/slices/resultSlice";

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

//  Rating Submit function

export const RatingSubmit = async (
  user,
  mentor,
  feedbackMessage,
  selectedStars,
  navigate
) => {
  const data = {
    userId: Number(user.id),
    mentorId: mentor.id,
    comment: feedbackMessage,
    stars: selectedStars,
  };

  try {
    const response = await axios.post(`${API_URL}/rating`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response.data.message;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      navigate("/login"); // Redirect to the login page
    } else {
      throw new Error(error.response.data.message);
    }
  }
};

// Handle Like function to like and remove like of mentor

export const handleLikeFunction = async (
  userId,
  mentorId,
  filters,
  currentPage,
  navigate,
  dispatch
) => {
  try {
    await axios.post(
      `${API_URL}/like`,
      { userId, mentorId },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    dispatch(
      fetchData(
        filters.technology,
        filters.country,
        filters.name,
        filters.spokenLanguage,
        currentPage,
        filters.isLiked,
        userId
      )
    );
  } catch (error) {
    if (error.response && error.response.status === 401) {
      navigate("/login"); // Redirect to the login page
    } else {
      console.error("Error fetching mentor data:", error);
    }
  }
};
