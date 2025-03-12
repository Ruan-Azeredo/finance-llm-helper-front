import { Card } from "@material-tailwind/react";
import { treatedlastPeriodData } from "./logic";
import BarChart from "../../charts/BarChart";
import { useState } from "react";
import MenuDirection from "./MenuDirection";

export default function LatestMonthsYearsBalance({monthsBalance, months, yearsBalance, years} : {monthsBalance: number[], months: string[], yearsBalance: number[], years: string[]}) {

    const [isMonth, setIsMonth] = useState<boolean>(true)

    const treatedMonthsData = treatedlastPeriodData(monthsBalance, months)
    const treatedYearsData = treatedlastPeriodData(yearsBalance, years)

    return (
        <Card className="flex justify-center" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>

            <div className="flex flex-col mb-2">
                <div className="block text-sm font-medium leading-6 text-gray-900 ">Evolução do Saldo (R$)</div>
                <MenuDirection isMonth={isMonth} setIsMonth={setIsMonth}/>
            
            </div>

            {treatedMonthsData ? (
                <BarChart
                    series={isMonth ? treatedMonthsData.series : treatedYearsData.series}
                    colors={isMonth ? treatedMonthsData.colors : treatedYearsData.colors}
                    categories={isMonth ? treatedMonthsData.categories : treatedYearsData.categories}
                    formatter={isMonth ? treatedMonthsData.formatter : treatedYearsData.formatter}
                    position={isMonth ? treatedMonthsData.position : treatedYearsData.position}
                />
            ) : (
                <div className="animate-pulse px-6">
                    <div className="w-full h-40 flex justify-between items-end">
                        <div className="w-10 bg-gray-200 rounded h-3/4"></div>
                        <div className="w-10 bg-gray-200 rounded h-2/3"></div>
                        <div className="w-10 bg-gray-200 rounded h-5/6"></div>
                        <div className="w-10 bg-gray-200 rounded h-1/2"></div>
                    </div>
                    <div className="flex justify-between mt-3">
                        <div className="w-10 h-4 bg-gray-200 rounded-md"></div>
                        <div className="w-10 h-4 bg-gray-200 rounded-md"></div>
                        <div className="w-10 h-4 bg-gray-200 rounded-md"></div>
                        <div className="w-10 h-4 bg-gray-200 rounded-md"></div>
                    </div>
                </div>
            )}
            
        </Card>
    )
}