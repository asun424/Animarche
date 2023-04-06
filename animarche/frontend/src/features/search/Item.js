import React from "react";import { v4 as uuidv4} from "uuid"

const Items = ({ singleResult }) => {
  return (
    <>
      <a href={singleResult.href}>
        <img src={singleResult.img} />
        <div>{singleResult.name}</div>
        <div>{singleResult.price}</div>
      </a>
    </>
  );
};

export default Items;
