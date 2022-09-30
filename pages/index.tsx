import type {NextPage} from 'next';
import {useEffect, useState} from "react";

import IStaff from "@model/staff";

import StaffService from "@services/staff-service";
import HolidayService from "@services/holiday-service";

import Calendar from "@components/calendar/calendar";
import IHoliday from "@model/holiday";
import MONTH_NAMES from "@constants/month_names";

const Home: NextPage = () => {
    const [staffList, setStaffList] = useState<IStaff[]>([]);
    const [selectedStaffMember, setSelectedStaffMember] = useState<IStaff | null>(null);
    const [holidayList, setHolidayList] = useState<IHoliday[]>([]);

    const getHolidaysByStaff = (staff: IStaff) => {
        HolidayService
            .getAllByUserId(staff.id)
            .then((data) => setHolidayList(data));
    }

    const initializeStaffList = () => {
        StaffService
            .getAll()
            .then((data) => {
                setStaffList(data);

                if (data.length) {
                    const firstMember = data[0];
                    setSelectedStaffMember(firstMember);
                    getHolidaysByStaff(firstMember);
                }
            });
    }

    const handleStartDateChange = (e: any) => {
        new Date(e.target.value)
    }

    useEffect(() => {
        initializeStaffList();
    }, []);

    return (
        <>
            <div className="flex justify-center px-20">
                <div className="mb-3 xl:w-96">
                    <select className="
                        form-select
                        appearance-none
                        block
                        w-full
                        px-3
                        py-1.5
                        text-base
                        font-normal
                        text-gray-700
                        bg-white bg-clip-padding bg-no-repeat
                        border border-solid border-gray-300
                        rounded
                        transition
                        ease-in-out
                        m-0
                        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
            </div>
            <div className="flex">
                <div className="flex flex-col grow items-left justify-center">
                    <h6 className="text-md">Start Date</h6>
                    <div className="datepicker relative form-floating mb-3 xl:w-96" data-mdb-toggle-button="false">
                        <input type="date"
                               onChange={handleStartDateChange}
                               className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                               placeholder="Select a date" data-mdb-toggle="datepicker"/>
                        <label htmlFor="floatingInput" className="text-gray-700">Select a date</label>
                    </div>
                </div>
                <div className="flex flex-col grow items-left justify-center">
                    <h6 className="text-md">End Date</h6>
                    <div className="flex grow">
                        <div className="datepicker relative form-floating mb-3 xl:w-96" data-mdb-toggle-button="false">
                            <input type="date"
                                   className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                   placeholder="Select a date" data-mdb-toggle="datepicker"/>
                            <label htmlFor="floatingInput" className="text-gray-700">Select a date</label>
                        </div>
                    </div>
                </div>

            </div>
            <div>
                <h6 className="text-md">Calendar</h6>
                <Calendar events={holidayList}
                />
            </div>
            <div>
                <div className={"max-w"}>
                    <h1 className="text-lg py-2">Scheduled vacations</h1>
                    <div className={"max-w"}>
                        {
                            holidayList.map((event) => {
                                return (
                                    <div className={"max-w mb-2 flex"}>
                                        <div className="flex flex-col justify-center items-center bg-purple-600 text-white w-24 h-24 rounded-lg">
                                            <span className="text-xs">{`${MONTH_NAMES[event.start.getMonth()]} ${event.start.getFullYear()}`}</span>
                                            <span className="text-2xl">{event.start.getDate() + 1}</span>
                                        </div>
                                        <div className="grow h-24 rounded-lg bg-purple-600 ml-2 text-white flex  items-center px-2">
                                            <span className={"text-md"}>{`Vacation (${(event.end.getDate() - event.start.getDate())} days)`}</span>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
