import React from "react";
import {RemindInfo} from "../models.ts";
import "../App.css"
import ReminderCard from "./ReminderCard.tsx";

interface Props {
    reminders: RemindInfo[];
    setReminds:  React.Dispatch<React.SetStateAction<RemindInfo[]>>
}
const RemindersList:React.FC<Props> = ({reminders, setReminds}:Props) =>{
    return <div className="tasks">
        <h3>In progress</h3>
        {reminders.map(remind =>(
            <ReminderCard remind={remind} key={remind.id} reminds={reminders} setReminds={setReminds}
            />
        ))}

    </div>;
};

export default RemindersList;