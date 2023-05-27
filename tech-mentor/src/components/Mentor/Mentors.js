import React from "react";
import Mentor from "./Mentor";
import { Layout } from "../Layout/Layout";
import { useSelector } from "react-redux";
import { CometChatUI } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src/components";

export default function Mentors() {
  const mentors = useSelector((state) => state.result.mentors);

  return (
    <Layout>
      {/* <CometChatUI /> */}
      {mentors && mentors.length === 0 && (
        <h3 className="nomentors">There are no mentors to show.</h3>
      )}
      {mentors && mentors.length > 0 && (
        <div>
          <div className="row justify-content-center">
            {mentors.map((mentor, index) => (
              <Mentor mentor={mentor} key={index} />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}
