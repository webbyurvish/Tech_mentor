import React, { useEffect, useState } from "react";
import Account from "./Account";
import axios from "axios";
import { API_URL } from "../../config";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

export default function MentorDetail() {
  const [mentor, setMentor] = useState(null);

  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    // Fetch mentor details fro m API
    const fetchMentorDetails = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/mentors/get/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setMentor(response.data);
      } catch (error) {
        // Handle error
      }
    };

    fetchMentorDetails();
  }, [user.email]);

  if (!mentor) {
    return <div>Loading...</div>;
  }

  console.log(mentor);

  return (
    <div>
      <Account mentor={mentor} />
    </div>
  );
}
