import React, { useState } from "react";
import {useNavigate} from "react-router-dom"

const LandingPage = () => {
  const navigate = useNavigate()
  const [input, setInput] = useState("")

  const inputHandler = event => {
    setInput(event.target.value)
  }

  const searchHandler = () => {
    navigate(`/search?keyword=${input}`)
  }


  return (
    <div className="flex flex-col justify-center h-full basis-[90%]">
      <div className="flex flex-col justify-center">
        <div className="flex justify-center"> Some sort of tagline</div>
        <div className="flex justify-center">
          <input className="rounded-lg w-[50%] h-20 border-2 border-black" onSelect={inputHandler} />
          <button className="border-2 border-black rounded-lg ml-3" onClick={searchHandler}>
            {" "}
            Let's Go!!!{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
