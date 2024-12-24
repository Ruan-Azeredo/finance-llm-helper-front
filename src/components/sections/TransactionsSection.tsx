import { StyledButton } from "../micro/StyledButton"
import TransactionsTable from "../TransactionsTable"
import { Transaction } from "../../schemas/Transaction"

export default function TransactionsSection({ transactions, setTransactions }: { transactions: Transaction[], setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>> }) {
    return (
        <div className="p-6 flex flex-col">
            <div className='flex justify-between'>
            <div className=' text-lg/7 font-semibold text-gray-900'>Transações</div>
            <StyledButton.Root className='ml-auto mr-4' type='secondary'>Saldo Total: R$ 25,54</StyledButton.Root>
            <StyledButton.Root type='dark'>Salvar</StyledButton.Root>
            </div>
            <TransactionsTable transactions={transactions} setTransactions={setTransactions}/>
        </div>
    )
}