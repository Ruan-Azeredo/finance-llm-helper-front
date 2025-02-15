import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { useContext, useState } from 'react'
import { TransactionsTemplateContext } from '../contexts/TransactionsTemplate'
import { Transaction } from '../schemas/Transaction'

interface SelectCategoryProps {
  transaction?: Transaction
  setCategory?: (category: string) => void
  categories: string[]
}

export default function SelectCategory({transaction, setCategory, categories}: SelectCategoryProps) {

  // Caso esteja no form de criação ou atualização, deve receber só o setCategory, já caso esteja na tabela de transações, deve receber o transaction

  const { update_transaction } = useContext(TransactionsTemplateContext)

  const [selected, setSelected] = useState(categories[0])

  const on_change = (value: string) => {

    if(setCategory){
      setCategory(value)
      setSelected(value)
    }

    if(transaction){
      const new_transaction = transaction
      new_transaction.category = value

      update_transaction(new_transaction)
    }
  }

  return (
    <Listbox value={transaction?.category ? transaction.category : selected} onChange={on_change}>
      <div className="w-60 relative">
        <ListboxButton className="relative cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
          <span className="block truncate max-w-28">{transaction?.category ? transaction.category : selected}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
          </span>
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
        >
          {categories.map((category) => (
            <ListboxOption
              key={category}
              value={category}
              className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
            >
              <span className="block truncate font-normal group-data-[selected]:font-semibold">{category}</span>

              <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                <CheckIcon aria-hidden="true" className="h-5 w-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  )
}
