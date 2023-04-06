import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(window.localStorage.getItem("token") ? window.localStorage.getItem("token") : null );
  const [error, setError] = useState(null);
//   useEffect(() => {
//     const token = window.localStorage.getItem("token");
//     if (token) {
//       const authenticate = async (token) => {
//         const { data } = await axios({
//           method: "get",
//           url: "/api/db/me",
//           headers: { authorization: token },
//         });
//         setUser(data);
//       };
//       authenticate(token);
//     }
//   }, []);

  const loginSignUp = async (loginSignupObj) => {
    const tokenData = await axios.post(`/api/db/auth/`, loginSignupObj);

    if (typeof tokenData.data === "string") {
      return setError(tokenData.data);
    } else {
      window.localStorage.setItem("token", tokenData.data.token);
      const userData = await axios({
        method: "get",
        url: "/api/db/me",
        headers: { authorization: tokenData.data.token },
      });
      setUser(userData.data);
    }
  };

  const logOut = () => {
    setUser(null);
    window.localStorage.removeItem("token")
  };

  let context = { loginSignUp, logOut, user, error };

  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
