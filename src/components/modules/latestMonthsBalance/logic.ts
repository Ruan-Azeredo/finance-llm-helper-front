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
        colors: function ({ value } : { value: number }) : string {
            if (value > 0) {
                return categories_colors[3];
            } else {
                return "#D9534F";
            }
        }
    }
}