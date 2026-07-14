type Budget = {
    id: number,
    title: string,
    total: number,
    year: number,
    expenses: Expense[]
}

type Expense = {
    name: string,
    value: number,
    date: string
}

export type {
    Budget,
    Expense
}