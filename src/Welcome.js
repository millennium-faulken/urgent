import React, { useContext } from "react";
import { AuthContext } from "./auth/Auth";

const Welcome = () => {
  const { currentUser } = useContext(AuthContext);
  const currentUserEmail = currentUser ? currentUser.email : "";
  const userName = currentUserEmail.substr(0, currentUserEmail.indexOf("@"));
  const displayName = userName.charAt(0).toUpperCase() + userName.slice(1);

  return <h2>{`Welcome ${displayName}!`}</h2>;
};

export default Welcome;
