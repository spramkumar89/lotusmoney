import Head from "next/head";
import { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { signIn, signOut, useSession } from "next-auth/client";
import { useSelector, useDispatch } from "react-redux";
import { updateSelectedMonth } from "../backend/state/homeSlice";
import { useRouter } from "next/router";
import Link from "next/link";

const navigation = ["Home", "Transaction", "Reports", "Settings"];
const navigationValues = ["/home", "/transaction", "/home", "/settings"];
const profile = ["Your Profile", "Settings", "Signout"];
const profileValues = ["/home", "/home", "/"];
const features = ["Categories", "Rules", "Accounts", "Goals", "Budget"];
const featuresValues = ["/categories", "/home", "/accounts", "/home", "/home"];
const monthsarr = [
  undefined,
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function navbar({ showMonth }) {
  const dispatch = useDispatch();
  let availableMonths = useSelector((state) => state.home.availableMonths);
  availableMonths = availableMonths.slice().sort().reverse();
  console.log(
    `NavBar Session inside component ${JSON.stringify(
      availableMonths
    )} : showMonth : ${showMonth}`
  );
  const router = useRouter();

  function onMonthChange(event) {
    console.log("Inside the month change method : " + event.target.value);
    dispatch(updateSelectedMonth(event.target.value));
  }

  return (
    <>
      <Head>
        <title>LotusMoney</title>
        <meta name="description" content="All in one personal finance app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Disclosure as="nav" className="bg-gray-50">
        {({ open }) => (
          <>
            <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-12">
                <div className="flex items-center">
                  <div className="flex-shrink-0 text-blue-500 font-bold">
                    LOTUSMONEY
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item, itemIdx) => (
                        <Link key={item} href={navigationValues[itemIdx]}>
                          <a className="hover:bg-gray-600 hover:text-white px-3 py-2 rounded-md font-mono text-md uppercase text-blue-500">
                            {item}
                          </a>
                        </Link>
                      ))}

                      <Menu as="div" className="relative">
                        {({ open }) => (
                          <>
                            <div>
                              <Menu.Button className="hover:bg-gray-600 hover:text-white px-3 py-2 rounded-md font-mono text-md uppercase text-blue-500">
                                Features
                              </Menu.Button>
                              <Transition
                                show={open}
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                              >
                                <Menu.Items
                                  static
                                  className="origin-top-right absolute left-0 mt-2 w-48 rounded-md shadow-sm py-1 bg-white focus:outline-none"
                                >
                                  {features.map((item, itemIdx) => (
                                    <Menu.Item key={item}>
                                      {({ active }) => (
                                        <Link
                                          key={featuresValues[itemIdx]}
                                          href={featuresValues[itemIdx]}
                                        >
                                          <a
                                            className={classNames(
                                              active ? "bg-gray-50" : "",
                                              "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-600 hover:text-white "
                                            )}
                                          >
                                            {item}
                                          </a>
                                        </Link>
                                      )}
                                    </Menu.Item>
                                  ))}
                                </Menu.Items>
                              </Transition>
                            </div>
                          </>
                        )}
                      </Menu>
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    {showMonth && (
                      <select
                        name="account"
                        className="form-select mr-4 my-4 h-10 rounded-lg bg-gray-200 font-mono"
                        defaultValue={"DEFAULT"}
                        onChange={onMonthChange}
                      >
                        {availableMonths.map((item, itemIdx) => (
                          <option
                            className="bg-blue-300 text-gray-700"
                            key={itemIdx}
                          >
                            {`${monthsarr[parseInt(item.key[0])]} ${
                              item.key[1]
                            }`}
                          </option>
                        ))}
                      </select>
                    )}

                    <button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative">
                      {({ open }) => (
                        <>
                          <div>
                            <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src="https://media.newstracklive.com/uploads/education-news/general-knowledge/Apr/20/big_thumb/sparrow_5cbb0193673b6.jpg"
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            show={open}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-sm py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              {profile.map((item, itemIdx) => (
                                <Menu.Item key={item}>
                                  {({ active }) => (
                                    <Link key={item} href="/">
                                      <a
                                        className={classNames(
                                          active ? "bg-gray-50" : "",
                                          "block px-4 py-2 text-sm text-gray-700"
                                        )}
                                        onClick={
                                          item === "Signout"
                                            ? () => {
                                                console.log(
                                                  "Signout is called"
                                                );
                                                signOut();
                                                router.push("/");
                                              }
                                            : () => {}
                                        }
                                      >
                                        {item}
                                      </a>
                                    </Link>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navigation.map((item, itemIdx) => (
                  <Link key={item} href="#">
                    <a className="text-gray-00 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                      {item}
                    </a>
                  </Link>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-white">
                      Tom Cook
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-400">
                      tom@example.com
                    </div>
                  </div>
                  <button className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {profile.map((item) => (
                    <Link key={item} href="#">
                      <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                        {item}
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <hr></hr>
    </>
  );
}

export default navbar;
