import React from "react";
import Mentor from "./Mentor";
import { Layout } from "../Layout/Layout";
import { useSelector } from "react-redux";

export default function Mentors() {
  const mentors = useSelector((state) => state.result.mentors);

  return (
    <Layout>
      {mentors && mentors.length === 0 && (
        <h3 className="nomentors">There are no mentors to show.</h3>
      )}
      {mentors && mentors.length > 0 && (
        <div>
          <div className="row justify-content-center">
            {mentors.map((mentor) => (
              <Mentor mentor={mentor} key={mentor.id} />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}
