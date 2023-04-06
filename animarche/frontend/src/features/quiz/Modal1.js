import React, {useState} from "react";
import Answers from "./Answers";

const Modal1 = (props) => {
  const setModal = props.setModal;
  const setScore = props.setScore;

  const [choice, setChoice] = useState("")
  console.log("CHOICE IS: ", choice)

  const clickHandler = () => {
    let score;
    if (choice === "action") {
      score = [1, 0, 0, 0, 0];
    } else if (choice === "romance") {
      score = [0, 1, 0, 0, 0];
    } else if (choice === "adventure") {
      score = [0, 0, 1, 0, 0];
    } else if (choice === "drama") {
      score = [0, 0, 0, 1, 0];
    } else if (choice === "comedy") {
      score = [0, 0, 0, 0, 1];
    }

    setScore(score);
    setModal(2);
  };

  const answers = ["action", "romance", "adventure", "drama", "comedy"]
  
  return (
    <div>
      <h1>What genre do you prefer?</h1>
      <Answers categories={answers} choice={choice} setChoice={setChoice}/>
      {choice ? <button onClick={clickHandler}>
          Next
      </button> : ""}
      
    </div>
  );
};

export default Modal1;
