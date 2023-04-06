import React from "react";
import Item from "./Item";
import { v4 as uuidv4} from "uuid"

const ItemsContainer = ({ results }) => {
  return (
    <div>
      {results.map((result) => (
        <Item singleResult={result} key={uuidv4()}/>
      ))}
    </div>
  );
};

export default ItemsContainer;
