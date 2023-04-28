import React from "react";
import styles from "./Input.module.scss";

const Input = ({ placeholder, type, name, value, id, setValue }) => {
  return (
    <div className={styles.inputContainer}>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        id={id}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  );
};

export default Input;
