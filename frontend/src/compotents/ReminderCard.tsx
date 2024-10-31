import {RemindInfo} from "../models.ts";
import {
    MdOutlineCancelPresentation,
    MdOutlineModeEdit
} from 'react-icons/md';
import "../App.css"
// import ReminderList from "./ReminderList.tsx";
import React, {useEffect, useRef, useState} from "react";

interface Props {
    remind: RemindInfo
    reminds: RemindInfo[]
    setReminds:  React.Dispatch<React.SetStateAction<RemindInfo[]>>
}

const ReminderCard = ({remind,reminds,setReminds}: Props) =>{
    const [edit,setEdit,] = useState<boolean>(false);
    const [editReminder,setEditReminder] = useState<string>(remind.message);
    const [editDate, setEditDate] = useState<string>(remind.date);
    const [open, setOpen] = useState<boolean>(false);
    const [editDescription,setEditDescription] = useState<boolean>(false);
    const [editDescriptionText,setEditDescriptionText] = useState<string>(remind.date);

    const handleDelete = (id:number) => {
        setReminds(reminds.filter((reminder)=>reminder.id!==id))
    }

    const handleEdit = (e:React.FormEvent,id:number) => {
        // console.log(reminder.description);
        console.log(id);
        e.preventDefault();
        setReminds(
            reminds.map((reminder) =>
                reminder.id===id?{...reminder, message:editReminder, date: editDate}:reminder
            )
        );
        console.log("asdfsadf");

        setEdit(false);
        setEditDescription(false);
        // console.log("nefr");
        // console.log(reminder.name, editReminder)

    };

    const editRef = useRef< HTMLInputElement>(null);
    const editDesRef = useRef<HTMLTextAreaElement>(null);

    useEffect(()=>{
        if(edit){
            editRef.current?.focus();
        }

    }, [edit])

    return (
        <form className="reminderCard" onSubmit={(e) => handleEdit(e, remind.id)}>
            <div className="reminderInfo">
                {edit? (
                        <div className="reminderEdit">
                            <input value={editReminder} ref={editRef} onChange={(e) => {
                                setEditReminder(e.target.value);
                            }} className="reminderNameEdit"/>
                            <input value={editDate} className="reminderNameEdit" onChange={(e) => {setEditDate(e.target.value)}}/>
                        </div>

                    ) :
                    (
                        <span className="reminderName">
                            <h3>{remind.message}</h3>
                            <p>{remind.date}</p>
                        </span>

                    )
                }

            </div>

            <div className="reminderCardActions">
                    <span className="actions" onClick={() => {
                        if (!edit) {
                            setEdit(!edit);
                        }
                    }
                    }>
                         <MdOutlineModeEdit/>
                        </span>

                <span className="actions" onClick={() => handleDelete(remind.id)}>
                    <MdOutlineCancelPresentation/>
                </span>
            {/*    {open ? (<span className="actions" onClick={toggle}>*/}
            {/*        <MdOutlineKeyboardArrowUp/>*/}
            {/*    </span>): (<span className="actions" onClick={toggle}>*/}
            {/*    <MdKeyboardArrowDown/>*/}
            {/*</span>)}*/}


            </div>

            <div className="reminderDescriptionArea">
                {open && (

                    <div className="description">
                        <h4>Description</h4>
                        <div className="descriptionEditButton">
                            {(open) ? (
                                    <span className="actions" id="editButton" onClick={() => {
                                        if (!editDescription) {
                                            setEditDescription(!editDescription);
                                        }
                                    }
                                    }>
                         <MdOutlineModeEdit/>
                        </span>)
                                : (
                                    <>

                                    </>
                                )

                            }
                        </div>
                        {!editDescription ? (
                                <p className="reminderDescription"
                                   style={{color: 'black'}}>{remind.message}</p>
                            )
                            : (

                                <textarea value={editDescriptionText} ref={editDesRef} onChange={(e) => {
                                    setEditDescriptionText( e.target.value);
                                }} className="reminderDescriptionEdit"/>
                            )
                        }
                        
                    </div>
                )}
            </div>


            <button className="submitButton" type="submit" style={
                edit? {
                        display: 'flex', color: 'red', backgroundColor: 'white'
                    }
                    : {display: 'none'}
            }
                    onClick={() => {
                        setEdit(false);
                    }}
            >Done
            </button>
        </form>
    )
}

export default ReminderCard