import { CometChatUI } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src/components";
import UserWrapper from "./UserWrapper";

export default function UserChat() {
  return (
    <UserWrapper>
      <div style={{ paddingLeft: "5.6rem", width: "100%", height: "100vh" }}>
        <CometChatUI />
      </div>
    </UserWrapper>
  );
}
