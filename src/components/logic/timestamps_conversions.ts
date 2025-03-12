
// Convert timestamp in seconds ( divided by 1000 ) to dd/mm/yyyy format
export const timestampToDate = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
};

// Convert dd/mm/yyyy string to timestamp in seconds ( divided by 1000 )
export const dateToTimestamp = (dateStr: string): number => {
    const [day, month, year] = dateStr.split('/').map(Number);
    const date = new Date(year, month - 1, day);
    
    return Math.floor(date.getTime() / 1000);
};
