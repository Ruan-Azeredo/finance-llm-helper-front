import { ArrowUturnLeftIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { default_categories } from "../default_categories"
import SelectCategory from "./SelectCategory"
import { useEffect, useState } from "react"
import { Modal }from "./micro/Modal"
import { StyledButton } from "./micro/StyledButton"
import TransactionForm from "./form/TransactionForm"

function TransactionItem({transaction, transactions, setTransactions}){

    const [open, setOpen] = useState(false)
    const [handleAction, setHandleAction] = useState(false)

    const handleAmountSignal = (direction) => {
        if (direction === 'expense') {
            return '-'
        }
        
        return '+'
        
    }

    const handleAmountValue = (amount) => { // apagar isso
        if (amount.charAt(0) === '-') {
            return amount.slice(1)
        } else {
            return amount
        }
    }

    //remmove double whitespace
    const removeWhitespace = (str) => {
        return str.replace(/\s\s+/g, ' ');
    }

    console.log(removeWhitespace(transaction.memo), removeWhitespace(transaction.memo).length)
    return (
        <tbody className={`divide-y divide-gray-200 bg-white`}>
            <tr>
                <td className={`${transaction.id} w-full max-w-0 py-4 pl-4 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0`}>
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
                <td className={`${transaction.id} hidden py-4 text-sm text-gray-500 lg:table-cell`}>
                    <input value={transaction.date} onChange={(e) => {
                        console.log(e.target.value)
                        transactions[transactions.indexOf(transaction)].date = e.target.value
                        setTransactions([...transactions])
                    }} className="border-0 outline-none focus:ring-0 text-sm w-24 p-0" type="text"/>
                </td>
                <td className={`${transaction.id} hidden py-auto h-fit w-full text-gray-500 lg:table-cell`}>
                    {/* <textarea value={transaction.memo} onChange={(e) => {
                        console.log(e.target.value)
                        transactions[transactions.indexOf(transaction)].memo = e.target.value
                        setTransactions([...transactions])
                    }} className="border-0 outline-none focus:ring-0 text-xs my-auto p-0 w-full resize-none flex items-center justify-center h-fit" type="text"  
                    /> */}
                    <Modal.Root open={open} setOpen={setOpen}>
                        <Modal.Title title='Altere sua Transação'/>
                        <Modal.Body className="mt-6">
                            <TransactionForm type="update" transaction={transaction} transactions={transactions} setTransactions={setTransactions}/>
                        </Modal.Body>
                    </Modal.Root>
                    <p onClick={() => setOpen(true)} className="text-xs cursor-pointer">{removeWhitespace(transaction.memo).length > 45 ? removeWhitespace(transaction.memo).slice(0, 45) + '...' : removeWhitespace(transaction.memo)}</p>
                </td>
                <td className={`${transaction.id} hidden ml-auto pl-4 w-fit py-4 text-sm text-gray-500 sm:block`}>

                    <div className="flex text-base w-fit">

                        <div onClick={() => {
                            if(transaction.direction === 'expense'){
                                transactions[transactions.indexOf(transaction)].direction = 'income'
                            } else {
                                transactions[transactions.indexOf(transaction)].direction = 'expense'
                            }

                            setTransactions([...transactions])
                        }} className="my-auto mr-1 cursor-pointer">{handleAmountSignal(transaction.direction)}</div>

                        <span className="my-auto h-fit">R$</span>

                        <input value={handleAmountValue(transaction.amount)} onChange={(e) => {
                            console.log(e.target.value)
                            transactions[transactions.indexOf(transaction)].amount = e.target.value
                            setTransactions([...transactions])
                            //make the input width dynamic acording value
                        }} className={`border-0 outline-none focus:ring-0 pl-1 w-24`} type="text"/>

                    </div>
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
                    setReRender(!reRender)

                }} id={transaction.id + 'rm-btn'} type="button" class="-mt-[54px] absolute hidden justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Remover</button>
            </div>
        </tbody>
    )
}

export default function TransactionsTable({transactions, setTransactions}) {

    const [amountSignal, setAmountSignal] = useState('')

    console.log('transactions: ', transactions)
    return (
        <div className="z-50">
            <div className="-mx-4 mt-8 sm:-mx-0">
                <table className="min-w-full divide-y divide-gray-300">
                <thead>

                </thead>
                {transactions?.map((transaction) => (
                    <TransactionItem transaction={transaction} transactions={transactions} setTransactions={setTransactions}/>

                ))}
                </table>
            </div>
        </div>

    )
}