export function isValidDateFormat(dateString: string): boolean {

    if (!dateString) return false

    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/

    const match = dateString.match(regex)
    if (!match) return false

    const day = parseInt(match[1], 10)
    const month = parseInt(match[2], 10)
    const year = parseInt(match[3], 10)

    const date = new Date(year, month - 1, day)

    return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
    );
}

export function isValidAmountFormat(amountString: string): boolean {

    if (!amountString) return false

    const regex = /^\d+,\d{2}$/;

    return regex.test(amountString);
}

export function isValidCategoryFormat(category: string | null): boolean {
    if (category === null) return false
    return true
}