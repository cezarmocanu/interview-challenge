import API_ROUTES from "@constants/api_routes";
import type {NextApiRequest, NextApiResponse} from 'next'
import IStaff from "@model/staff";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<IStaff[]>
) {
    const response = await fetch(API_ROUTES.HOLIDAY_API.HOLIDAYS(2021));

    if (response.status === 200) {
        const json = await response.json();
        const holidays = json.holidays
            .filter((publicHoliday: any) => publicHoliday.public)
            .map((publicHoliday: any) => {
                return {
                    id: publicHoliday.uuid,
                    start: new Date(publicHoliday.date),
                    end: new Date(publicHoliday.date),
                }
            });
        return res.status(response.status).json(holidays);
    }

    return res.status(response.status).json([]);
}
