import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

const SavedItemsPage = () => {
  const {user} = useContext(AuthContext);

    return (
      <div>
        You have 0 items in your cart. 
        {!user ? (
          <div>
            Do you want to
            <div>sign up</div>
            or
            <div>login</div>
          </div>
        ) : (
          "You are logged in"
        )}
      </div>
    );
};

export default SavedItemsPage;
