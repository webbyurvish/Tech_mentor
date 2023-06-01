import { CometChatUI } from "../../cometchat-pro-react-ui-kit/CometChatWorkspace/src/components";
import { MentorWrapper } from "../MentorPanel/MentorWrapper";

{
  /* chat component which directly show perticular mentor's message box */
}
export default function MentorChat() {
  return (
    <MentorWrapper>
      <div style={{ paddingLeft: "5.6rem", width: "100%", height: "100vh" }}>
        <CometChatUI />
      </div>
    </MentorWrapper>
  );
}
