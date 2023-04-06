import React, {useState} from "react";
import axios from "axios"
import Answers from "./Answers";

const Modal5 = (props) => {
  const setModal = props.setModal;
  const setScore = props.setScore;

  const [choice, setChoice] = useState("")
  console.log("CHOICE IS: ", choice)

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
      const {data} = await axios.post("/api/recommendation/", {score})
      props.setRecommendation(data)
      setScore([]);
      setModal("finish");
    }

    getRecommendation([...props.previousScore, score]) 
  };

  const answers = ["some mathrock going on metal", "pop music with touches of edm", "classical music 4 lyfe", "the lofi girl", "gym music but BETTER"]

  return (
    <div>
      <h1>What's on your playlist right now</h1>
      <Answers categories={answers} choice={choice} setChoice={setChoice}/>
      {choice ? <button onClick={clickHandler}>
          Next
      </button> : ""}
    </div>
  );
};

export default Modal5;
