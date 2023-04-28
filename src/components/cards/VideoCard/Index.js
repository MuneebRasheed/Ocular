import React from "react";
import styles from "./videoCard.module.scss";

const VideoCard = ({ width, height, iconWidth, iconHeight ,videoIcon}) => {
  return (
    <>
      <div className="container-fuild">
        <div
          className={styles.videoContainer}
          style={{ width: width, height: height }}
        >
          {/* <video width="99%" height="99%" controls src='https://www.youtube.com/watch?v=hZzstEBwzTM' /> */}
          <div className={styles.palyIcon}>
            <img
              src={videoIcon}
              width={iconWidth}
              height={iconHeight}
              className={styles.videoIcon}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
