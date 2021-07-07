import { Dialog, Transition } from "@headlessui/react";
import router from "next/router";
import { Fragment, useState, useCallback } from "react";
import { getSession } from "next-auth/client";
import { cloneDeep } from "lodash";

export default function MyModal({
  title,
  isOpen,
  setIsOpen,
  userconfig,
  setuserconfig,
}) {
  const saveToDatabase = async (label, userconfig) => {
    const session = await getSession();
    console.log(
      `Modal title ${title} updating the db now : ${JSON.stringify(userconfig)}`
    );
    if (title == "Add Account") {
      userconfig.accounts.push(label);
    } else if (title == "Add Card") {
      userconfig.cards.push(label);
    } else if (title == "Add Income Category") {
      userconfig.incomeCategories.push(label);
    } else if (title == "Add Goals") {
      userconfig.goals.push(label);
    } else {
      userconfig.expenseCategories.push(label);
    }

    // Loading USER_SETTINGS
    const userConfigs = await fetch(
      "/api/settings/updateuserconfig?" +
        new URLSearchParams({
          name: session.user.name.toLowerCase(),
        }),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userconfig,
        }),
      }
    );
    if (!userConfigs.ok) {
      console.log(
        `User config API error has occured: ${JSON.stringify(userConfigs)}`
      );
    }
    const userConfigs_JSON = await userConfigs.json();
    console.log(
      `userConfigs_JSON update response : ${JSON.stringify(userConfigs_JSON)}`
    );
    userconfig._rev = userConfigs_JSON.rev;
    console.log(
      `*******************userconfig update response : ${JSON.stringify(
        userconfig
      )}`
    );
    setuserconfig(cloneDeep(userconfig));
    setIsOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log("Button clicked : " + event.target.category.value);
    console.log("**********userconfig : " + JSON.stringify(userconfig));
    console.log("Title : " + title);
    saveToDatabase(event.target.category.value, userconfig);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
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
