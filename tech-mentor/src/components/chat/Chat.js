import React from "react";
import { CometChatUI } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src/components";
import { Link } from "react-router-dom";

export const Chat = () => {
  return (
    <div>
      <div style={{ width: "100vw", height: "100vh" }}>
        <CometChatUI />
      </div>
    </div>
  );
};
