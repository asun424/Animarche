import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal1 from "./quiz/Modal1";
import Modal2 from "./quiz/Modal2";
import Modal3 from "./quiz/Modal3";
import Modal4 from "./quiz/Modal4";
import Modal5 from "./quiz/Modal5";

const QuizPage = () => {
  const [modal, setModal] = useState(null);
  const [score, setScore] = useState([]);
  const [recommendation, setRecommendation] = useState(null);

  console.log("SCORE IS: ", score);

  const modalHandler = () => {
    if (!modal) {
      setModal(1);
    } else if (modal === 1) {
      setModal(2);
    } else if (modal === 2) {
      setModal(3);
    } else if (modal === 3) {
      setModal(4);
    } else if (modal === 4) {
      setModal(5);
    } else if (modal === 5) {
      setModal("finish");
    }
  };

  console.log(recommendation)

  return (
    <div className="flex flex-col justify-center items-center basis-[90%]">
      {modal === 5 ? (
        <Modal5
          setModal={setModal}
          previousScore={score}
          setScore={setScore}
          setRecommendation={setRecommendation}
        />
      ) : modal === 4 ? (
        <Modal4 setModal={setModal} setScore={setScore} />
      ) : modal === 3 ? (
        <Modal3 setModal={setModal} setScore={setScore} />
      ) : modal === 2 ? (
        <Modal2 setModal={setModal} setScore={setScore} />
      ) : modal === 1 ? (
        <Modal1 setModal={setModal} setScore={setScore} />
      ) : (
        <>
          {modal ? (
            <div className="flex flex-col justify-evenly items-center basis-2/3">
              <h1 className="text-4xl">{recommendation.name}</h1>
              <img className="h-2/3 w-4/5" src={recommendation.gif} />
              <div className="flex justify-between w-2/3">
                <a href={`/search?keyword=${recommendation.name}`} className="px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Look up merch!
                </a>
                <a href="/quiz" className="px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Try quiz again!
                </a>
              </div>
            </div>
          ) : (
            <div className="flex flex-col justify-evenly basis-1/2">
              <div className="text-center text-2xl">
                If you're new to anime or just quite aren't sure what you're in
                the mood for, take this nifty quiz for a recommendation!
              </div>
              <div className="flex flex-row justify-center text-center">
                <button className="flex basis-1/7 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-6 py-3.5  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 text-center" onClick={modalHandler}> Start Quiz </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default QuizPage;
