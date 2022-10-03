const BASE = "/api";
const HOLIDAY_API_BASE = "https://holidayapi.com/v1"

const API_ROUTES = {
    STAFF: `${BASE}/staff`,
    PUBLIC_HOLIDAYS: `${BASE}/public-holidays`,
    HOLIDAY_API: {
        HOLIDAYS: (year:number) => `${HOLIDAY_API_BASE}/holidays?pretty&country=DE&year=${year}&key=${process.env.NEXT_PUBLIC_HOLIDAY_API_KEY}`,
    }
}

export default API_ROUTES;