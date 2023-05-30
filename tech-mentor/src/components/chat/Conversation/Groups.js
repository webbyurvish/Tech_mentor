import React from "react";
import { CometChatGroupListWithMessages } from "../../../cometchat-pro-react-ui-kit/CometChatWorkspace/src/components";

export const Groups = () => {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <CometChatGroupListWithMessages chatWithGroup="supergroup" />
    </div>
  );
};
