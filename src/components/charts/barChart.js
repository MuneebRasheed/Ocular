// @ts-ignore
import React, { useEffect, useState } from "react";
import ResizableBox from "./ResizeableBox";
import useDemoConfig from "./useDemoConfig";
import { Chart } from "react-charts";
import "react-resizable/css/styles.css";
import styles from "../../pages/DashBoard/Dashboard.module.scss";

export default function Bar({ height, datas, title }) {
  const { data, randomizeData } = useDemoConfig({
    series: 1,
    dataType: "ordinal",
  });

  // useEffect(() => {
  //   console.log(JSON.stringify(datas), "dtd");
  // }, [datas]);
  // console.log(JSON.stringify(datas), JSON.stringify(data), "dtd");

  const primaryAxis = React.useMemo(
    () => ({
      // position: "left",
      getValue: (datum) => datum.primary,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    () => [
      {
        // position: "bottom",
        getValue: (datum) => datum.secondary,
      },
    ],
    []
  );

  // console.log("datas", datas);
  const [dat, setDat] = useState([
    {
      label: "Series 1",
      data: [
        {
          primary: "Ordinal Group 0",
          secondary: 33,
          radius: 33,
          fill: "#354657",
        },
        { primary: "Ordinal Group 1", secondary: 38, fill: "#5597e2" },
        {
          primary: "Ordinal Group 2",
          secondary: 54,
          radius: 33,
          fill: "#28A96C",
        },
        {
          primary: "Ordinal Group 8",
          secondary: 9,
          radius: 0,
          fill: "#d44401",
        },
        {
          primary: "Ordinal Group 9",
          secondary: 58,
          radius: 0,
          fill: "#354657",
        },
      ],
    },
  ]);
  // Chart.defaults.global.defaultColor = "orange";
  // setDat(datas);

  // useEffect(() => {});

  return (
    <>
      {/*<button onClick={randomizeData}>Randomize Data</button>*/}
      {/* <div className={styles.chartHeadings}>
        <span className={styles.waiverHeading}>Top Customers</span>
        <br/>
        <span className={styles.waiverDay}>Today january 22nd, 2022</span> */}
      {/* </div> */}

      <ResizableBox height={height}>
        <span
          style={{
            padding: "5px auto 0px 5px ",
            fontFamily: "roboto",
            fontSize: "18px ",
            fontWeight: 400,
          }}
        >
          {title}
        </span>

        <Chart
          options={{
            data: datas,
            primaryAxis,
            secondaryAxes,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          }}
        />
      </ResizableBox>
    </>
  );
}
