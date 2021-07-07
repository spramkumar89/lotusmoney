import { Menu, Transition, Dialog } from "@headlessui/react";
import { Fragment, useEffect, useRef, useState } from "react";
import AddModal from "./AddModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AddButton({ userconfig, setuserconfig }) {
  const navigation = [
    "Add Account",
    "Add Card",
    "Add Income Category",
    "Add Expense Category",
    "Add Goals",
  ];

  let [title, setTitle] = useState("");
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal(item) {
    setIsOpen(true);
    setTitle(item);
  }

  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="p-0 w-12 h-12 bg-red-600 rounded-full hover:bg-red-400 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none">
            <svg
              viewBox="0 0 20 20"
              enableBackground="new 0 0 20 20"
              className="w-6 h-6 inline-block"
            >
              <path
                fill="#FFFFFF"
                d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"
              ></path>
            </svg>
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute top-0 w-56 -mt-48 -ml-44 origin-bottom-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {navigation.map((item, itemIdx) => (
                <Menu.Item key={item}>
                  {({ active }) => (
                    <div>
                      <a
                        onClick={() => openModal(item)}
                        className={classNames(
                          active ? "bg-gray-50" : "",
                          "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-600 hover:text-white "
                        )}
                      >
                        {item}
                      </a>
                    </div>
                  )}
                </Menu.Item>
              ))}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <AddModal
        isOpen={isOpen}
        title={title}
        setIsOpen={setIsOpen}
        setuserconfig={setuserconfig}
        userconfig={userconfig}
      />
    </div>
  );
}
