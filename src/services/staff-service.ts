import API_ROUTES from "@constants/api_routes";

const getAll = async () => {
    const response = await fetch(API_ROUTES.STAFF);

    if (response.status === 200){
        return await response.json();
    }

    return [];
};

export default {
    getAll
};