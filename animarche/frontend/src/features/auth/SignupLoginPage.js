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
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo">
          Flowbite    
      </a> */}
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                {pathname.includes("signup")
                  ? "Make a new account"
                  : "Sign in to your account"}
              </h1>
              <form
                onSubmit={submitHandler}
                className="space-y-4 md:space-y-6"
                action="#"
              >
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Username
                  </label>
                  <input
                    type="username"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                {pathname.includes("signup") ? (
                  <>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="name@company.com"
                        required=""
                      />
                    </div>
                  </>
                ) : (
                  ""
                )}
                {showError ? showError : ""}
                {pathname.includes("signup") ? (
                  ""
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                            required=""
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label className="text-gray-500 dark:text-gray-300">
                            Remember me
                          </label>
                        </div>
                      </div>
                      <a
                        href="#"
                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Forgot password?
                      </a>
                    </div>{" "}
                  </>
                )}
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  {pathname.includes("signup") ? "Create Account": "Sign in"}
                </button>
                { pathname.includes("signup") ? (
                  ""
                ) : (
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet?{" "}
                    <a
                      href="/signup"
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                      Sign up
                    </a>
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
      {/* <Test /> */}
    </div>
  );
};

export default SignUpLoginPage;
