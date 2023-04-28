import React, { useState } from "react";
import styles from "./header.module.scss";
import VECTOR from "../../assest/image/Vector.svg";
import PROFILE from "../../assest/image/User-profile.svg";
import { Link, NavLink, useParams, useLocation } from "react-router-dom";
import { Transform } from "@material-ui/icons";

const Index = () => {
  const [openDropdwon, setOpenDropdwon] = useState(false);

  const handleDeopdwon = () => {
    setOpenDropdwon((prv) => !prv);
  };
  return (
    <>
      <div className={`container-fluid mt-2 p-0 ${styles.cont}`}>
        <div className={styles.contet}>
          <div>
            <img
              src={PROFILE}
              alt={"user.name"}
              width={"22px"}
              height={"22px"}
            />
          </div>
          <div>
            <div className={`${styles.itemContainer}`}>
              <span style={{ color: "white", fontFamily: "roboto" }}>
                {localStorage.getItem("UserEmail")}
              </span>
            </div>

            {/* <span>{localStorage.getItem("UserEmail")}</span> */}
          </div>
          <div>
            <img
              src={VECTOR}
              alt="vector"
              width={"14px"}
              height={"14px"}
              style={openDropdwon ? { transform: "rotate(180deg)" } : null}
              onClick={handleDeopdwon}
            />
          </div>
        </div>
      </div>
      {openDropdwon ? (
        <Link to={"/"}>
          <span
            className={`${styles.dropdwon} bg-white btn-light px-3 mt-1 py-1 text-drak`}
            onClick={() => {
              localStorage.removeItem("Token");
            }}
          >
            Log Out
          </span>
        </Link>
      ) : null}
    </>
  );
};

export default Index;
