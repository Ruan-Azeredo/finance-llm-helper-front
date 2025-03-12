import { fake_transactions } from "../components/const/fake_transactions"
import Categories from "../components/Categories"
import LatestMonthsYearsBalance from "../components/modules/latestMonthsYearsBalance"
import IncomeExpenseChart from "../components/modules/incomeExpenseChart"
import { default_categories } from "../components/const/default_categories"
import TransactionsDonutChart from "../components/modules/transactionsDonutChart"
import SectionContainer from "../components/SectionContainer"
import TransactionsTable from "../components/modules/transactionsTable"

const Dashboard = () => {

    const stats = [
        {
            name: 'Saldo',
            changeType: 'negative', // or 'positive'
            change: '-5%',
            value: 'R$ 12.402,72'
        },
        {
            name: 'Receitas',
            changeType: 'positive', // or 'positive'
            change: '+54.02%',
            value: 'R$ 2.787,00'
        },
        {
            name: 'Despesas',
            changeType: 'negative', // or 'positive'
            change: '-2.02%',
            value: 'R$ 1.310,50'
        }
    ]

    return (
        <div className="flex h-full">
            <div className="overflow-auto">
                <div className="w-full grid grid-cols-1 gap-3 justify-between sm:grid-cols-3">
                    {stats.map((stat) => (
                        <SectionContainer title="Dashboard">
                            <div
                                key={stat.name}
                                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 px-4 py-6 sm:px-4 xl:px-6"
                                >
                                <dt className="text-sm font-medium leading-6 text-gray-500">{stat.name}</dt>
                                {stat ? (
                                    <dd
                                        className={`${
                                        stat.changeType === 'negative' ? 'text-rose-600' : 'text-green-600'
                                        } text-xs font-medium`}
                                    >
                                        {stat.change}
                                    </dd> 
                                ) : (
                                    <div className="w-10 h-4 bg-gray-200 animate-pulse rounded"></div>
                                )}
                                {stat ? (
                                    <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                                        {stat.value}
                                    </dd>
                                ) : (
                                    <div className="w-full h-8 mt-2 bg-gray-200 animate-pulse rounded"></div>
                                )}
                            </div>
                        </SectionContainer>
                    ))}
                </div>
                <div className="w-full flex gap-3 justify-between my-3">
                    <SectionContainer title="Transactions" className="w-full">
                        <div className="h-96 w-full p-6">
                            <IncomeExpenseChart transactions={fake_transactions}/>
                        </div>
                    </SectionContainer>
                    <SectionContainer title="Goals" className="min-w-80">
                        <div className="p-6">
                            <TransactionsDonutChart transactions={fake_transactions}/>
                        </div>
                    </SectionContainer>
                </div>
                <SectionContainer title="Transactions">
                    <div className="p-6">
                        <div className="block text-sm font-medium leading-6 text-gray-900 ">Transações</div>
                        <TransactionsTable transactions={fake_transactions} isTemplate={false}/>
                    </div>
                </SectionContainer>
            </div>
            <div className="">
                <div className="flex flex-col gap-3 sticky top-3 flex-grow-0">
                    <SectionContainer title="Categories" className="max-w-[340px] ml-3">
                        <div className="p-6 w-[340px]">
                            <Categories categories={default_categories}/>
                        </div>
                    </SectionContainer>
                    <SectionContainer title="Charts" className="max-w-[340px] ml-3">
                        <div className="p-6 w-[340px]">
                            <LatestMonthsYearsBalance 
                                monthsBalance={[2580,-2400, 1028, 6030]}
                                months={["Apr", "May", "Jun", "Jul",]}
                                yearsBalance={[12250, 23310, 10089, 12030]}
                                years={["2019", "2020", "2021", "2022"]}
                            />
                        </div>
                    </SectionContainer>
                </div>
            </div>
        </div>
    )
}

export default Dashboard