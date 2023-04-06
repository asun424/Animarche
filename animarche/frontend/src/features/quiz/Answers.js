import React from "react";

const Answers = (props) => {
  return (
    <>
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
    </>
  );
};

export default Answers;
