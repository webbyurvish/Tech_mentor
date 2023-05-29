import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser } from "../../redux/slices/authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { CometChat } from "@cometchat-pro/chat";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);
  const error = useSelector((state) => state.auth.error);

  const [username, setName] = useState("");
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRightPanelActive, setRightPanelActive] = useState(false);

  const toggleRightPanel = () => {
    setRightPanelActive((prevState) => !prevState);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const credentials = {
      email: email,
      password: password,
    };
    dispatch(loginUser(credentials));

    // let authKey = process.env.REACT_APP_COMETCHAT_AUTH_KEY;
    // var uid = user && `user${user.name}`;
    // console.log(uid);
    // CometChat.login(uid, authKey).then(
    //   (user) => {
    //     console.log("Login Successful:", { user });
    //   },
    //   (error) => {
    //     console.log("Login failed with exception:", { error });
    //   }
    // );
  };

  if (user) {
    navigate("/");
  }

  const handleSignup = (event) => {
    event.preventDefault();
    const userData = {
      name: username,
      email: email,
      password: password,
      image: image,
    };
    console.log(userData);
    dispatch(signupUser(userData));

    // if (error == null) {
    //   console.log("entered");
    //   let authKey = process.env.REACT_APP_COMETCHAT_AUTH_KEY;
    //   var uid = user && `user${userData.name}`;
    //   var name = user && userData.name;

    //   var user = new CometChat.User(uid);
    //   user.setName(name);
    //   console.log("fff");
    //   CometChat.createUser(user, authKey).then(
    //     (user) => {
    //       console.log("user created", user);
    //     },
    //     (error) => {
    //       console.log("error", error);
    //     }
    //   );
    // }
  };

  // const apikey = "db073bd0b505b7c824b77f08e8646fbf5a83203c";

  // useEffect(() => {
  //   if (user) {
  //     const authKey = process.env.REACT_APP_COMETCHAT_AUTH_KEY;
  //     const uid = `user${user.name}`;
  //     const name = user.name;
  //     const role = "user";

  //     CometChat.getUser(uid)
  //       .then(
  //         (existingUser) => {
  //           console.log("User already exists:", existingUser);
  //           // User already exists, proceed with login
  //           loginCometChatUser(uid, authKey);
  //         },
  //         (error) => {
  //           console.log("User does not exist:", error);
  //           // User does not exist, create a new user
  //           const requestBody = {
  //             uid,
  //             name,
  //             role,
  //             withAuthToken: false,
  //           };

  //           const requestOptions = {
  //             method: "POST",
  //             headers: {
  //               accept: "application/json",
  //               "content-type": "application/json",
  //               apikey: authKey,
  //             },
  //             body: JSON.stringify(requestBody),
  //           };

  //           fetch(
  //             "https://239573399dceb131.api-us.cometchat.io/v3/users",
  //             requestOptions
  //           )
  //             .then((response) => response.json())
  //             .then((data) => {
  //               console.log("User created:", data);
  //               // User created, now you can proceed with login
  //               CometChat.login(uid, authKey);
  //             })
  //             .catch((error) => {
  //               console.log("Error creating user:", error);
  //               // Handle user creation error
  //             });
  //         }
  //       )
  //       .catch((error) => {
  //         console.log("Error checking user:", error);
  //         // Handle user checking error
  //       });
  //   }
  // }, [user]);

  // function loginCometChatUser(uid, authKey) {
  //   // Perform login logic here
  // }

  // useEffect(() => {
  //   if (user) {
  //     const authKey = process.env.REACT_APP_COMETCHAT_AUTH_KEY;
  //     const uid = `user${user.name}`;
  //     const name = user.name;
  //     const role = "user";
  //     const apikey = process.env.REACT_APP_COMETCHAT_API_KEY;

  //     CometChat.getUser(uid)
  //       .then(
  //         (existingUser) => {
  //           console.log("User already exists:", existingUser);
  //           // User already exists, no need to create a new user
  //           return existingUser;
  //         },
  //         (error) => {
  //           console.log("User does not exist:", error);

  //           const requestBody = {
  //             uid,
  //             name,
  //             role,
  //             withAuthToken: false,
  //           };

  //           const requestOptions = {
  //             method: "POST",
  //             headers: {
  //               accept: "application/json",
  //               "content-type": "application/json",
  //               apikey: authKey,
  //             },
  //             body: JSON.stringify(requestBody),
  //           };

  //           fetch(
  //             "https://2400526630d3a3fa.api-us.cometchat.io/v3/users",
  //             requestOptions
  //           )
  //             .then((response) => response.json())
  //             .then((response) => console.log(response))
  //             .catch((err) => console.error(err));

  //           // User does not exist, create a new user
  //           // var newUser = new CometChat.User(uid);
  //           // newUser.setName(name);
  //           // let roles = ["User"];
  //           // let usersRequest = new CometChat.UsersRequestBuilder()
  //           //   .setRoles(roles)
  //           //   .build();
  //           // return CometChat.createUser(newUser, authKey);
  //         }
  //       )
  //       .then((user) => {
  //         return CometChat.login(
  //           uid,
  //           "28a72244a6e90eae2ee58b5cb7238fa81546aad2"
  //         );
  //       })
  //       .then(
  //         (user) => {
  //           console.log("Login Successful:", { user });
  //           navigate("/"); // Redirect to the desired page after successful login
  //         },
  //         (error) => {
  //           console.log("Login failed with exception:", { error });
  //           // Handle login error
  //         }
  //       )
  //       .catch((error) => {
  //         console.log("User creation or login failed with exception:", {
  //           error,
  //         });
  //         // Handle user creation or login error
  //       });
  //   }
  // }, [user]);

  useEffect(() => {
    if (user) {
      const authKey = process.env.REACT_APP_COMETCHAT_AUTH_KEY;
      const uid = `user${user.name}`;
      const name = user.name;
      const role = "user";

      CometChat.getUser(uid)
        .then(
          (existingUser) => {
            console.log("User already exists:", existingUser);
            // User already exists, proceed with login
            loginCometChatUser(uid, authKey);
          },
          (error) => {
            console.log("User does not exist:", error);
            // User does not exist, create a new user
            const requestBody = {
              uid,
              name,
              role,
            };

            const requestOptions = {
              method: "POST",
              headers: {
                accept: "application/json",
                "content-type": "application/json",
                apikey: authKey,
              },
              body: JSON.stringify(requestBody),
            };

            fetch(
              "https://2400526630d3a3fa.api-us.cometchat.io/v3/users",
              requestOptions
            )
              .then((response) => response.json())
              .then((data) => {
                console.log("User created:", data);
                // User created, now you can proceed with login
                loginCometChatUser(uid, authKey);
              })
              .catch((error) => {
                console.log("Error creating user:", error);
                // Handle user creation error
              });
          }
        )
        .catch((error) => {
          console.log("Error checking user:", error);
          // Handle user checking error
        });
    }
  }, [user]);

  function loginCometChatUser(uid, authKey) {
    // Perform login logic here
    CometChat.login(uid, authKey).then(
      (user) => {
        console.log("Login Successful:", { user });
      },
      (error) => {
        console.log("Login failed with exception:", { error });
      }
    );
  }

  useEffect(() => {
    if (location.state && location.state.successMessage) {
      toast.success(location.state.successMessage);
    }
  }, [location.state]);

  return (
    <div className="wrapper">
      <ToastContainer />
      <div
        className={`container ${
          isRightPanelActive ? "right-panel-active" : ""
        }`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form className="form" onSubmit={handleSignup}>
            <h1 className="h1">Create Account</h1>
            <input
              className="input"
              type="text"
              placeholder="Name"
              required
              onChange={(event) => setName(event.target.value)}
            />
            <input
              className="input"
              type="email"
              placeholder="Email"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              required
              minLength={6}
              onChange={(event) => setPassword(event.target.value)}
            />
            {password.length > 0 && password.length < 6 && (
              <p className="error">
                Password must be at least 6 characters long
              </p>
            )}
            <input
              className="input"
              type="file"
              id="img"
              name="img"
              accept="image/*"
              required
              onChange={(event) => setImage(event.target.files[0])}
            />
            <button className="button" type="submit">
              Sign Up
            </button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form className="form" onSubmit={handleLogin}>
            <h1 className="h1">Sign in</h1>
            <input
              className="input"
              type="email"
              placeholder="Email"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="input"
              type="password"
              placeholder="Password"
              required
              onChange={(event) => setPassword(event.target.value)}
            />
            <Link to={"/mailrequest"} className="a">
              Forgot your password?
            </Link>
            <button className="button" type="submit">
              Sign In
            </button>
            <Link className="a" to={"/"}>
              Go back
            </Link>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="h1">Welcome Back!</h1>
              <p className="p">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="button ghost"
                id="signIn"
                onClick={toggleRightPanel}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="h1">Hello, Friend!</h1>
              <p className="p">
                Enter your personal details and start journey with us
              </p>
              <button
                className="button ghost"
                id="signUp"
                onClick={toggleRightPanel}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
