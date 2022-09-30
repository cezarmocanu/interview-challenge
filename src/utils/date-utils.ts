const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1);
}

const firstDayOfThisMonth = () => {
    const d = new Date();
    return getFirstDayOfMonth(d.getFullYear(), d.getMonth());
}


const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
}

export default  {
    getFirstDayOfMonth,
    firstDayOfThisMonth,
    getDaysInMonth
}