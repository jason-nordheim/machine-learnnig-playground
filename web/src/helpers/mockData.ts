import { lerp, remap } from "./math";
import { ChartData, ExtendedPoint } from "../common";

export const generateMockCarData = (numItems: number): ChartData => {
  const mockData: ExtendedPoint[] = [];
  for (let i = 0; i < numItems; i++) {
    const type = Math.random() < 0.5 ? "basic" : "sport";
    const km = lerp(3000, 300000, Math.random());
    const price =
      remap(3000, 300000, 90000, 900, km) + lerp(-20000, 20000, Math.random()) + (type == "basic" ? 0 : 15000);
    mockData.push({
      id: `${i + 1}`,
      text: type,
      altText: type == "basic" ? "🚙" : "🏎️",
      color: type === "basic" ? "blue" : "red",
      point: [km, price],
    });
  }
  const chartData: ChartData = {
    axisLabels: { x: "Km", y: "Price" },
    points: mockData,
  };

  return chartData;
};
