import { useContext } from "react"
import { TransactionsTemplateContext } from "../../../contexts/TransactionsTemplate"
import { Transaction } from "../../../schemas/Transaction"
import TransactionItem from "./TransactionItem"
import { RequisitionsManagerContext } from "../../../contexts/RequisitionsManager"

export default function TransactionsTable({transactions, isTemplate}: {transactions: Transaction[], isTemplate: boolean}) {

    const context = isTemplate ? TransactionsTemplateContext : RequisitionsManagerContext
    const { delete_transaction, add_transaction, update_transaction } = useContext(context as typeof TransactionsTemplateContext)

    const actions = {
        delete_transaction: delete_transaction,
        add_transaction: add_transaction,
        update_transaction: update_transaction
    }

    return (
        <div className="z-50">
            <div className="-mx-4 mt-8 sm:-mx-0">
                <table className="min-w-full divide-y divide-gray-300">
                <thead>

                </thead>
                {transactions?.map((transaction) => (
                    <TransactionItem transaction={transaction} actions={actions}/>
                ))}
                </table>
            </div>
        </div>
    )
}