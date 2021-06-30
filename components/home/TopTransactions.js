import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
function toptransactions() {
  const router = useRouter();
  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    fetch("/api/home/toptransactions", {
      method: "GET",
    })
      .then((res) => {
        console.log(`Front end authentication response ${JSON.stringify(res)}`);
        if (res.ok) {
          console.log(`res ok ${res}`);
          router.push("/home");
        } else {
          console.log(`res ok else ${res}`);
          router.push("/");
        }
      })
      .catch((error) => {
        console.log(
          `Front end authentication error response ${JSON.stringify(res)}`
        );
        router.push("/");
      });
  }, []);

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-2">
      <div className="flex justify-center font-semibold text-blue-500">
        Top 10 Transactions
      </div>
      <div className="flex justify-between items-center">
        <div className="flex-initial w-3/4">Internet Bill</div>
        <div className="text-green-500">100</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex-initial w-3/4">Electricity Bill</div>
        <div className="text-red-500">100</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex-initial w-3/4">Telephone Bill</div>
        <div className="text-red-500">100</div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex-initial w-3/4">Petrol</div>
        <div className="text-red-500">100</div>
      </div>
    </div>
  );
}

export default toptransactions;
