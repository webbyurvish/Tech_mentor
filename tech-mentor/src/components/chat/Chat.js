import React from "react";
import { CometChatUI } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src/components";
import { Link } from "react-router-dom";
import { MentorWrapper } from "../MentorPanel/MentorWrapper";

export const Chat = () => {
  return (
    <MentorWrapper>
      <div style={{ paddingLeft: "5.9rem", width: "100%", height: "100vh" }}>
        <CometChatUI />
      </div>
    </MentorWrapper>
  );
};
