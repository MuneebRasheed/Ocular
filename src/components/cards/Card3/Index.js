import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card3.module.scss";
const Card3 = ({ cardIcon, name, path, width, height }) => {
  return (
    <Link to={path} style={{ width: "32%" }}>
      <div className={`${styles.cardContainer}`}>
        <div>
          <img src={cardIcon} alt={name} width={width} />
        </div>
        <div>
          <p>{name}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card3;
