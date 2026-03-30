import { ResponsiveBar } from "@nivo/bar";
import { charttheme } from "./utils";
// import { useTheme } from "styled-components";

const BarChart = ({
  data,
  keys,
  indexBy,
  props,
}: {
  data: any;
  props: any;
  keys: string[];
  indexBy: string;
}) => {
  // const theme = useTheme();

  return (
    <ResponsiveBar
      data={data}
      keys={keys}
      indexBy={indexBy}
      {...props}
      margin={{ top: 50, right: 0, bottom: 100, left: 50 }}
      padding={0.125}
      innerPadding={2}
      borderRadius={4}
      borderWidth={1}
      groupMode={"stacked"}
      borderColor={{ from: "color", modifiers: [["brighter", 0.5]] }}
      colors={{ scheme: "tableau10" }}
      axisBottom={{
        tickRotation: -45,
        truncateTickAt: 10,
      }}
      axisLeft={{
        legend: "Messages",
        legendPosition: "middle",
        legendOffset: -40,
        tickValues: 3,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor="white"
      // legends={[
      //   {
      //     dataFrom: "keys",
      //     anchor: "bottom-right",
      //     direction: "column",
      //     translateX: 120,
      //     itemWidth: 100,
      //     itemHeight: 20,
      //     itemsSpacing: 2,
      //     symbolSize: 20,
      //   },
      // ]}
      animate={true}
      theme={charttheme}
    />
  );
};

export default BarChart;
