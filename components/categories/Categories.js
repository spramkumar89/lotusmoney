function categories({ categories }) {
  return (
    <div className="py-2 flex flex-wrap w-full">
      {categories.map((category, key) => (
        <div className="justify-center font-semibold bg-blue-100 shadow-md rounded-2xl w-min p-2 m-1">
          {category}
        </div>
      ))}
    </div>
  );
}

export default categories;
