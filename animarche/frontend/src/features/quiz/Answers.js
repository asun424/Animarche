import React from "react";

const Answers = (props) => {
  return (
    <div className="flex flex-col justify-evenly items-start basis-1/3 text-2xl">
      {props.categories.map((answer, index) => (
        <div key={index}>
          <input
            name="categories"
            onClick={(event) => {
              props.setChoice(event.target.value);
            }}
            type="radio"
            value={answer}
          />
          <label htmlFor={answer}>{answer}</label>
        </div>
      ))}
    </div>
  );
};

export default Answers;
