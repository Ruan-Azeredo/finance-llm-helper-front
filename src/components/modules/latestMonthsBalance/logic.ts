import { categories_colors } from "../../const/colors";

export const treatedlastMonthsData = (monthsBalance: number[], months: string[]) : { 
    series: { name: string; data: number[] }[];
    categories: string[];
    colors: string[] | (({ value }: { value: number; }) => string);
} => {

    return {
        series: [
            {
                name: "Saldo",
                data: monthsBalance
            },
        ],
        categories: months,
        colors: monthsBalance.map((value) => (value > 0 ? "#2196f3" : "#ff5252")), // Definindo as cores
    }
}