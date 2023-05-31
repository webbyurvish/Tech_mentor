import { CometChatUI } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src/components";
import AdminWrapper from "./AdminWrapper";

export default function AdminChat() {
  return (
    <AdminWrapper>
      <div style={{ paddingLeft: "5.6rem", width: "100%", height: "100vh" }}>
        <CometChatUI />
      </div>
    </AdminWrapper>
  );
}
