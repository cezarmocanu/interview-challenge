import type {NextPage} from 'next';
import StaffService from "@services/staff-service";
import {useEffect, useState} from "react";
import IStaff from "@model/staff";

const Home: NextPage = () => {
    const [staffList, setStaffList] = useState<IStaff[]>([]);
    const [selectedStaffMember, setSelectedStaffMember] = useState<IStaff | null>(null);

    useEffect(() => {
        StaffService.getAll().then((data) => {
            setStaffList(data);

            if (data.length) {
                setSelectedStaffMember(data[0]);
            }
        });
    }, []);

    return (
        <>
            <div className="flex justify-center">
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
            <div className="flex items-center justify-center">
                <div className="datepicker relative form-floating mb-3 xl:w-96" data-mdb-toggle-button="false">
                    <input type="date"
                           className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                           placeholder="Select a date" data-mdb-toggle="datepicker"/>
                    <label htmlFor="floatingInput" className="text-gray-700">Select a date</label>
                </div>
            </div>
            <div className="flex items-center justify-center">
                <div className="datepicker relative form-floating mb-3 xl:w-96" data-mdb-toggle-button="false">
                    <input type="date"
                           className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                           placeholder="Select a date" data-mdb-toggle="datepicker"/>
                    <label htmlFor="floatingInput" className="text-gray-700">Select a date</label>
                </div>
            </div>

            <div>
                <div>
                    <h1>Calendar</h1>
                    <div>

                    </div>
                </div>
            </div>

            <div>
                <div>
                    <h1>Scheduled vacations</h1>
                    <div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
