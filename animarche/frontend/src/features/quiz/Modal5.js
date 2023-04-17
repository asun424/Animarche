import React, { useState } from "react";
import axios from "axios";
import Answers from "./Answers";

const Modal5 = (props) => {
  const setModal = props.setModal;
  const setScore = props.setScore;

  const [choice, setChoice] = useState("");
  console.log("CHOICE IS: ", choice);

  const clickHandler = () => {
    let score;
    if (choice === "some mathrock going on metal") {
      score = [1, 0, 0, 0, 0];
    } else if (choice === "pop music with touches of edm") {
      score = [0, 1, 0, 0, 0];
    } else if (choice === "classical music 4 lyfe") {
      score = [0, 0, 1, 0, 0];
    } else if (choice === "the lofi girl") {
      score = [0, 0, 0, 1, 0];
    } else if (choice === "gym music but BETTER") {
      score = [0, 0, 0, 0, 1];
    }

    const getRecommendation = async (score) => {
      const { data } = await axios.post("/api/recommendation/", { score });
      props.setRecommendation(data);
      setScore([]);
      setModal("finish");
    };

    getRecommendation([...props.previousScore, score]);
  };

  const answers = [
    "some mathrock going on metal",
    "pop music with touches of edm",
    "classical music 4 lyfe",
    "the lofi girl",
    "gym music but BETTER",
  ];

  return (
    <div className="flex flex-col justify-evenly items-center basis-full">
      <h1 className="text-4xl">What's on your playlist right now</h1>
      <Answers categories={answers} choice={choice} setChoice={setChoice} />
      <button
        className={`px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
          choice ? "visible" : "invisible"
        }`}
        onClick={clickHandler}
      >
        Next
      </button>
    </div>
  );
};

export default Modal5;
