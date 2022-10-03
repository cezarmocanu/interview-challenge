import DateUtils from "@utils/date-utils";
import IStaff from "@model/staff";
import IHoliday from "@model/holiday";

it('Should compute 7 remaining days of vacation', () => {
    const staff = {vacationBudget: 10};
    const holidayList: IHoliday[] = [
        {
            start: new Date("10-3-2022"),
            end: new Date("10-5-2022"),
        }
    ];
    const actual = DateUtils.computeAvailableDays(staff as IStaff, holidayList as IHoliday[]);

    expect(actual).toEqual(7);
});


it('Should compute 7 remaining days of vacation, because of two that are duering the weekend', () => {
    const staff = {vacationBudget: 10};
    const holidayList: IHoliday[] = [
        {
            start: new Date("10-1-2022"),
            end: new Date("10-5-2022"),
        }
    ];
    const actual = DateUtils.computeAvailableDays(staff as IStaff, holidayList as IHoliday[]);

    expect(actual).toEqual(7);
});