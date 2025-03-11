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
            <BarChart
                series={isMonth ? treatedMonthsData.series : treatedYearsData.series}
                colors={isMonth ? treatedMonthsData.colors : treatedYearsData.colors}
                categories={isMonth ? treatedMonthsData.categories : treatedYearsData.categories}
                formatter={isMonth ? treatedMonthsData.formatter : treatedYearsData.formatter}
                position={isMonth ? treatedMonthsData.position : treatedYearsData.position}
            />
            
        </Card>
    )
}