import ITimeEvent from "@model/time-event";
import {useCallback, useMemo} from "react";
import MONTH_NAMES from "@constants/month_names";
import EventIndicator from "@components/calendar/event-indicator";
import DateUtils from "@utils/date-utils";
import IHoliday from "@model/holiday";

interface Props {
    events: ITimeEvent[];
    publicHolidays: IHoliday[];
    currentDate: Date;
    setCurrentDate: (arg0: Date) => void
}

export const EVENT_INDICATOR_TYPE = {
    SINGLE: "EVENT_INDICATOR_TYPE_SINGLE",
    SINGLE_PUBLIC_HOLIDAY: "EVENT_INDICATOR_TYPE_SINGLE_PUBLIC_HOLIDAY",
    START: "EVENT_INDICATOR_TYPE_START",
    DAY: "EVENT_INDICATOR_TYPE_DAY",
    END: "EVENT_INDICATOR_TYPE_END",
}

const Calendar = ({events,publicHolidays, currentDate, setCurrentDate}: Props) => {
    const daysOfWeek = useMemo(() => {
        const dows = [
            "Mo",
            "Tu",
            "We",
            "Th",
            "Fri",
            "Sat",
            "Sun"
        ];
        const currentDay = currentDate.getDay() - 1;
        return [
            ...dows.slice(currentDay),
            ...dows.slice(0, currentDay)
        ];
    }, [currentDate]);


    const handlePrevMonthClick = () => {
        const d = new Date(currentDate);
        d.setDate(0);
        d.setDate(1);
        setCurrentDate(d);
    }

    const handleNextMonthClick = () => {
        const d = new Date(currentDate);
        const next = new Date(d.getFullYear(), d.getMonth() + 1, 1);
        setCurrentDate(next);
    }

    const currentMonth = useMemo(() => currentDate.getMonth(), [currentDate]);

    const isEventThisMonth = useCallback(
        (event: ITimeEvent) => event.start.getMonth() === currentMonth || event.end.getMonth() === currentMonth,
        [currentMonth]
    );

    const eventsThisMonth = useMemo(() => {
        return events
            .filter((event: ITimeEvent) => isEventThisMonth(event))
            .map((event) => {
                const duration = event.end.getDate() - event.start.getDate() + 1;
                if (duration === 0) {
                    return new Array(1).fill(event.start.getDate() + 1);
                }
                return new Array(duration).fill(0).map((_, index) => event.start.getDate() + index);
            });
    }, [events, currentDate]);

    const dayHasEvent = useCallback((day: number) => {
        const dateArray = eventsThisMonth.find(dateArray => dateArray.includes(day));
        const isPublicHoliday = publicHolidays.find((holiday: IHoliday) => holiday.start.getDate() === day);

        if (isPublicHoliday) {
            return EVENT_INDICATOR_TYPE.SINGLE_PUBLIC_HOLIDAY;
        }

        if (!dateArray) {
            return null;
        }

        if (dateArray.length === 1) {
            return EVENT_INDICATOR_TYPE.SINGLE;
        }

        if (dateArray.indexOf(day) === 0) {
            return EVENT_INDICATOR_TYPE.START;
        }

        if (dateArray.indexOf(day) === dateArray.length - 1) {
            return EVENT_INDICATOR_TYPE.END;
        }

        return EVENT_INDICATOR_TYPE.DAY;
    }, [eventsThisMonth, publicHolidays]);


    const calendarDays = useMemo(() => {
        const days = new Array(DateUtils.getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth())).fill(0).map((_, index) => index + 1);
        return days.map((day) => {
            return (
                <div key={`calendar-day-${day}`} className={"max-w h-32 border flex flex-col"}>
                    <div className="max-w max-h flex justify-center items-center">
                        <span>{day}</span>
                    </div>
                    <div className={"flex flex-col grow justify-center items-center max-h"}>
                        <EventIndicator eventType={dayHasEvent(day)}/>
                    </div>
                </div>
            );
        });
    }, [currentDate, eventsThisMonth, publicHolidays]);

    return (
        <div className="max-w mx-2 rounded-lg p-3 bg-slate-50">
            <div className="flex p-2">
                <div className="flex grow">
                    <span className="text-2xl font-bold">
                        {MONTH_NAMES[currentMonth]}
                    </span>
                </div>
                <div>
                    <button
                        className={"rounded-md text-white text-md p-1 w-16 h-8 bg-purple-600 mr-4"}
                        onClick={handlePrevMonthClick}
                    >Prev</button>
                    <button
                        className={"rounded-md text-white text-md p-1 w-16 h-8 bg-purple-600"}
                        onClick={handleNextMonthClick}
                    >Next</button>
                </div>
            </div>
            <div className="grid grid-cols-7">
                {
                    daysOfWeek.map((dow: string) => (
                        <div className={"max-w px-3 py-3"}>
                            <div className="max-w max-h flex justify-center items-center">
                                <span className="font-bold">{dow}</span>
                            </div>
                        </div>

                    ))
                }
                {calendarDays}
            </div>
        </div>
    );
}

export default Calendar;