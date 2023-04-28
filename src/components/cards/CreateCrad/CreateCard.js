import { CardContent } from "@material-ui/core";
import React, { Children } from "react";
import Input from "../../Input/Index";
import styles from "./CreateCard.module.scss";
import SideLine from "./SideLine/Index";
const CreateCard = ({
  icon,
  children,
  width,
  height,
  type,
  style,
  sideBar,
  oncdlick,
}) => {
  return (
    <>
      <div
        className={styles.cardContainer}
        style={{ width: width, height: height }}
      >
        <div>
          {icon ? <img src={icon} className={styles.cardIcon} /> : null}
        </div>
        <div>{children}</div>
      </div>
      {sideBar ? (
        <SideLine type={type} style={style} oncdlick={oncdlick} />
      ) : null}
    </>
  );
};

export default CreateCard;
