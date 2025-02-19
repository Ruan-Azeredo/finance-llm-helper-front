import React, { useContext } from "react"
import { Transaction } from "../../schemas/Transaction"
import Form from "./Form"
import { TransactionsTemplateContext } from "../../contexts/TransactionsTemplate"

const TransactionForm = ({
    type = "add",
    transaction,
    setOpen
} : {
    type?: "add" | "update",
    transaction?: Transaction
    transactions: Transaction[],
    setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>,
    setOpen?: React.Dispatch<React.SetStateAction<boolean>>
}) => {

    const {add_transaction, update_transaction} = useContext(TransactionsTemplateContext)


    const addTransaction = (new_transaction: Transaction): void => {
        
        add_transaction(new_transaction)
        if(setOpen){
            setOpen(false)
        }
    }

    const updateTransaction = (new_transaction: Transaction, incomeOrExpense: "income" | "expense", setIncomeOrExpense: React.Dispatch<React.SetStateAction<"income" | "expense" | null>>): void => {

        if(incomeOrExpense === transaction?.direction){
            setIncomeOrExpense(null)
        }
        
        update_transaction(new_transaction)
        if(setOpen){
            setOpen(false)
        }
    }

    const validateAddForm = (
        isValidDateFormat: (data: string) => boolean, isValidAmountFormat: (data: string) => boolean, isValidCategoryFormat: (data: string) => boolean,
        setInvalidDate: React.Dispatch<React.SetStateAction<boolean>>, setInvalidAmount: React.Dispatch<React.SetStateAction<boolean>>, setInvalidCategory: React.Dispatch<React.SetStateAction<boolean>>,
        transactionDate: null | string, transactionAmount: null | string, transactionCategory: null | string
    ): boolean => {

        let allValid = true
        console.log(transactionDate, transactionAmount)
        
        if(!isValidDateFormat(transactionDate!)){
            setInvalidDate(true)
            allValid = false
        } else{
            setInvalidDate(false)
        }
        
        if(!isValidAmountFormat(transactionAmount!)){
            setInvalidAmount(true)
            allValid = false
        } else{
            setInvalidAmount(false)
        }

        if(!isValidCategoryFormat(transactionCategory!)){
            setInvalidCategory(true)
            allValid = false
        } else{
            setInvalidCategory(false)
        }

        if(isValidDateFormat(transactionDate!) && isValidAmountFormat(transactionAmount!) && isValidCategoryFormat(transactionCategory!) && allValid){
            return true
        }

        return false
    }

    const validateUpdateForm = (
        isValidDateFormat: (data: string) => boolean, isValidAmountFormat: (data: string) => boolean, isValidCategoryFormat: (data: string) => boolean,
        setInvalidDate: React.Dispatch<React.SetStateAction<boolean>>, setInvalidAmount: React.Dispatch<React.SetStateAction<boolean>>, setInvalidCategory: React.Dispatch<React.SetStateAction<boolean>>,
        transactionDate: null | string, transactionAmount: null | string, transactionCategory: null | string
    ): boolean => {
        
        let allValid = true
        
        if(transactionDate !== null){
            if(!isValidDateFormat(transactionDate!)){
                setInvalidDate(true)
                allValid = false
            } else{
                setInvalidDate(false)
            }
        } else{
            setInvalidDate(false)
        }
        
        if(transactionAmount !== null){
            if(!isValidAmountFormat(transactionAmount!)){
                setInvalidAmount(true)
                allValid = false
            } else{
                setInvalidAmount(false)
            }
        } else{
            setInvalidAmount(false)
        }

        if(transactionCategory !== null){
            if(!isValidCategoryFormat(transactionAmount!)){
                setInvalidCategory(true)
                allValid = false
            } else{
                setInvalidCategory(false)
            }
        } else{
            setInvalidCategory(false)
        }
        
        if(
            allValid
        ){
            return true
        }

        return false
    }

    return (
        <div>
            <Form type={type} setOpen={setOpen} transaction={transaction} validateAddForm={validateAddForm} validateUpdateForm={validateUpdateForm} addTransaction={addTransaction} updateTransaction={updateTransaction}/>
        </div>
    )
}

export default TransactionForm