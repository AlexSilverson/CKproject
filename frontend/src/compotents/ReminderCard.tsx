import {RemindInfo} from "../models.ts";
import {
    MdKeyboardArrowDown,
    MdOutlineCancelPresentation,
    MdOutlineKeyboardArrowUp,
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
                reminder.id===id?{...reminder, name:editReminder, description: editDescriptionText}:reminder
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

    const toggle = () => {
        setOpen(!open);
        console.log("toggled")
        console.log(reminds)
    }
    useEffect(()=>{
        if(edit){
            editRef.current?.focus();
        }

    }, [edit])

    return (
        <form className={remind.isDone ? "reminderCardDone" : "reminderCard"} onSubmit={(e) => handleEdit(e, remind.id)}>
            <div className="reminderInfo">
                {edit  && open? (
                        <div className="reminderEdit">
                            <input value={editReminder} ref={editRef} onChange={(e) => {
                                setEditReminder(e.target.value);
                            }} className="reminderNameEdit"/>
                        </div>
                    ) :
                    (
                        <span className="reminderName">{remind.message}</span>
                    )
                }

            </div>

            <div className="reminderCardActions">

                {(open &&!remind.isDone) && (
                    <span className="actions" onClick={() => {
                        if (!edit && !remind.isDone) {
                            setEdit(!edit);
                        }
                    }
                    }>
                         <MdOutlineModeEdit/>
                        </span>
                )}

                <span className="actions" onClick={() => handleDelete(remind.id)}>
                    <MdOutlineCancelPresentation/>
                </span>
                {open ? (<span className="actions" onClick={toggle}>
                    <MdOutlineKeyboardArrowUp/>
                </span>): (<span className="actions" onClick={toggle}>
                <MdKeyboardArrowDown/>
            </span>)}


            </div>

            <div className="reminderDescriptionArea">
                {open && (

                    <div className="description">
                        <h4>Description</h4>
                        <div className="descriptionEditButton">
                            {(!remind.isDone && open) ? (
                                    <span className="actions" id="editButton" onClick={() => {
                                        if (!editDescription && !remind.isDone) {
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
                                   style={remind.isDone ? ({color: 'white'}) : ({color: 'black'})}>{remind.message}</p>
                            )
                            : (

                                <textarea value={editDescriptionText} ref={editDesRef} onChange={(e) => {
                                    setEditDescriptionText(e.target.value);
                                }} className="reminderDescriptionEdit"/>
                            )
                        }
                        
                    </div>
                )}
            </div>


            <button className="submitButton" type="submit" style={
                open && !remind.isDone && editDescription ? {
                        display: 'flex', color: 'red', backgroundColor: 'white'
                    }
                    : {display: 'none'}
            }
                    onClick={() => {
                        setEdit(false);
                        setEditDescription(false)
                    }}
            >Done
            </button>
        </form>
    )
}

export default ReminderCard