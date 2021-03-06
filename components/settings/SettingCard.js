import { useSelector, useDispatch } from "react-redux";

function SettingCard({ data, userconfig }) {
  console.log(`settingcard - userconfig : ${JSON.stringify(userconfig)}`);
  console.log(`settingcard - data : ${data}`);

  let records = [];
  if (data == "Accounts") {
    records = useSelector((state) => state.user.accounts);
  } else if (data == "Cards") {
    records = useSelector((state) => state.user.cards);
  } else if (data == "IncomeCategories") {
    records = useSelector((state) => state.appConfig.incomeCategories);
  } else if (data == "Goals") {
    records = useSelector((state) => state.appConfig.expenseCategories);
  } else {
    records = useSelector((state) => state.appConfig.goals);
  }
  console.log(`records : ${records}`);
  return (
    <div className="flex flex-wrap">
      {records.map((row, key) => (
        <div
          className="bg-green-200 rounded-full px-2 py-1 m-2 shadow-md hover:bg-green-400"
          key={key}
        >
          {row}
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-y-1 right-1 h-5 w-5 p"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg> */}

          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-y-1 right-1 h-5 w-5 p"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          </svg> */}
        </div>
      ))}
    </div>
  );
}

export default SettingCard;
