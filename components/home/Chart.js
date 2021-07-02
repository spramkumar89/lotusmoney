import { Pie, Doughnut } from "react-chartjs-2";

const incomeOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "bottom",
    },
    title: {
      display: true,
      text: "Income",
    },
  },
};

const expenseOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: "bottom",
    },
    title: {
      display: true,
      text: "Expense",
    },
  },
};

function chart({ transactions }) {
  let chartLabels = [];
  let chartData = [];

  transactions.map((trans) => {
    chartLabels.push(trans.value.description);
    chartData.push(trans.value.amount);
  });

  //console.log(`Chart Labels ${chartLabels}`);
  //console.log(`Chart Data ${chartData}`);

  const data = {
    labels: chartLabels,
    datasets: [
      {
        data: chartData,
        backgroundColor: [
          "#e6194b",
          "#3cb44b",
          "#ffe119",
          "#4363d8",
          "#f58231",
          "#911eb4",
          "#46f0f0",
          "#f032e6",
          "#bcf60c",
          "#fabebe",
          "#008080",
          "#e6beff",
          "#9a6324",
          "#800000",
          "#aaffc3",
          "#808000",
          "#ffd8b1",
          "#000075",
          "#808080",
          "#000000",
        ],
      },
    ],
  };

  return (
    <div className="flex flex-col justify-center items-center lg:flex-row bg-gray-200 h-auto shadow-md rounded-lg border-2 border-gray-300">
      <div className="rounded-lg p-2 w-1/2">
        <Doughnut data={data} options={incomeOptions} />
      </div>
      <div className="rounded-lg p-2 w-1/2">
        <Doughnut data={data} options={expenseOptions} />
      </div>
    </div>
  );
}

export default chart;
