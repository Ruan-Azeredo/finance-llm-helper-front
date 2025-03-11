export interface Transaction {
    id: string | number | null
    memo: string | null
    amount: string | null
    date: string | null
    category: string | null
    direction: "income"| "expense" | null
}