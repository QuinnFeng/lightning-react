import React, {useState} from "react";
import {Link} from "react-router-dom";
import css from "../categories/Categories.module.scss";

const taskList=()=>{
    const [tasks,SetTasks]=useState([] as string[]);

    return (<>
        tasks.map((element:string,index:number) => {
        return (
        <div key={element}>
        <p>{element.name}</p>
        </div>
    </>);
}