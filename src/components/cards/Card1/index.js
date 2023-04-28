import React from "react";
import Mainlayout from "../../../layout/MainLayout";
import styles from "./card1.module.scss";

const Card1 = ({
  icon,
  text,
  height,
  width,
  radius,
  togle = false,
  data,
  setMethod,
}) => {
  return (
    <div className="mt-md-2">
      <div className={styles.cardContainer} style={{ borderRadius: radius }}>
        <div className={styles.cardItem}>
          <img src={icon} alt={text} width={width} height={height} />
        </div>
        <div>
          <span>
            {togle ? (
              <select
                class="form-select "
                aria-label="Default select example"
                className={styles.dropdown}
                style={{
                  backgroundColor: "#21222d",
                  color: "white",
                  borderColor: "#21222d",
                  width: "97px",
                }}
                onChange={(e) => {
                  // console.log("dropdown", e.target.value);
                  setMethod(e.target.value);
                  localStorage.setItem(text, e.target.value);
                }}
              >
                <option selected>Select</option>
                {data?.map((vec) => (
                  <option value={vec?.id} key={vec?.id}>
                    {vec?.name}
                  </option>
                ))}
                ;
              </select>
            ) : (
              text
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card1;
