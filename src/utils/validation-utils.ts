import IStaff from "@model/staff";
import IHoliday from "@model/holiday";
import HolidayService from "@services/holiday-service";

const validateHoliday = async (selectedMember: IStaff, allMembers: IStaff[], newHoliday: IHoliday) => {
    if (newHoliday.end < newHoliday.start) {
        return {
            error: "The end date should be after the start date",
        };
    }

    if (newHoliday.start == null && newHoliday.end == null) {
        return {
            error: "The start date and end date should not be empty",
        };
    }

    const membersWithSameDiscipline = allMembers.filter(staff => staff.discipline === selectedMember.discipline && staff.id !== selectedMember.id);
    if (!membersWithSameDiscipline.length){
        return {
            error: "There is no member with the same discipline as you",
        };
    }

    const selectedMemberHolidayList: IHoliday[] = await HolidayService.getAllByUserId(selectedMember.id);
    const duplicatedHoliday = selectedMemberHolidayList.some(holiday => newHoliday.start <= holiday.end && holiday.start <= newHoliday.end);
    if(duplicatedHoliday){
        return {
            error: "Your cannot have multiple holidays in the same time frame",
        };
    }

    const holidayList: IHoliday[] = (await Promise.all(membersWithSameDiscipline.map(staff => HolidayService.getAllByUserId(staff.id)))).flat();
    const overlapsWithHoliday = holidayList.some(holiday => newHoliday.start <= holiday.end && holiday.start <= newHoliday.end);

    if (overlapsWithHoliday) {
        return {
            error: "Your holiday overlaps with the holiday of someone else. The department cannot remain empty",
        };
    }

    return {
    };
}

export default {
    validateHoliday
}