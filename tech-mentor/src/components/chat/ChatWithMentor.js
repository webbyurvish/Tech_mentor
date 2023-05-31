import React from "react";
import { CometChatUserListWithMessages } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src/components";
import { useParams } from "react-router";
import { MentorWrapper } from "../MentorPanel/MentorWrapper";
import { useSelector } from "react-redux";
import UserWrapper from "../user/UserWrapper";

export default function ChatWithMentor() {
  const user = useSelector((state) => state.auth.user);
  const { uid } = useParams();
  return (
    <>
      {user.role == "user" ? (
        <UserWrapper>
          <div
            style={{ paddingLeft: "5.9rem", width: "100%", height: "100vh" }}
          >
            <CometChatUserListWithMessages chatWithUser={uid} />
          </div>
        </UserWrapper>
      ) : (
        <MentorWrapper>
          <div
            style={{ paddingLeft: "5.9rem", width: "100%", height: "100vh" }}
          >
            <CometChatUserListWithMessages chatWithUser={uid} />
          </div>
        </MentorWrapper>
      )}
    </>
  );
}
