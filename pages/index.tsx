import type {NextPage} from 'next';
import {useEffect, useMemo, useState} from "react";

import IStaff from "@model/staff";

import StaffService from "@services/staff-service";
import HolidayService from "@services/holiday-service";

import Calendar from "@components/calendar/calendar";
import IHoliday from "@model/holiday";
import MONTH_NAMES from "@constants/month_names";
import DateUtils from "@utils/date-utils";

const Home: NextPage = () => {
    const [staffList, setStaffList] = useState<IStaff[]>([]);
    const [selectedStaffMember, setSelectedStaffMember] = useState<IStaff | null>(null);
    const [holidayList, setHolidayList] = useState<IHoliday[]>([]);
    const [formData, setFormData] = useState({
        startDate: null,
        endDate: null,
    });

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

    const handleFormChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    const handleFormSubmit = (e: any) => {
        e.preventDefault();
        const holiday: IHoliday = {
            start: new Date(formData.startDate ?? ""),
            end: new Date(formData.endDate ?? ""),
            userId: selectedStaffMember?.id,
        }

        HolidayService.create(holiday).then(() => {
            if (selectedStaffMember) {
                getHolidaysByStaff(selectedStaffMember)
            }
        });
    }

    const handleOnChange = (e: any) => {
        const staff = staffList.find((staff: IStaff) => staff.id === Number(e.target.value)) ?? null;
        setSelectedStaffMember(staff);
    }

    const remainingDays = useMemo(() => {
        if(!selectedStaffMember) {
            return;
        }

        return DateUtils.computeAvailableDays(selectedStaffMember, holidayList);
    }, [selectedStaffMember, holidayList]);

    useEffect(() => {
        initializeStaffList();
    }, []);

    useEffect(() => {
        if (selectedStaffMember){
            getHolidaysByStaff(selectedStaffMember);
        }
    }, [selectedStaffMember]);

    return (
        <>
            <div className="flex justify-center pt-20 pb-5">
                <div className="mb-3 w-full px-20">
                    <select
                        className="
                        flex justify-start
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
                        value={selectedStaffMember?.id}
                        onChange={handleOnChange}
                    >
                        {
                            staffList.map((staff: IStaff) => {
                                return (
                                    <option
                                        value={staff?.id}>
                                        {staff.name}
                                    </option>
                                );
                            })
                        }
                    </select>
                </div>
            </div>
            <div className="px-20 pb-5">
                <h1 className="text-2xl"> Vacation days</h1>
                <h1 className="text-2xl"> <span className="text-blue-600">{remainingDays}</span> / 30</h1>
            </div>
            <form className="flex px-20 items-center">
                    <div className="flex flex-col grow items-left justify-center">
                        <h6 className="text-md">Start Date</h6>
                        <div className="datepicker relative form-floating mb-3 xl:w-96" data-mdb-toggle-button="false">
                            <input type="date"
                                   onChange={handleFormChange}
                                   name="startDate"
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
                                       onChange={handleFormChange}
                                       name="endDate"
                                       className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                       placeholder="Select a date" data-mdb-toggle="datepicker"/>
                                <label htmlFor="floatingInput" className="text-gray-700">Select a date</label>
                            </div>
                        </div>
                    </div>
                <div >
                    <button
                        onClick={handleFormSubmit}
                        className="w-32 text-white bg-purple-600 flex justify-center items-center p-2 rounded-lg hover:bg-purple-400"
                    >
                        Add Vacation
                    </button>
                </div>
            </form>
            <div className={"px-20"}>
                <h1 className="text-lg py-2">Calendar</h1>
                <Calendar events={holidayList}
                />
            </div>
            <div className={"px-20"}>
                <div className={"max-w"}>
                    <h1 className="text-lg py-2">Scheduled vacations</h1>
                    <div className={"max-w"}>
                        {
                            holidayList.map((event) => {
                                return (
                                    <div className={"max-w mb-2 flex"}>
                                        <div className="flex flex-col justify-center items-center bg-purple-600 text-white w-24 h-24 rounded-lg">
                                            <span className="text-xs">{`${MONTH_NAMES[event.start.getMonth() ?? 0]} ${event.start.getFullYear()}`}</span>
                                            <span className="text-2xl">{event.start.getDate() + 1}</span>
                                        </div>
                                        <div className="grow h-24 rounded-lg bg-purple-600 ml-2 text-white flex  items-center px-2">
                                            <span className={"text-md"}>{`Vacation (${(event.end.getDate() - event.start.getDate() === 0 ? 1 : event.end.getDate() - event.start.getDate())} days)`}</span>
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
