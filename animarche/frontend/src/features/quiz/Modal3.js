import React, {useState} from "react";
import Answers from "./Answers";

const Modal3 = (props) => {
  const setModal = props.setModal;
  const setScore = props.setScore;

  const [choice, setChoice] = useState("")
  console.log("CHOICE IS: ", choice)

  const clickHandler = () => {
    let score;
    if (choice === "sunny with just a lil too much wind") {
      score = [1, 0, 0, 0, 0];
    } else if (choice === "rainy with a chance of torrential downpour") {
      score = [0, 1, 0, 0, 0];
    } else if (choice === "drier than you sense of humor (your mileage may vary)") {
      score = [0, 0, 1, 0, 0];
    } else if (choice === "crisp like trader joe's pickle chips") {
      score = [0, 0, 0, 1, 0];
    } else if (choice === "i don't go outside") {
      score = [0, 0, 0, 0, 1];
    }

    setScore((preV) => [...preV, score]);
    setModal(4);
  };

  const answers = ["sunny with just a lil too much wind", "rainy with a chance of torrential downpour", "drier than you sense of humor (your mileage may vary)", "crisp like trader joe's pickle chips", "i don't go outside"]

  return (
    <div>
      <h1>What kind of weather do you like?</h1>
      <Answers categories={answers} choice={choice} setChoice={setChoice}/>
      {choice ? <button onClick={clickHandler}>
          Next
      </button> : ""}
    </div>
  );
};

export default Modal3;
