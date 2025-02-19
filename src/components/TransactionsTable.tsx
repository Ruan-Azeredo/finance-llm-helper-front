import { ArrowUturnLeftIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { default_categories } from "./const/default_categories"
import { categories_colors as colors } from "./const/colors"
import SelectCategory from "./SelectCategory"
import { useContext, useState } from "react"
import { Modal }from "./micro/Modal"
import TransactionForm from "./form/TransactionForm"
import { TransactionsTemplateContext } from "../contexts/TransactionsTemplate"
import { Transaction } from "../schemas/Transaction"

function TransactionItem(
    {transaction, transactions, setTransactions}: {transaction: Transaction, transactions: Transaction[], setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>}
){

    const { delete_transaction } = useContext(TransactionsTemplateContext)

    const [open, setOpen] = useState(false)

    //remmove double whitespace
    const removeWhitespace = (str: string) => {
        return str.replace(/\s\s+/g, ' ');
    }

    const transaction_memo = removeWhitespace(transaction.memo ?? '').length > 45 ? removeWhitespace(transaction.memo ?? '').slice(0, 45) + '...' : removeWhitespace(transaction.memo ?? '')
    const transaction_amount = transaction.direction === 'expense' ? '- R$' + transaction.amount : '+ R$' + transaction.amount

    const pre_delete_from_template = () => {
        const items = document.getElementsByClassName(`${transaction.id}`)
        Array.from(items).forEach(element => {
            element.classList.add('blur-sm');
        });
        const rmBtn = document.getElementById(transaction.id + 'rm-btn');
        if (rmBtn) {
            rmBtn.classList.remove('hidden');
        }
        const xBtn = document.getElementById(transaction.id + 'x-btn');
        if (xBtn) {
            xBtn.classList.add('hidden');
        }
        const backBtn = document.getElementById(transaction.id + 'back-btn');
        if (backBtn) {
            backBtn.classList.remove('hidden');
        }
    }

    const not_delete_from_template = () => {
        const items = document.getElementsByClassName(`${transaction.id}`)
        Array.from(items).forEach(element => {
            element.classList.remove('blur-sm');
        });
        const rmBtn = document.getElementById(transaction.id + 'rm-btn');
        if (rmBtn) {
            rmBtn.classList.add('hidden');
        }
        const xBtn = document.getElementById(transaction.id + 'x-btn');
        if (xBtn) {
            xBtn.classList.remove('hidden');
        }
        const backBtn = document.getElementById(transaction.id + 'back-btn');
        if (backBtn) {
            backBtn.classList.add('hidden');
        }
    }

    const delete_from_template = () => {
        delete_transaction(transaction)

        const rmBtn = document.getElementById(transaction.id + 'rm-btn');
        if (rmBtn) {
            rmBtn.classList.add('hidden');
        }
        const xBtn = document.getElementById(transaction.id + 'x-btn');
        if (xBtn) {
            xBtn.classList.remove('hidden');
        }
        const backBtn = document.getElementById(transaction.id + 'back-btn');
        if (backBtn) {
            backBtn.classList.add('hidden');
        }

    }

    return (
        <tbody className={`divide-y divide-gray-200 bg-white`}>
            <Modal.Root open={open} setOpen={setOpen}>
                <Modal.Title title='Altere sua Transação'/>
                <Modal.Body className="mt-6">
                    <TransactionForm type="update" transaction={transaction} transactions={transactions} setTransactions={setTransactions} setOpen={setOpen}/>
                </Modal.Body>
            </Modal.Root>
            <tr>
                <td className={`${transaction.id} w-full max-w-0 py-4 pl-4 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0`}>
                    <dl className="font-normal lg:hidden">
                        <dt className="sr-only">Data</dt>
                        <dd className="mt-1 truncate text-gray-700">{transaction.date}</dd>
                        <dt className="sr-only">Descrição</dt>
                        <dd className="mt-1 truncate text-gray-700">{transaction_memo}</dd>
                        <dt className="sr-only sm:hidden">Email</dt>
                        <dd className="mt-1 truncate text-gray-500 sm:hidden">{transaction_amount}</dd>
                    </dl>
                </td>
                <td className={`${transaction.id} hidden py-4 text-sm text-gray-500 lg:table-cell`}>
                    <p onClick={() => setOpen(true)} className="w-24 cursor-pointer">{transaction.date}</p>
                </td>
                <td className={`${transaction.id} hidden py-auto h-fit w-full text-gray-500 lg:table-cell`}>
                    {/* <textarea value={transaction.memo} onChange={(e) => {
                        console.log(e.target.value)
                        transactions[transactions.indexOf(transaction)].memo = e.target.value
                        setTransactions([...transactions])
                    }} className="border-0 outline-none focus:ring-0 text-xs my-auto p-0 w-full resize-none flex items-center justify-center h-fit" type="text"  
                    /> */}
                    <p onClick={() => setOpen(true)} className="text-xs cursor-pointer">{transaction_memo}</p>
                </td>
                <td className={`${transaction.id} hidden pl-4 py-4 xl:pr-8 lg:pr-6 text-base text-gray-500 sm:flex`}>

                    {/* <div className="flex text-base w-fit">

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

                    </div> */}

                    <p onClick={() => setOpen(true)} className="text-nowrap text-right w-full cursor-pointer">{transaction_amount}</p>
                </td>
                <td className={`${transaction.id} w-48 py-auto text-right text-sm font-medium sm:pr-0 overflow-visible`}>
                    <SelectCategory transaction={transaction} categories={default_categories} colors={colors}/>
                </td>
                <td>
                    <button id={transaction.id + 'x-btn'} type="button" onClick={pre_delete_from_template}>
                        <XMarkIcon className="text-gray-500 ml-4 h-4 w-4"/>
                    </button>
                    <button id={transaction.id + 'back-btn'} className="hidden" type="button" onClick={not_delete_from_template}>
                        <ArrowUturnLeftIcon className="text-gray-500 ml-4 h-4 w-4"/>
                    </button>
                </td>
            </tr>
            <div className=" w-fit">
                <button onClick={delete_from_template} id={transaction.id + 'rm-btn'} type="button" className="-mt-[46px] absolute hidden justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto">Remover</button>
            </div>
        </tbody>
    )
}

export default function TransactionsTable() {

    const { transactionsTemplate, setTransactionsTemplate } = useContext(TransactionsTemplateContext)

    return (
        <div className="z-50">
            <div className="-mx-4 mt-8 sm:-mx-0">
                <table className="min-w-full divide-y divide-gray-300">
                <thead>

                </thead>
                {transactionsTemplate?.map((transaction) => (
                    <TransactionItem transaction={transaction} transactions={transactionsTemplate} setTransactions={setTransactionsTemplate}/>

                ))}
                </table>
            </div>
        </div>

    )
}