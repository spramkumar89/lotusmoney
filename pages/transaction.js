import NavBar from "../components/NavBar";
import Transaction from "../components/transaction/Transaction";

function transaction({ category }) {
  return (
    <div>
      <NavBar />

      <main className="bg-gray-50">
        <div className="max-w-lg mx-auto py-2 sm:px-6 lg:px-8">
          <Transaction categories={category} />
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  let categories = await loadCategoryValues();
  //console.log(`categoryWise response row ${JSON.stringify(categoryWise)}`);

  return {
    props: {
      category: categories,
    },
  };
}

async function loadCategoryValues() {
  let userRes = await fetch(`${process.env.DBURL}/test/test`);
  if (!userRes.ok) {
    const message = `An error has occured: ${top_trans_res.status}`;
    userRes.rows = "NO_USER_RECORD";
  }
  let userResJSON = await userRes.json();
  //console.log(`userResJSON : ${JSON.stringify(userResJSON)}`);
  let categories = userResJSON.categories;
  //console.log(`categories : ${Categories}`);
  return categories;
}

export default transaction;
