import { StyledButton } from "../micro/StyledButton"
import TransactionsTable from "../TransactionsTable"
import { Transaction } from "../../schemas/Transaction"
import { useEffect, useState } from "react"

export default function TransactionsSection({ transactions, setTransactions }: { transactions: Transaction[], setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>> }) {

    const [totalAmount, setTotalAmount] = useState('R$ 0,00')

    useEffect(() => {
        let total = 0
        transactions.map((transaction) => {
            if(transaction.direction === 'expense'){
                const formated_str = transaction.amount?.replace(',', '.')
                const item = parseFloat(formated_str)
                console.log(item)
                total -= item 
            } else {
                const formated_str = transaction.amount?.replace(',', '.')
                const item = parseFloat(formated_str)
                console.log(item)
                total += item 
            }
        })
        if(total < 0){
            setTotalAmount(`- R$ ${Math.abs(total).toFixed(2).toString().replace('.', ',')}`)
        } else {
            setTotalAmount(`R$ ${total.toFixed(2).toString().replace('.', ',')}`)
        }
    }, [transactions])

    return (
        <div className="p-6 flex flex-col">
            <div className='flex justify-between'>
            <div className=' text-lg/7 font-semibold text-gray-900'>Transações</div>
            {/* <StyledButton.Root className='ml-auto mr-4' type='secondary' action={() => console.log(transactions)}>Transactions</StyledButton.Root> */}
            <StyledButton.Root className='ml-auto mr-4' type='secondary'>Saldo Total: <span className={totalAmount[0] === '-' ? 'text-red-500' : 'text-green-500'}>{totalAmount}</span>
            </StyledButton.Root>
            <StyledButton.Root type='dark'>Salvar</StyledButton.Root>
            </div>
            <TransactionsTable transactions={transactions} setTransactions={setTransactions}/>
        </div>
    )
}