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
    <div className="flex flex-col justify-evenly items-center basis-full">
      <h1 className="text-4xl">What genre do you prefer?</h1>
      <Answers categories={answers} choice={choice} setChoice={setChoice}/>
     <button className={`px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${choice ? "visible": "invisible"}`} onClick={clickHandler}>
          Next
      </button>
      
    </div>
  );
};

export default Modal1;
