import { categories_colors } from "../../const/colors";

export const treatedlastMonthsData = (monthsBalance: number[], months: string[]) : { 
    series: { name: string; data: number[] }[];
    categories: string[];
    colors: string[];
    formatter: (val: number) => string;
} => {

    return {
        series: [
            {
                name: "Saldo",
                data: monthsBalance
            },
        ],
        categories: months,
        colors: monthsBalance.map((value) => (value > 0 ? categories_colors[2] : "#ff5252")), // Definindo as cores
        formatter: function (val) {
            if(val < 0){
              return "-R$ " + Math.abs(val).toFixed(2).toString().replace('.', ',')
            } else {
              return "R$ " + val.toFixed(2).toString().replace('.', ',')
            }
          }
    }
}