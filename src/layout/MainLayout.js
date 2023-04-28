import React, { useState } from "react";
import SideBar from "../components/Sidebar";
import Header from "../components/Header";
import styles from "./MayLayout.module.scss";

const MainLayout = ({ children }) => {
  const [isOpen, setIsopen] = useState(false);

  const ToggleSidebar = () => {
    isOpen === true ? setIsopen(false) : setIsopen(true);
  };
  return (
    <>
      <div className={` ${styles.container}`}>
        <div className="row">
          <div className={`col-2 p-0 m-0 ${styles.sideBar}`}>
            {/* <div className={isOpen && ? `col-2 p-0 m-0 ${styles.sideBar}` : null}> */}
            {/* {isOpen ?<SideBar /> : null} */}
            <SideBar />
          </div>
          <div className="col-12 col-md-10 col-sm-10">
            <div>
              {/* <button
                onClick={ToggleSidebar}
                className="btn btn-light"
              ></button> */}
            </div>
            <div className="header d-flex ">
              <Header />
            </div>
            <div className={`main-content container-fluid pb-5`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
