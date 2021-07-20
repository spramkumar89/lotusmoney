import { Popover, Transition } from "@headlessui/react";
import { useState } from "react";
import { usePopper } from "react-popper";

export default function TypeMenu() {
  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();
  let { styles, attributes } = usePopper(referenceElement, popperElement);
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <Popover.Button ref={setReferenceElement}>
            <span>Solutions</span>
          </Popover.Button>
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          ></Transition>
          <Popover.Panel
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            <div className="grid grid-cols-2 m-2 p-2 bg-indigo-400">
              <div className="flex flex-col">
                <div className="font-mono text-xl text-red-700">
                  Income Categories
                </div>
                <div className="font-mono text-lg">Test1</div>
                <div className="font-mono text-lg">Test2</div>
                <div className="font-mono text-lg">Test3</div>
                <div className="font-mono text-lg">Test4</div>
              </div>
              <div className="flex flex-col pl-2">
                <div className="font-mono text-xl text-red-700">
                  Expense Categories
                </div>
                <div className="font-mono text-lg">Test1</div>
                <div className="font-mono text-lg">Test2</div>
                <div className="font-mono text-lg">Test3</div>
                <div className="font-mono text-lg">Test4</div>
              </div>
            </div>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
}
