import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { charttheme } from "./utils";

const PieChart = ({ data, ...props }: { data: any }) => {
  return (
    <ResponsivePie
      data={data}
      animate
      sortByValue={false}
      innerRadius={0.75}
      padAngle={2}
      cornerRadius={4}
      colors={{ datum: "data.color" }}
      borderWidth={1}
      borderColor={{ from: "color", modifiers: [["brighter", 0.8]] }}
      margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#ffffff88"
      arcLinkLabelsThickness={2}
      arcLinkLabelsColor={{ from: "color", modifiers: [["darker", 2]] }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: "color",
        modifiers: [["darker", 2]],
      }}
      arcLinkLabel={(d) => `${d.label}`}
      enableArcLabels={false}
      arcLinkLabelsOffset={4}
      arcLinkLabelsDiagonalLength={8}
      arcLinkLabelsStraightLength={8}
      arcLinkLabelsTextOffset={4}
      theme={charttheme}
      {...props}
    />
  );
};

export default PieChart;
