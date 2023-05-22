import React from "react";
import Mentor from "./Mentor";
import { Layout } from "../Layout/Layout";

export default function Mentors({ mentors }) {
  console.log(mentors);

  return (
    <Layout>
      {mentors.length < 1 && <h3>There is no mentors to show</h3>}
      {mentors.length > 0 && (
        <div className="row">
          {mentors.map((mentor) => (
            <Mentor mentor={mentor} />
          ))}
        </div>
      )}
    </Layout>
  );
}
