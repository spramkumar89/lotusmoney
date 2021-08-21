import NavBar from "../components/NavBar";
import AddTransaction from "../components/transaction/AddTransaction";
import ImportTransaction from "../components/transaction/ImportTransaction";
import { useSelector, useDispatch } from "react-redux";
import {
  updateAddButton,
  updateImportButton,
  updateFilterButton,
} from "../pages/state/transactionSlice";

function transaction({ category }) {
  const dispatch = useDispatch();
  let addTransactionMenu = useSelector(
    (state) => state.transaction.addTransaction
  );
  let importTransactionMenu = useSelector(
    (state) => state.transaction.importTransaction
  );
  let filterTransactionMenu = useSelector(
    (state) => state.transaction.filterTransaction
  );
  return (
    <div>
      <NavBar />

      <main className="bg-gray-50 h-full">
        <div className="flex flex-col md:flex-row py-6 px-6 max-h-full">
          <div className="bg-gray-600 md:w-1/4 rounded-l-lg shadow-lg">
            <div className="flex flex-col pt-4">
              <div
                className="font-mono text-lg mx-4 my-2 px-2 bg-yellow-500 hover:bg-yellow-200 rounded-md shadow-md text-gray-900"
                onClick={() => dispatch(updateAddButton())}
              >
                AddTransaction
              </div>
              <div
                className="font-mono text-lg mx-4 my-2 px-2 bg-yellow-500 hover:bg-yellow-200 rounded-md shadow-md text-gray-900"
                onClick={() => dispatch(updateImportButton())}
              >
                ImportTransaction
              </div>
              <div
                className="font-mono text-lg mx-4 my-2 px-2 bg-yellow-500 hover:bg-yellow-200 rounded-md shadow-md text-gray-900"
                onClick={() => dispatch(updateFilterButton())}
              >
                FilterTransaction
              </div>
            </div>
          </div>
          <div className="bg-gray-400 md:w-3/4 p-4 rounded-r-lg shadow-lg">
            {addTransactionMenu && <AddTransaction />}
            {importTransactionMenu && <ImportTransaction />}

            {/*<div className="border border-b-2 mt-2 mb-2 border-yellow-500"></div>
             <TypeMenu /> <TransactionTable />*/}
          </div>
        </div>
      </main>
    </div>
  );
}

export default transaction;
