import LOCAL_STORAGE_KEYS from "@constants/local_storage_keys";
import IHoliday from "@model/holiday";
import LocalStorageAdaptor from "@service-adaptors/local-storage-adaptor";

/*This method is tested, using a service adaptor pattern, to mock external dependencies*/
const getAllByUserId = async (userId: number, localStorageAdaptor: any = LocalStorageAdaptor) => {
    const response = localStorageAdaptor.getItem(LOCAL_STORAGE_KEYS.HOLIDAYS);
    const data = JSON.parse(response ?? "[]");

    return data
        .filter((holiday: IHoliday) => holiday.userId === userId)
        .map((holiday: any) => ({
            ...holiday,
            start: new Date(holiday.start),
            end: new Date(holiday.end),
        }));
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

    const newData = [...data, newEntity];
    localStorage.setItem(LOCAL_STORAGE_KEYS.HOLIDAYS, JSON.stringify(newData));

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