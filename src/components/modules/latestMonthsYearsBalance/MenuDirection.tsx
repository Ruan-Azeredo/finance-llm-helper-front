import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const MenuDirection = ({isMonth, setIsMonth} : {isMonth: boolean, setIsMonth: React.Dispatch<React.SetStateAction<boolean>>}) => {
    return (
        <Menu as="div" className="relative w-fit inline-block text-left group">
            <div>
              <MenuButton className="inline-flex justify-center rounded-md bg-white text-sm font-semibold text-gray-400 shadow-xs group-hover:text-gray-600">
                {isMonth ? "Mensal" : "Anual"}
                <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400 group-hover:text-gray-600" />
              </MenuButton>
            </div>

            <MenuItems
              transition
              className="absolute left-0 z-10 mt-2 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <button
                    onClick={() => setIsMonth(true)}
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden  hover:bg-gray-100 hover:text-gray-900 w-full"
                  >
                    Mensal
                  </button>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={() => setIsMonth(false)}
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden  hover:bg-gray-100 hover:text-gray-900 w-full"
                  >
                    Anual
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
    )
}

export default MenuDirection