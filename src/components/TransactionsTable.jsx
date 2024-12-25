import { ArrowUturnLeftIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { default_categories } from "../default_categories"
import SelectCategory from "./SelectCategory"
import { useEffect, useState } from "react"

export default function TransactionsTable({transactions, setTransactions}) {
    console.log('transactions: ', transactions)
    return (
        <div className="z-50">
            <div className="-mx-4 mt-8 sm:-mx-0">
                <table className="min-w-full divide-y divide-gray-300">
                <thead>

                </thead>
                {transactions?.map((transaction) => (
                    <tbody className={`divide-y divide-gray-200 bg-white`}>
                        <tr>
                            <td className={`${transaction.id} w-full max-w-0 py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0`}>
                                <dl className="font-normal lg:hidden">
                                    <dt className="sr-only">Data</dt>
                                    <dd className="mt-1 truncate text-gray-700">{transaction.date}</dd>
                                    <dt className="sr-only">Descrição</dt>
                                    <dd className="mt-1 truncate text-gray-700">{transaction.memo}</dd>
                                    <dt className="sr-only sm:hidden">Email</dt>
                                    <dd className="mt-1 truncate text-gray-500 sm:hidden">{transaction.amount}</dd>
                                    <dt className="sr-only sm:hidden">Delete</dt>
                                    <dd><XCircleIcon/></dd>
                                </dl>
                            </td>
                            <td className={`${transaction.id} hidden px-3 py-4 text-sm text-gray-500 lg:table-cell`}>
                                <input defaultValue={transaction.date} onChange={(e) => {
                                    console.log(e.target.value)
                                    transactions[transactions.indexOf(transaction)].date = e.target.value
                                    setTransactions([...transactions])
                                }} className="border-0 outline-none focus:ring-0 w-32 cursor-pointer" type="text"/>
                            </td>
                            <td className={`${transaction.id} hidden px-3 py-4 text-sm text-gray-500 lg:table-cell`}>
                                <input defaultValue={transaction.memo} onChange={(e) => {
                                    console.log(e.target.value)
                                    transactions[transactions.indexOf(transaction)].memo = e.target.value
                                    setTransactions([...transactions])
                                }} className="border-0 outline-none focus:ring-0 cursor-pointer" type="text"/>
                            </td>
                            <td className={`${transaction.id} hidden px-3 py-4 text-sm text-gray-500 sm:table-cell`}>
                                <input defaultValue={transaction.amount} onChange={(e) => {
                                    console.log(e.target.value)
                                    transactions[transactions.indexOf(transaction)].amount = e.target.value
                                    setTransactions([...transactions])
                                }} className="border-0 outline-none focus:ring-0 w-24 cursor-pointer" type="text"/>
                            </td>
                            <td className={`${transaction.id} w-48 py-auto text-right text-sm font-medium sm:pr-0 overflow-visible`}>
                                <SelectCategory transactions={transactions} setTransactions={setTransactions} listIndex={transactions.indexOf(transaction)} categories={default_categories}/>
                            </td>
                            <td>
                                <button id={transaction.id + 'x-btn'} type="button" onClick={() => {
                                        const items = document.getElementsByClassName(`${transaction.id}`)
                                        Array.from(items).forEach(element => {
                                            element.classList.add('blur-sm');
                                        });
                                        document.getElementById(transaction.id + 'rm-btn').classList.remove('hidden')
                                        document.getElementById(transaction.id + 'x-btn').classList.add('hidden')
                                        document.getElementById(transaction.id + 'back-btn').classList.remove('hidden')
                                    }}>
                                    <XMarkIcon className="text-gray-500 ml-4 h-4 w-4"/>
                                </button>
                                <button id={transaction.id + 'back-btn'} className="hidden" type="button" onClick={() => {
                                        const items = document.getElementsByClassName(`${transaction.id}`)
                                        Array.from(items).forEach(element => {
                                            element.classList.remove('blur-sm');
                                        });
                                        document.getElementById(transaction.id + 'rm-btn').classList.add('hidden')
                                        document.getElementById(transaction.id + 'x-btn').classList.remove('hidden')
                                        document.getElementById(transaction.id + 'back-btn').classList.add('hidden')
                                    }}>
                                    <ArrowUturnLeftIcon className="text-gray-500 ml-4 h-4 w-4"/>
                                </button>
                            </td>
                        </tr>
                        <div className=" w-fit">
                            <button onClick={() => {
                                setTransactions(transactions.filter((transact) => transact.id !== transaction.id))
                                document.getElementById(transaction.id + 'rm-btn').classList.add('hidden')
                                document.getElementById(transaction.id + 'x-btn').classList.remove('hidden')
                                document.getElementById(transaction.id + 'back-btn').classList.add('hidden')

                            }} id={transaction.id + 'rm-btn'} type="button" class="-mt-[54px] absolute hidden justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Remover</button>
                        </div>
                    </tbody>

                ))}
                </table>
            </div>
        </div>

    )
}