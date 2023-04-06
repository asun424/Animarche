import React, { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";


// const Test = React.memo(() => {
//   console.log("HIT");
//   return <div>hello</div>;
// });

const SignUpLoginPage = () => {
  

  const location = useLocation();
  const pathname = location.pathname;
  const method = pathname.slice(1, pathname.length - 1);
  const navigate = useNavigate();
  const { loginSignUp, user, error } = useContext(AuthContext);
  const [showError, setShowError] = useState(null);
  console.log("loginsignup");

  const submitHandler = async (event) => {
    event.preventDefault();

    const loginSignUpObj = {
      username: event.target.username.value,
      password: event.target.password.value,
      method,
    };
    if (event.target.email) {
      loginSignUpObj.email = event.target.email.value;
    }

    await loginSignUp(loginSignUpObj);
  };

  /*
  useEffect helps mitigate the problem react-dom.development.js:86 Warning: 
  Cannot update a component (`BrowserRouter`) while rendering a different component (`SignUpLoginPage`). 
  To locate the bad setState() call inside `SignUpLoginPage`

  because it causes the subsequent state change/redirect after the previous render cycle COMPLETELY finishes
  rather than PARTWAY during the the render cycle

  auth -> signuplogin -> auth -> signuplogin not done rendering/rendering halfway then changestate/redirect => BAD (3.5 render)
  auth -> signuplogin -> auth -> wait till signuplogin render cycle finished -> enact next statechange/redirect => GOOD (4 render)
  */

  useEffect(() => {
    if (error) {
      setShowError(error);
    } else if (user) {
      navigate("/savedItems");
    }
  }, [user, error]);

  return (
    <div>
      {/* <Test /> */}
      <form onSubmit={submitHandler}>
        <label>Username</label>
        <input className="border-2 border-black" name="username" />
        <label>Password:</label>
        <input className="border-2 border-black" name="password" />
        {pathname.includes("signup") ? (
          <>
            <label>Email:</label>
            <input className="border-2 border-black" name="email" />
          </>
        ) : (
          ""
        )}

        <button>Submit</button>
      </form>
      {showError ? showError : ""}
    </div>
  );
};

export default SignUpLoginPage;
