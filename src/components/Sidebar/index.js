import React, { useEffect } from "react";
import styles from "./Sidebar.module.scss";
import logo from "../../assest/image/sidebar/ocularlogo.svg";
import ICON from "../../assest/image/sidebar-icon/DashboardIcon.svg";
import VIDEO from "../../assest/image/sidebar-icon/videoIcon.svg";
import RAWDATAICON from "../../assest/image/sidebar-icon/RawDataIcon.svg";
import SETTINGICON from "../../assest/image/sidebar-icon/SettingIcon.svg";
import { Link, NavLink, useParams, useLocation } from "react-router-dom";

const SideBar = (props) => {
  let id = useLocation();
  let params = id.pathname;
  // console.log(localStorage.getItem("Type"));
  function Logout() {
    console.log("Logout");
  }

  return (
    <div className={`conatainer-fuild text-start ${styles.sidebarContainer}`}>
      {/* {console.log("sidebarVause", props)} */}
      <div className="row">
        <div className="col-lg-12">
          <ul>
            <li>
              <div className={styles.sidebarLogo}>
                <img src={logo} alt="image" />
              </div>
            </li>
            <li className={params === "/dashboard" ? `${styles.active}` : ""}>
              <Link to={"/dashboard"}>
                <div className={`${styles.itemContainer}`}>
                  <div>
                    <img
                      src={ICON}
                      alt={"dashboard"}
                      className={styles.sidebarICon}
                    />
                  </div>
                  <div className={styles.active}>
                    <span>Dashboard</span>
                  </div>
                </div>
              </Link>
            </li>
            <li className={params === "/video" ? `${styles.active}` : ""}>
              <Link to={"/video"}>
                <div className={`${styles.itemContainer}`}>
                  <div>
                    <img
                      src={VIDEO}
                      alt={"video"}
                      className={styles.sidebarICon}
                    />
                  </div>
                  <div className={styles.active}>
                    <span>Videos</span>
                  </div>
                </div>
              </Link>
            </li>
            <li className={params === "/raw-data" ? `${styles.active}` : ""}>
              <Link to={"/raw-data"}>
                <div className={`${styles.itemContainer}`}>
                  <div>
                    <img
                      src={RAWDATAICON}
                      alt={"raw-data"}
                      className={styles.sidebarICon}
                    />
                  </div>
                  <div className={styles.active}>
                    <span>Raw Data</span>
                  </div>
                </div>
              </Link>
            </li>
            {localStorage.getItem("Type") == "Admin" ? (
              <li
                className={
                  params === "/settings" ||
                  params === "/settings/create" ||
                  params === "/settings/assign"
                    ? `${styles.active}`
                    : ""
                }
              >
                <Link to={"/settings"}>
                  <div className={`${styles.itemContainer}`}>
                    <div>
                      <img
                        src={SETTINGICON}
                        alt={"settings"}
                        className={styles.sidebarICon}
                      />
                    </div>
                    <div className={styles.active}>
                      <span>Setting</span>
                    </div>
                  </div>
                </Link>
              </li>
            ) : null}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
