import React, { useState } from "react";
import Answers from "./Answers";

const Modal2 = (props) => {
  const setModal = props.setModal;
  const setScore = props.setScore;

  const [choice, setChoice] = useState("");
  console.log("CHOICE IS: ", choice)

  const clickHandler = () => {
    let score;
    if (choice === "hot-blooded and ready to throw hands") {
      score = [1, 0, 0, 0, 0];
    } else if (choice === "ready to find THE one") {
      score = [0, 1, 0, 0, 0];
    } else if (choice === "bing chilling") {
      score = [0, 0, 1, 0, 0];
    } else if (choice === "overwhelmed by the weight of existence") {
      score = [0, 0, 0, 1, 0];
    } else if (choice === "trying your best") {
      score = [0, 0, 0, 0, 1];
    }
    setScore((preV) => [preV, score]);
    setModal(3);
  };

  const answers = ["hot-blooded and ready to throw hands", "ready to find THE one", "bing chilling", "overwhelmed by the weight of existence", "trying your best"];

  return (
    <div>
      <h1>What's your vibe right now?</h1>
      <Answers categories={answers} choice={choice} setChoice={setChoice} />
      {choice ? <button onClick={clickHandler}>Next</button> : ""}
    </div>
  );
};

export default Modal2;
