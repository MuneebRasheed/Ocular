import ResizableBox from "./ResizeableBox";
import useDemoConfig from "./useDemoConfig";
import React from "react";
import { AxisOptions, Chart } from "react-charts";

export default function Line() {
  const { data, randomizeData } = useDemoConfig({
    series: 1,
    dataType: "ordinal",
  });

  const primaryAxis = React.useMemo(
      () => ({
        getValue: (datum) => datum.primary,
      }),
        []
    );

  const secondaryAxes = React.useMemo(
      () => [
        {
          getValue: (datum) => datum.secondary,
        },
      ],
        []
    );

  return (
    <>
      {/*<button onClick={randomizeData}>Randomize Data</button>*/}
      <ResizableBox>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
          }}
        />
      </ResizableBox>
    </>
  );
}

