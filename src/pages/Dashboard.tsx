import Categories from "../components/Categories"
import BarChart from "../components/charts/BarChart"
import TwoLinesChart from "../components/charts/TwoLinesChart"
import { default_categories } from "../components/const/default_categories"
import TransactionsDonutChart from "../components/modules/transactionsDonutChart"
import SectionContainer from "../components/SectionContainer"
import TransactionsTable from "../components/TransactionsTable"

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
                                <dd
                                    className={`${
                                    stat.changeType === 'negative' ? 'text-rose-600' : 'text-green-600'
                                    } text-xs font-medium`}
                                >
                                    {stat.change}
                                </dd>
                                <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
                                    {stat.value}
                                </dd>
                            </div>
                        </SectionContainer>
                    ))}
                </div>
                <div className="w-full flex gap-3 justify-between my-3">
                    <SectionContainer title="Transactions" className="w-full">
                        <div className="h-96 w-full p-6">
                            <TwoLinesChart/>
                        </div>
                    </SectionContainer>
                    <SectionContainer title="Goals" className="min-w-80">
                        <div className="p-6">
                            <TransactionsDonutChart/>
                        </div>
                    </SectionContainer>
                </div>
                <SectionContainer title="Transactions">
                    <div className="p-6">
                        <TransactionsTable/>
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
                            <BarChart/>
                        </div>
                    </SectionContainer>
                </div>
            </div>
        </div>
    )
}

export default Dashboard