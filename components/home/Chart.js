import { Pie } from "react-chartjs-2";

const data = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};

function chart() {
  return (
    <div class="flex flex-col justify-center items-center lg:flex-row bg-gray-100 h-auto shadow-md">
      <div class="rounded-lg p-2 w-1/2">
        <Pie data={data} />
      </div>
      <div class="rounded-lg p-2 w-1/2">
        <Pie data={data} />
      </div>
    </div>
  );
}

export default chart;
