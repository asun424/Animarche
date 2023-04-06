import React, {useState} from "react";
import Answers from "./Answers";

const Modal4 = (props) => {
  const setModal = props.setModal;
  const setScore = props.setScore;

  const [choice, setChoice] = useState("")
  console.log("CHOICE IS: ", choice)

  const clickHandler = () => {
    let score;
    if (choice === "people who talk loudly in public") {
      score = [1, 0, 0, 0, 0];
    } else if (choice === "not being the best there ever was") {
      score = [0, 1, 0, 0, 0];
    } else if (choice === "100% humidity in summer heat") {
      score = [0, 0, 1, 0, 0];
    } else if (choice === "happy endings") {
      score = [0, 0, 0, 1, 0];
    } else if (choice === "earphones getting inexplicably tangled") {
      score = [0, 0, 0, 0, 1];
    }

    setScore((preV) => [...preV, score]);
    setModal(5);
  };

  const answers = ["people who talk loudly in public", "not being the best there ever was", "100% humidity in summer heat", "happy endings", "earphones getting inexplicably tangled"]

  return (
    <div>
      <h1>What drives you nuts?</h1>
      <Answers categories={answers} choice={choice} setChoice={setChoice}/>
      {choice ? <button onClick={clickHandler}>
          Next
      </button> : ""}
    </div>
  );
};

export default Modal4;
