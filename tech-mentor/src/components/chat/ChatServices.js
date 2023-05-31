import { CometChat } from "@cometchat-pro/chat";

// cometchat logout

export function cometchatlogout() {
  CometChat.logout().then(
    () => {
      console.log("Logout completed successfully");
    },
    (error) => {
      console.log("Logout failed with exception:", { error });
    }
  );
}

// update user role in cometchat

export function changeRole(uid) {
  const authKey = process.env.REACT_APP_COMETCHAT_API_KEY;

  const options = {
    method: "PUT",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      apikey: authKey,
    },
    body: JSON.stringify({
      role: "mentor",
    }),
  };

  fetch(`https://2400526630d3a3fa.api-us.cometchat.io/v3/users/${uid}`, options)
    .then((response) => response.json())
    .then((response) => console.log("role updated", response))
    .catch((err) => console.error(err));
}
