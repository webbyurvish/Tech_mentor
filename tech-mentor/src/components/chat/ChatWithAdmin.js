import React from "react";
import { CometChatUserListWithMessages } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src/components";
import { useParams } from "react-router";
import { MentorWrapper } from "../MentorPanel/MentorWrapper";

export default function ChatWithAdmin() {
  const { uid } = useParams();
  return (
    <MentorWrapper>
      <div style={{ paddingLeft: "5.9rem", width: "100%", height: "100vh" }}>
        <CometChatUserListWithMessages chatWithUser={uid} />
      </div>
    </MentorWrapper>
  );
}
