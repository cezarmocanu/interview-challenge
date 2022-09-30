import HolidayService from "../../src/services/holiday-service";

const storage: any = {
    SAMPLE_KEY: "SAMPLE_VALUE"
};

const mockLocalStorageAdapter = {
    getItem: (key: string) => {
        return storage[key];
    }
};

it('Should return undefined if the key does not exist', () => {
    HolidayService.getAllByUserId(2, mockLocalStorageAdapter);
})

