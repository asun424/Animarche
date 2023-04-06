import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRedirect = (event) => {
    navigate(event.target.id);
  };

  const handleLogout = () => {
    logOut();
  };

  return (
    <div className="flex flex-row justify-around border-2 border-black basis-[10%]">
      <button
        onClick={handleRedirect}
        id="/"
        className="flex flex-col justify-center"
      >
        <div className="w-fit" id="/">
          Search
        </div>
      </button>
      <button
        onClick={handleRedirect}
        id="/quiz"
        className="flex flex-col justify-center"
      >
        <div className="w-fit" id="/quiz">
          Take a Quiz!
        </div>
      </button>
      <button
        onClick={handleRedirect}
        id="/savedItems"
        className="flex flex-col justify-center"
      >
        <div className="w-fit" id="/savedItems">
          Saved Items: 0
        </div>
      </button>
      {user ? <button onClick={handleLogout}>Logout</button> : ""}
    </div>
  );
};

export default NavBar;
