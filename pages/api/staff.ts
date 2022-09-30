import type {NextApiRequest, NextApiResponse} from 'next'
import IStaff from "@model/staff";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<IStaff[]>
) {
    res.status(200).json([
        {
            id: 0,
            name: "Georgi",
            vacationBudget: 25,
            discipline: "Frontend"
        },
        {
            id: 1,
            name: "Angel",
            vacationBudget: 27,
            discipline: "Frontend"
        },
        {
            id: 2,
            name: "Murat",
            vacationBudget: 25,
            discipline: "Frontend"
        },
        {
            id: 3,
            name: "Dilshod",
            vacationBudget: 26,
            discipline: "Backend"
        },
        {
            id: 4,
            name: "Andreas",
            vacationBudget: 30,
            discipline: "Backend"
        }
    ]);
}
