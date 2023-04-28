import React, { useState, useEffect } from "react";
import MainLayout from "../../../layout/MainLayout";
import CREATE from "../../../assest/image/settings/create.svg";
import FILTER from "../../../assest/image/settings/filters.svg";
import ASSIGN from "../../../assest/image/settings/play.svg";
import Card1 from "../../../components/cards/Card1";
import styles from "../Assign/Assign.module.scss";
import CreateCard from "../../../components/cards/CreateCrad/CreateCard";
import TRUK from "../../../assest/image/settings/truk.svg";
import VECTOR from "../../../assest/image/settings/Vector (1).svg";
import Input from "../../../components/Input/Index";
import { Link } from "react-router-dom";
import SideLine from "../../../components/cards/CreateCrad/SideLine/Index";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Filtered = () => {
  return (
    <>
      <MainLayout>
        <div className="container-fuild">
          <div className="row mt-5">
            <div className="col-lg-12 col-md-6 col-sm-4">
              <div className="d-flex gap-3">
                <div className="">
                  <Link to="/settings/create">
                    <Card1
                      text={"Create"}
                      icon={CREATE}
                      width={"35px"}
                      height={"35px"}
                      radius={"43.5px"}
                    />
                  </Link>
                </div>
                <div className="">
                  <Link to="/settings/assign">
                    <Card1
                      text={"Assign"}
                      icon={ASSIGN}
                      width={"35px"}
                      height={"35px"}
                      radius={"43.5px"}
                    />
                  </Link>
                </div>
                <div className="">
                  <Link to="/settings/filter">
                    <Card1
                      text={"Filter"}
                      icon={FILTER}
                      width={"35px"}
                      height={"35px"}
                      radius={"43.5px"}
                    />
                  </Link>
                </div>
              </div>
            </div>
            <div class="col-lg-12 col-md-6 col-sm-4 mt-4 ">
              <div className="">
                <div className={styles.sectionHeading}>Filtered By Device</div>
              </div>
              <form>
                <div className={styles.filter_flex}>
                  <div className={styles.filter__input}>
                    <div className={styles.filter_field}>
                      <label htmlFor="camera_height">Camera Height</label>
                      <input
                        type="text"
                        id="camera_height"
                        name="camera_height"
                        placeholder="Enter Height"
                      />
                    </div>
                    <div className={styles.filter_field}>
                      <label htmlFor="camera_angel">Camera Angle</label>
                      <input
                        type="text"
                        id="camera_angel"
                        name="camera_angel"
                        placeholder="Enter Angle"
                      />
                    </div>
                  </div>
                  <div className={styles.filter__input}>
                    <div className={styles.feature_ttl}>Features:</div>
                    <div class={styles.form_group}>
                      <input type="checkbox" id="can" />
                      <label htmlFor="can">CAN</label>
                    </div>
                    <div class={styles.form_group}>
                      <input type="checkbox" id="stats_upload" />
                      <label htmlFor="stats_upload">STATS UPLOADING</label>
                    </div>
                    <div class={styles.form_group}>
                      <input type="checkbox" id="video_upload" />
                      <label htmlFor="video_upload">VIDEO UPLOADING</label>
                    </div>
                    <div class={styles.form_group}>
                      <input type="checkbox" id="risu_catagorization" />
                      <label htmlFor="risu_catagorization">
                        RISU CATEGORIZATION
                      </label>
                    </div>
                  </div>
                </div>
                <div className={styles.filter_btns}>
                  <button>Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default Filtered;
