import NavBar from "../components/NavBar";
import Transaction from "../components/transaction/Transaction";

function transaction() {
  return (
    <div>
      <NavBar />

      <main className="bg-gray-50">
        <div className="max-w-lg mx-auto py-2 sm:px-6 lg:px-8">
          <Transaction />
        </div>
      </main>
    </div>
  );
}

export default transaction;
