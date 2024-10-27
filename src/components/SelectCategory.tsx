import { useState } from 'react'
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, EllipsisVerticalIcon } from '@heroicons/react/20/solid'

interface SelectCategoryProps {
  defaultCategory: string,
  categories: string[]
}

export default function SelectCategory({defaultCategory, categories}: SelectCategoryProps) {
  const [selected, setSelected] = useState(defaultCategory)

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative">
        <ListboxButton className="w-full inline-flex items-center gap-x-0.5 mr-0.5 rounded-md bg-gray-50 px-2 py-2 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
          <span className="flex items-center">
{/*             <img alt="" src={selected.avatar} className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
            <span className="mx-3 block truncate">{selected}</span>
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
            <EllipsisVerticalIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {categories?.map((category) => (
            <ListboxOption
              key={category}
              value={category}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
            >
              <div className="flex items-center">
{/*                 <img alt="" src={person.avatar} className="h-5 w-5 flex-shrink-0 rounded-full" /> */}
                <span className="block truncate font-normal group-data-[selected]:font-semibold">
                  {category}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="h-5 w-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
