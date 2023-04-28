import React from "react";
import styles from "./Car2.module.scss";
const Card2 = ({ text, count, color, type }) => {
  return (
    <div className=" mt-5">
      <div className={styles.cardContainer}>
        <div className={styles.cardItem}>
          <span>{text}</span>
        </div>

        <div className={styles.num}>
          <div>
            <div style={{ color: color }}>{count}</div>
            <div className={styles.numItem}>
              {type === "level3" ? (
                <>
                  {/* <div className={styles.numItem}>
                    <div>70</div>
                    <div>|</div>
                    <div>25</div>
                  </div> */}
                </>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card2;
