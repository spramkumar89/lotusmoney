import { useSelector } from "react-redux";
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

function chart() {
  let monthlyTransactions = useSelector(
    (state) => state.home.monthlyTransactions
  );
  console.log(`Monthly Transactions : ${JSON.stringify(monthlyTransactions)}`);
  let incomeTransactions = monthlyTransactions.filter(
    (transaction) => transaction.value.transaction_type == "Income"
  );
  console.log(`Income Transactions : ${incomeTransactions}`);
  let expenseTransactions = monthlyTransactions.filter(
    (transaction) => transaction.value.transaction_type == "Expense"
  );
  console.log(`Expense Transactions : ${expenseTransactions}`);

  let incomeChartLabels = [];
  let incomeChartData = [];
  incomeTransactions.map((trans) => {
    incomeChartLabels.push(trans.value.description);
    incomeChartData.push(trans.value.amount);
  });

  let expenseChartLabels = [];
  let expenseChartData = [];
  expenseTransactions.map((trans) => {
    expenseChartLabels.push(trans.value.description);
    expenseChartData.push(trans.value.amount);
  });

  //console.log(`Chart Labels ${chartLabels}`);
  //console.log(`Chart Data ${chartData}`);

  let incomeData = {
    labels: incomeChartLabels,
    datasets: [
      {
        data: incomeChartData,
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

  let expenseData = {
    labels: expenseChartLabels,
    datasets: [
      {
        data: expenseChartData,
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
    <div className="flex flex-col justify-center items-center lg:flex-row bg-gray-200 h-auto shadow-lg rounded-lg">
      <div className="rounded-lg p-2 w-1/2">
        <Doughnut data={incomeData} options={incomeOptions} />
      </div>
      <div className="rounded-lg p-2 w-1/2">
        <Doughnut data={expenseData} options={expenseOptions} />
      </div>
    </div>
  );
}

export default chart;
