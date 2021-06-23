import { useState } from "react";

function addcategory() {
  const router = useRouter();
  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    fetch(
      "/api/user/user?" +
        new URLSearchParams({
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      {
        method: "GET",
      }
    )
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
    <form onSubmit={handleSubmit}>
      <div className="flex flex-row">
        <input
          type="text"
          name="category"
          id="category"
          placeholder="Category"
          className="w-3/4 mr-2 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
          autoFocus
          autoComplete="true"
          required
        />
        <button
          type="submit"
          className="w-1/4 mt-2 bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 text-white font-semibold rounded-lg"
        >
          Add
        </button>
      </div>
    </form>
  );
}

export default addcategory;
