import { Transaction } from "../../schemas/Transaction"

export const calculate_total = (transactionsTemplate: Transaction[]) : string => {
    let total = 0
    transactionsTemplate.map((transaction: Transaction) => {
        if(transaction.direction === 'expense'){
            const formated_str = transaction.amount?.replace(',', '.')
            if(formated_str){
                const item = parseFloat(formated_str)
                total -= item
            }
        } else {
            const formated_str = transaction.amount?.replace(',', '.')
            if(formated_str){
                const item = parseFloat(formated_str)
                total += item
            }
        }
    })

    if(total < 0){
        return `- R$ ${Math.abs(total).toFixed(2).toString().replace('.', ',')}`
    } else {
        return `R$ ${total.toFixed(2).toString().replace('.', ',')}`
    }
}

export const calculate_chronological_order = (transactionsTemplate: Transaction[]) => {

    function dataParaTimestamp(dataStr: string) {
        // Divide a string da data
        const [dia, mes, ano] = dataStr.split('/').map(Number);
        // Cria um objeto Date (mês começa do zero em JavaScript)
        const dataObj = new Date(ano, mes - 1, dia);
        // Retorna o timestamp
        return Math.floor(dataObj.getTime() / 1000);
    }

    const sorted = transactionsTemplate.sort((a: Transaction, b: Transaction) => {
        if (a.date && b.date) {
            const dateA = dataParaTimestamp(a.date);
            const dateB = dataParaTimestamp(b.date);
            return dateA - dateB;
        }
        return 0;
    });
    
    return sorted
}