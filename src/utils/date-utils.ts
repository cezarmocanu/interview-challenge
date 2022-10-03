import IStaff from "@model/staff";
import IHoliday from "@model/holiday";

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

const computeAvailableDays = (staffMember: IStaff, holidayList: IHoliday[], publicHolidays: IHoliday[]) => {
    const usedDays = holidayList
        .map(event => {
            const days = event.end.getDate() - event.start.getDate() + 1;
            let weekendDays = 0;
            let dateIndex: Date = new Date(event.start);
            for (let i = 0; i < days; i++){
                if ([6,0].includes(dateIndex.getDay())){
                    weekendDays++;
                }
                dateIndex.setDate(dateIndex.getDate() + 1);
            }
            return days === 0 ? 1 : days - weekendDays - (publicHolidays ?? []).length;
        })
        .reduce((s, el) => s + el , 0);

    return staffMember?.vacationBudget - usedDays;
}

export default  {
    getFirstDayOfMonth,
    firstDayOfThisMonth,
    getDaysInMonth,
    computeAvailableDays
}