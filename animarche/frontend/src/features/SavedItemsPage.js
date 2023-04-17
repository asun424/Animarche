import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import ItemsContainer from "./search/ItemsContainer";

const SavedItemsPage = () => {
  const { user } = useContext(AuthContext);
  const [allItems, setAllItems] = useState(null);

  const token = window.localStorage.getItem("token");

  useEffect(() => {
    if (user) {
      const getAllItems = async () => {
        const { data } = await axios({
          method: "get",
          url: "/api/db/item",
          headers: { authorization: token },
        });
        setAllItems(data.favoritedItems);
      };
      getAllItems();
    }
  }, [user]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="text-[30px] text center">
        Here are your saved items:
      </div>
      {!allItems ? (
        "Loading Items"
      ) : allItems.length <= 0 ? (
        "You have no items"
      ) : (
        <ItemsContainer
          results={allItems}
          location={"cart"}
          setAllItems={setAllItems}
        />
      )}
    </div>
  );
};

export default SavedItemsPage;
