import React from "react";
import ARROW from "../../../../assest/image/settings/arrow.svg";
import styles from "./SideLine.module.scss";
const SideLine = ({ type, style, stylesIcon1, stylesIcon2, oncdlick }) => {
  let name = "mm";
  return (
    <>
      <div
        className={styles.sideLine}
        style={style}
        onClick={() => {
          oncdlick();
        }}
      >
        {type === "create" ? (
          <img
            src={ARROW}
            className={`${styles.arrowIcon1}`}
            style={{ stylesIcon1 }}
          />
        ) : (
          ""
        )}
        <img
          src={ARROW}
          alt={"Arrow"}
          className={styles.arrowIcon}
          style={{ stylesIcon2 }}
        />
      </div>
    </>
  );
};

export default SideLine;
