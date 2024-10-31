import React from "react";
import {RemindInfo} from "../models.ts";
import "../App.css"
import ReminderCard from "./ReminderCard.tsx";

interface Props {
    reminders: RemindInfo[];
    setReminds:  React.Dispatch<React.SetStateAction<RemindInfo[]>>
}
const RemindersList:React.FC<Props> = ({reminders, setReminds}:Props) =>{

    const jwt: string | null = localStorage.getItem('jwt');

    fetch(
        'http://localhost:8081/aunt/user',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': jwt as string,
                }
            }
        )
        .then(response => response.json())
        .then(data =>{
            setReminds(data.reminders)
        })
        .catch(error => console.log(error));
    return <div className="reminders">
        {reminders.map(remind =>(
            <ReminderCard remind={remind} key={remind.id} reminds={reminders} setReminds={setReminds}
            />

        ))}

    </div>;

};

export default RemindersList;