import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'
import { useContext, useEffect, useState } from 'react'
import { TransactionsTemplateContext } from '../contexts/TransactionsTemplate'
import { Transaction } from '../schemas/Transaction'
import { ExclamationCircleIcon } from "@heroicons/react/24/solid"
import { Category } from '../schemas/Category'

interface SelectCategoryProps {
  transaction?: Transaction
  setCategory?: (category: string) => void
  categories: Category[]
  colors?: string[]
  validationError?: boolean
  invalidMessage?: string
}

export default function SelectCategory({transaction, setCategory, categories, colors, validationError, invalidMessage}: SelectCategoryProps) {

  // Caso esteja no form de criação ou atualização, deve receber o setCategory, já caso esteja na tabela de transações, deve receber o só transaction

  const { update_transaction } = useContext(TransactionsTemplateContext)

  const [selected, setSelected] = useState(transaction?.category ? transaction.category : null)

  useEffect(() => {
    setSelected(transaction?.category ? transaction.category : null)
  }, [categories, transaction])

  const on_change = (value: string) => {

    if(setCategory){
      setCategory(value)
      setSelected(value)
    } else if(transaction){
      const new_transaction = transaction
      new_transaction.category = value

      update_transaction(new_transaction)
      setSelected(value)
    }

  }

  return (
    <div>
      <Listbox value={selected} onChange={on_change}>
        <div className="w-44 relative">
          <ListboxButton className={`relative cursor-default rounded-md py-1.5 pl-3 pr-5 text-left text-gray-900 shadow-sm ring-1 ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6`}>
            <span className={`block truncate w-32 h-6 `}>{selected}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
              {validationError ? (
                <div className="pointer-events-none inset-y-0 right-0 flex items-center pr-3 absolute">
                  <ExclamationCircleIcon aria-hidden="true" className="h-5 w-5 text-red-500" />
                </div>
              ) : null}
      
              <div style={{backgroundColor: selected ? colors?.[categories && selected ? categories.find(item => item.name === selected)?.color ?? 0 : 0] : undefined}} className='h-full w-3 rounded-r-md'></div>
            </span>
          </ListboxButton>
          <ListboxOptions
            transition
            className="absolute z-[750] mt-1 max-h-40 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
            >
            {categories.map((category) => (
              <ListboxOption
              key={category.name}
              value={category.name}
              className="group relative cursor-default select-none py-2 pl-8 pr-4 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
              >
                <span className="block truncate font-normal group-data-[selected]:font-semibold">{category.name}</span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-1.5 text-indigo-600 group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                  <CheckIcon aria-hidden="true" className="h-5 w-5" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
      {validationError ? (
          <p id="email-error" className="mt-2 text-sm text-red-600">
            {invalidMessage}
          </p>
        ) : null}
    </div>
  )
}
