import React from "react";
import Mentor from "./Mentor";
import { Layout } from "../Layout/Layout";
import { useSelector } from "react-redux";

export default function Mentors() {
  const mentors = useSelector((state) => state.mentors.mentors.items);

  console.log(mentors);

  return (
    <Layout>
      {mentors && mentors.length < 1 && <h3>There is no mentors to show</h3>}
      {mentors && mentors.length > 0 && (
        <div>
          <div className="row">
            {mentors && mentors.map((mentor) => <Mentor mentor={mentor} />)}
          </div>
        </div>
      )}
    </Layout>
  );
}
