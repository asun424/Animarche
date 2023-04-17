import React from "react";
import Item from "./Item";
import { v4 as uuidv4} from "uuid"

const ItemsContainer = ({ results, location, setAllItems }) => {
  return (
    <div className="flex flex-wrap justify-center">
      {results.map((result) => (
        <Item singleResult={result} location={location} setAllItems={setAllItems} key={uuidv4()}/>
      ))}
    </div>
  );
};

export default ItemsContainer;
