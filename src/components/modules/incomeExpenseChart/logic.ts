import { Transaction } from "../../../schemas/Transaction"
import { negativeColor, positiveColor } from "../../const/colors"

const calculate_amount_sequence = (transactions : Transaction[], direction : "expense" | "income") => {
    let total = 0
    const sum = transactions.map((transaction) => {
        if(transaction.direction === direction){
            total += parseFloat(transaction.amount!.replace(',', '.'))
        }
        return total
    })
    return sum.map((item) => parseFloat(item?.toFixed(2)))
}

export const treatedTransactionsData = (transactions : Transaction[]) : { series: { name: string; data: number[] }[]; categories: string[]; colors: string[]; formatter: (val: number) => string; } => {

    return {
        series: [
            {
                name: "Despesas",
                data: calculate_amount_sequence(transactions, "expense")
            },
            {
                name: "Receitas",
                data: calculate_amount_sequence(transactions, "income")
            },
        ],
        categories: transactions.map(item => item.date!),
        colors: [negativeColor, positiveColor],
        formatter: function (val : number) {
            return 'R$ ' + val.toFixed(2).toString().replace('.', ',')
        }
    }
}
