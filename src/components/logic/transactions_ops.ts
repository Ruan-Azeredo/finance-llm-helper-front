import { Transaction } from "../../schemas/Transaction"

export const add_transaction = (setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>, transactions: Transaction[], transaction: Transaction) => {
    setTransactions([...transactions, transaction])
}

export const update_transaction = (setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>, transactions: Transaction[], transaction: Transaction) => {
    setTransactions(transactions.map((item) => item.id === transaction.id ? transaction : item))
}