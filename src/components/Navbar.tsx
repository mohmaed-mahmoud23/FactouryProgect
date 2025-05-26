import { Disclosure } from "@headlessui/react";
import { Link } from "react-router-dom";

const navigation = [
  { name: "Home", to: "/", current: false },
  { name: "Register", to: "/regestr", current: false },
  { name: "Logen", to: "/Logen", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  return (
    <Disclosure as="nav" className="bg-gray-800 mb-3">
      <div className=" mx-auto  max-w-7xl  sm:px-6 ">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center"></div>
            <div className=" mr-6 sm:block">
              <div className="flex pr-45  space-x-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.to}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* الزر واليوزر منيو */}
          <div className="absolute inset-y-0 right-0 flex items-center pr-8 sm:static sm:inset-auto ">
            <h1 className="text-2-1 text-teal-50">Logo</h1>
          </div>
        </div>
      </div>
    </Disclosure>
  );
};

export default Navbar;
