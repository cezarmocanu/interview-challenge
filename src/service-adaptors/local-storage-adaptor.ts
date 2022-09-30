import LOCAL_STORAGE_KEYS from "@constants/local_storage_keys";

const getItem = (key: string) => {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.HOLIDAYS);
}

export default {
    getItem
}