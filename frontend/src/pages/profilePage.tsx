import ReminderInput from "../compotents/ReminderInput.tsx";
import {RemindInfo} from "../models.ts";
import React from "react";
import RemindersList from "../compotents/RemindersList.tsx";
// import ReminderCard from "../compotents/ReminderCard.tsx";

const ProfilePage: React.FC = () => {
    const [message, setMessage] = React.useState<string>("");
    const [reminders, setReminders] = React.useState<RemindInfo[]>([])
    const [date, setDate] = React.useState<string>("");
    const [befores, setBefores] = React.useState<number[]>([]);

    const handleCreate = ()=>{
        if(message){
            setReminders([...reminders,{id: Date.now(), message: message, before: befores, date:date, userId: 1}]);
        }
        console.log(reminders);
    }

    return ( <>

            <ReminderInput message={message} date = {date} befores={befores} setBefores={setBefores} setDate={setDate} setMessage={setMessage} handleCreate={handleCreate}/>
            <RemindersList reminders={reminders} setReminds={setReminders}/>
            {/*<ReminderCard remind={message} reminds={remind[]} setReminds={}/>*/}
        </>
        )
}

export default ProfilePage;