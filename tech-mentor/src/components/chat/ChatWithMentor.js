import React from "react";
import { CometChatUserListWithMessages } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src/components";
import { useParams } from "react-router";
import { MentorWrapper } from "../MentorPanel/MentorWrapper";

export const ChatWithMentor = () => {
  const { uid } = useParams();
  return (
    <MentorWrapper>
      <div style={{ width: "initial", height: "100vh" }}>
        <CometChatUserListWithMessages chatWithUser={uid} />
      </div>
    </MentorWrapper>
  );
};
