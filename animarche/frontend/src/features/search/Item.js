import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import AuthContext from "../../context/AuthContext";

const Items = ({ singleResult, location, setAllItems }) => {
  const { user } = useContext(AuthContext);

  const [error, setError] = useState(false);
  const [saveStatus, setSaveStatus] = useState(user ? null : false);

  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (user) {
      const checkIfSaved = async () => {
        const { data } = await axios({
          method: "put",
          url: "/api/db/item/",
          headers: { authorization: token },
          data: { _id: user._id, singleResult },
        });
        setSaveStatus(data);
      };
      checkIfSaved();
    }
  }, [user]);

  const saveOrDeleteItem = async (event) => {
    if (user && event.target.value === "unsaved") {
      //SAVE
      const { data } = await axios({
        method: "post",
        url: "/api/db/item/",
        headers: { authorization: token },
        data: { _id: user._id, singleResult },
      });
      setSaveStatus(data);
    } else if (user && event.target.value === "saved") {
      //DELETE
      const { data } = await axios({
        method: "delete",
        url: "/api/db/item/",
        headers: { authorization: token },
        data: { _id: user._id, singleResult, location },
      });
      if (location === "cart") {
        setAllItems(data.favoritedItems);
      } else {
        setSaveStatus(data);
      }
    } else if (!user) {
      setError(true);
      setTimeout(() => {
        console.log("not loggedin");
        return setError(false);
      }, 2000);
    }
  };

  return (
    <div className="relative w-72 h-[30rem] m-4 flex flex-col justify-center items-center max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      {error ? (
        <div className="absolute top-7 left-0 right-0 text-center">
          You must be logged in to saved items
        </div>
      ) : (
        ""
      )}
      <img className="h-40 w-30" src={singleResult.img} />
      <div className="text-center">{singleResult.name}</div>
      <div>{singleResult.price}</div>
      <button
        className="border border-black"
        onClick={saveOrDeleteItem}
        value={
          location === "cart"
            ? "saved"
            : saveStatus === "null"
            ? "load"
            : user && saveStatus
            ? "saved"
            : "unsaved"
        }
      >
        {" "}
        {location === "cart"
          ? "Delete"
          : saveStatus === null
          ? "Loading Save Status"
          : user && saveStatus
          ? "Saved Succesfully!"
          : "Save Item"}
      </button>
      <a href={singleResult.href}>LINK HERE</a>
    </div>
  );
};

export default Items;
