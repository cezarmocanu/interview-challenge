import {EVENT_INDICATOR_TYPE} from "@components/calendar/calendar";

interface Props {
    eventType: string | null;
}

const EventIndicator = ({eventType}:Props) => {
    if (eventType === EVENT_INDICATOR_TYPE.START) {
        return <div className="h-6 bg-purple-500 flex justify-center align-center rounded-l-full w-full"/>;
    }

    if (eventType === EVENT_INDICATOR_TYPE.END) {
        return <div className="h-6 bg-purple-500 flex justify-center align-center rounded-r-full w-full"/>;
    }

    if (eventType === EVENT_INDICATOR_TYPE.DAY) {
        return <div className="h-6 bg-purple-500 flex justify-center align-center w-full"/>;
    }

    if (eventType === EVENT_INDICATOR_TYPE.SINGLE) {
        return <div className="w-6 color-white h-6 bg-purple-500 flex justify-center align-center rounded-full"/>;
    }

    return null;
}

export default EventIndicator;