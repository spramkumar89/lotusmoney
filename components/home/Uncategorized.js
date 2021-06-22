function uncategorized() {
  return (
    <div class="grid grid-flow-row gap-4">
      <div class="bg-gray-100 rounded-lg shadow-md p-2">
        <div class="flex justify-center font-semibold text-blue-500">
          Uncategorised Transactions
        </div>
        <div class="flex justify-between items-center">
          <div class="flex-initial w-3/4">Internet Bill</div>
          <div class="text-green-500">100</div>
        </div>
        <div class="flex justify-between items-center">
          <div class="flex-initial w-3/4">Electricity Bill</div>
          <div class="text-red-500">100</div>
        </div>
        <div class="flex justify-between items-center">
          <div class="flex-initial w-3/4">Telephone Bill</div>
          <div class="text-red-500">100</div>
        </div>
        <div class="flex justify-between items-center">
          <div class="flex-initial w-3/4">Petrol</div>
          <div class="text-red-500">100</div>
        </div>
      </div>
    </div>
  );
}

export default uncategorized;
