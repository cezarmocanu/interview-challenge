import type {NextApiRequest, NextApiResponse} from 'next'
import IStaff from "@model/staff";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<IStaff[]>
) {
    res.status(200).json([
        {
            name: "Georgi",
            vacationBudget: 25,
            discipline: "Frontend"
        },
        {
            name: "Angel",
            vacationBudget: 27,
            discipline: "Frontend"
        },
        {
            name: "Murat",
            vacationBudget: 25, discipline: "Frontend"
        },
        {name: "Dilshod", vacationBudget: 26, discipline: "Backend"}, {
            name: "Andreas",
            vacationBudget: 30,
            discipline: "Backend"
        }
    ]);
}
