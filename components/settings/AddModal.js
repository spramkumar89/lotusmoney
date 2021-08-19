import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { updateUser, addAccount, addCard } from "../../pages/state/userSlice";
import {
  updateAppConfig,
  addIncomeCategory,
  addExpenseCategory,
  addGoal,
} from "../../pages/state//appConfigSlice";

export default function MyModal({ title, isOpen, setIsOpen }) {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    let label = event.target.category.value;
    console.log("Button clicked : " + event.target.category.value);
    if (title == "Add Account") {
      dispatch(addAccount(label));
      dispatch(updateUser(label));
    } else if (title == "Add Card") {
      dispatch(addCard(label));
      dispatch(updateUser(label));
    } else if (title == "Add Income Category") {
      dispatch(addIncomeCategory(label));
      dispatch(updateAppConfig(label));
    } else if (title == "Add Goals") {
      dispatch(addGoal(label));
      dispatch(updateAppConfig(label));
    } else {
      dispatch(addExpenseCategory(label));
      dispatch(updateAppConfig(label));
    }

    setIsOpen(false);
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-20" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {title}
                </Dialog.Title>
                <form className="mt-6" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="category"
                    id="category"
                    placeholder="Category"
                    className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
                    autoComplete="off"
                    autoFocus
                    required
                  />

                  <button
                    type="submit"
                    className="mt-4 inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  >
                    Add
                  </button>
                </form>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
