import HolidayService from "@services/holiday-service";
import LOCAL_STORAGE_KEYS from "@constants/local_storage_keys";

const storage: any = {
    [LOCAL_STORAGE_KEYS.HOLIDAYS]: [
        {userId: 1},
        {userId: 1},
        {userId: 3}
    ]
};

const mockLocalStorageAdapter = {
    getItem: (key: string) => {
        return JSON.stringify(storage[key]);
    }
};

it('Should return an empty array if the user does not exist', async () => {
    const actual = await HolidayService.getAllByUserId(2, mockLocalStorageAdapter);
    expect(actual).toBeEmpty;
})

it('Should return 2 partial holiday objects of user with userId: 1', async () => {
    const actual = await HolidayService.getAllByUserId(1, mockLocalStorageAdapter);
    expect(actual).toHaveLength(2);
})

