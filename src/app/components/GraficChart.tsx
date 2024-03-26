import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {
  hoverBackgroundColor,
  backgroundColor,
  borderColor,
} from "../helpers/backgrounds-grafic";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function GraphicTotal({
  contenedorTotal,
}: {
  contenedorTotal: {
    [x: string]: { date: string; value: string; description: string };
  };
}) {
  const GraphicLabels = Object.keys(contenedorTotal);
  const GraphicValues = Object.values(contenedorTotal).map(
    (data) => data.value
  );

  const data = {
    labels: GraphicLabels,
    datasets: [
      {
        label: "Valor",
        data: GraphicValues,
        backgroundColor,
        borderColor,
        hoverBackgroundColor,
        borderWidth: 1,
        hoverOffset: 4,
      },
    ],
  };

  return <Doughnut data={data} />;
}
