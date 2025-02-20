import { Transaction } from "../../../schemas/Transaction";
import { categories_colors as colors } from "../../const/colors";
import { default_categories } from "../../const/default_categories";

const respectiveColorToCategory = (defaultCategories: {name: string, color: number}[], colors: string[]) => {

    // {category: 'Alimentação', color: '#ff0000'}
    return defaultCategories.map((category) => ({ category: category.name, color: colors[category.color] }));
}

function somarPorCategoria(transacoes: Transaction[]): { category: string; total: number; colors: string }[] {
    const resultado: Record<string, number> = {};

    transacoes.forEach(item => {
        let valor = parseFloat(item.amount!.replace(",", "."));
        if (!resultado[item.category!]) {
        resultado[item.category!] = 0;
        }
        if (item.direction === "expense") {
        valor = -valor;
        }
        resultado[item.category!] += valor;
    });

    // { category: 'Alimentação', total: 105.50, colors: '#ff0000' }
    const categoryColors = respectiveColorToCategory(default_categories, colors);
    return Object.keys(resultado).map(category => {
        const categoryColor = categoryColors.find((cat: { category: string; }) => cat.category === category)?.color || '#000000';
        return { category, total: parseFloat(resultado[category].toFixed(2)), colors: categoryColor };
    });
}


const defineAccordingDirection = (transactionsTemplate: Transaction[]) => {

    const changedArray = somarPorCategoria(transactionsTemplate).map((item) => ({
        ...item,
        total: item.total < 0 ? item.total * -1 : item.total
    }))

    /* return [{ category: 'Alimentação', total: 105.50, colors: '#ff0000' }] */
    return changedArray
}

const incomeTransactionsTemplate = (transactionsTemplate: Transaction[]) => {
    return transactionsTemplate.filter((transaction) => transaction.direction === "income")
}

const expenseTransactionsTemplate = (transactionsTemplate: Transaction[]) => {
    return transactionsTemplate.filter((transaction) => transaction.direction === "expense")
}

export const treatedTransactionsTemplate = (transactionsTemplate: Transaction[]) => {
    const expense = defineAccordingDirection(expenseTransactionsTemplate(transactionsTemplate))
    const income = defineAccordingDirection(incomeTransactionsTemplate(transactionsTemplate))
    return {
        expenseSeries: expense.map((item) => item.total),
        incomeSeries: income.map((item) => item.total),
        expenseColors: expense.map((item) => item.colors),
        incomeColors: income.map((item) => item.colors),
        expenseLabels: expense.map((item) => item.category),
        incomeLabels: income.map((item) => item.category)
    }
}