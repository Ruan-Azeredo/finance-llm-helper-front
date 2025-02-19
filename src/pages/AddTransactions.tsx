import { useState } from "react"
import { default_categories } from "../components/const/default_categories"
import {categories_colors as colors} from "../components/const/colors"
import Chart from "../components/Chart"
import AwaitModal from "../components/AwaitModal"
import InputCategory from "../components/InputCategory"
import BadgeCategory from "../components/BadgeCategory"
import AddTransactionSection from "../components/sections/AddTransactionSection"
import { Transaction } from "../schemas/Transaction"
import SectionContainer from "../components/SectionContainer"
import TransactionsSection from "../components/sections/TransactionsSection"
import { fake_transactions } from "../components/const/fake_transactions"

interface Category {
  name: string
  color: number
}

const AddTransactions = () => {

  const [transactions, setTransactions] = useState<Transaction[]>(fake_transactions)
  const [analyzeReqSended, setAnalyzeReqSended] = useState<boolean>(false)
  


    const Categories = ({ categories }: { categories: Category[]}) => {
      return (
        <>
          <InputCategory/>
          <div className='mt-4 flex flex-wrap gap-2'>
            {categories.map((category) => (
              <BadgeCategory key={category.name} category={category} colorsList={colors}/>
            ))}
          </div>
        </>
      )
    }   
  

    return (
        <>
          <h1 className="sr-only">Add Transaction</h1>
          {/* Main 3 column grid */}
          <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-3 lg:gap-8">
            {/* Left column */}
            <div className="grid grid-cols-1 gap-4 lg:col-span-2">
              <SectionContainer title="Add Transaction buttons">
                <AddTransactionSection transactions={transactions} setTransactions={setTransactions} setAnalyzeReqSended={setAnalyzeReqSended}/>
              </SectionContainer>

              {transactions.length > 0 ? (
                <SectionContainer title="Transações">
                  <TransactionsSection/>
                </SectionContainer>
              ) : (
                <>
                  {analyzeReqSended &&
                    <AwaitModal/>
                  }
                </>
              )}
            </div>

            {/* Right column */}
            <div className="grid grid-cols-1 gap-4">
              <SectionContainer title="Categories">
                <div className="p-6">
                  <Categories categories={default_categories}/>
                </div>
              </SectionContainer>
              <SectionContainer title="Chart">
                  <div className="p-6">
                    <Chart/>
                  </div>
              </SectionContainer>
            </div>
          </div>
        </>
    )
}

export default AddTransactions