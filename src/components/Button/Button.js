// import { Component } from "react";
import css from "./Button.module.css";

function Button(props) {
  const handleOnClick = (evt) => {
    evt.preventDefault();
    props.next();
  };

  return (
    <div className={css.container}>
      <button className={css.Button} onClick={handleOnClick}>
        Load more
      </button>
    </div>
  );
}

export default Button;
