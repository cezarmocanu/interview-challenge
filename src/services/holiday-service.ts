import LOCAL_STORAGE_KEYS from "@constants/local_storage_keys";
import IHoliday from "@model/holiday";

const getAllByUserId = async (userId: number) => {
    const response = localStorage.getItem(LOCAL_STORAGE_KEYS.HOLIDAYS)
    const data = JSON.parse(response ?? "[]");

    return data.filter((holiday: IHoliday) => holiday.userId === userId);
};

const create = async (holiday: IHoliday) => {
    const response = localStorage.getItem(LOCAL_STORAGE_KEYS.HOLIDAYS);
    const data = JSON.parse(response ?? "[]");

    const nextHolidayId = Number(localStorage.getItem(LOCAL_STORAGE_KEYS.LAST_HOLIDAY_ID) ?? "0") + 1;
    localStorage.setItem(LOCAL_STORAGE_KEYS.LAST_HOLIDAY_ID, `${nextHolidayId}`);

    const newEntity = {
        id: nextHolidayId,
        ...holiday
    };

    data.push(newEntity);
    localStorage.setItem(LOCAL_STORAGE_KEYS.LAST_HOLIDAY_ID, JSON.stringify(data));

    return newEntity;
};

const deleteOne = async (id: number) => {
    const response = localStorage.getItem(LOCAL_STORAGE_KEYS.HOLIDAYS);
    const data = JSON.parse(response ?? "[]");

    const entityIndex = data.findIndex((holiday: IHoliday) => holiday!.id === id);

    if (entityIndex === -1 || !data.length) return;

    const removedEntity = data.splice(entityIndex, 1);
    localStorage.setItem(LOCAL_STORAGE_KEYS.LAST_HOLIDAY_ID, JSON.stringify(data));

    return removedEntity;
};

export default {
    getAllByUserId,
    create,
    deleteOne
};