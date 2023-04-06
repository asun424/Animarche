import React, { useState, useEffect } from "react";
import axios from "axios"
import Modal1 from "./quiz/Modal1";
import Modal2 from "./quiz/Modal2";
import Modal3 from "./quiz/Modal3";
import Modal4 from "./quiz/Modal4";
import Modal5 from "./quiz/Modal5";

const QuizPage = () => {
  const [modal, setModal] = useState(null);
  const [score, setScore] = useState([]);
  const [recommendation, setRecommendation] = useState(null)

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

  return (
    <div className="flex flex-col justify-center basis-[90%]">
      {modal === 5 ? (
        <Modal5 setModal={setModal} previousScore={score} setScore={setScore} setRecommendation={setRecommendation} />
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
            <>{recommendation}</>
          ) : (
            <>
              <div className="text-center">
                If you're new to anime or just quite aren't sure what you're in
                the mood for, take this nifty quiz for a recommendation!
              </div>
              <button onClick={modalHandler}> Start Quiz </button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default QuizPage;
