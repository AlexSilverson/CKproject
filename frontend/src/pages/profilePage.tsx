// import {RemindInfo} from "../models.ts";
//

// interface Props {
//     remind : RemindInfo
//     reminds: RemindInfo[]
// }

import ReminderInput from "../compotents/ReminderInput.tsx";
import {message} from "antd";
import {RemindInfo} from "../models.ts";
import React from "react";
import RemindersList from "../compotents/RemindersList.tsx";

const ProfilePage: React.FC = () => {
    const [message, setMessage] = React.useState<string>("");
    const [reminders, setReminders] = React.useState<RemindInfo[]>([])

    const handleCreate = (e: React.FormEvent)=>{
        e.preventDefault();
        if(message){
            setReminders([...reminders,{id: Date.now(), message: message, before: "", date:Date.now(), userId: 1}]);
        }
    }

    return ( <>

            <ReminderInput message={message} setMessage={setMessage} handleCreate={handleCreate}/>
            <RemindersList reminders={[]} setReminds={setReminders}/>
        </>
        )
}

export default ProfilePage;