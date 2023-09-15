import {SyntheticEvent, useState} from 'react';
import React from 'react';

const MoreBoxes = () => {

    // let counter = 1;
    // const [boxes, setBoxes] = useState([{id:0,value:"aa"}] as box[]);
    // const eventHandler = (event:SyntheticEvent,id:string) => {
    //
    //     const box = document.getElementById(id);
    //
    //     let text = (event.target as HTMLInputElement).value;
    //     console.log(text, 'id:', id);
    //
    //     if (text !== '' ) {
    //         console.log('fisrt if in eh');
    //         addBox(text);
    //     }
    //     else if (text === ''){
    //         deleteBox(+id);
    //     }
    // };
    //
    // const addBox = (value:string) => {
    //     console.log('addbox called');
    //     //setBoxes( b=> b.push( createBox(counter) ) );
    //     setBoxes([...boxes,{id:counter,value:value} ]);       //one of them will wor
    //     counter += 1;
    // };
    // const deleteBox = (index:number) => {
    //     console.log('delete box called');
    //
    //     setBoxes(b => b.splice(index, 1));
    //     addBox('');
    // };
    //
    //
    // return (
    //     <>
    //         <button onClick={()=>addBox('')}></button>
    //         {boxes.map(e => <input key={e.id} onChange={eventHandler(e)}>e.value</input>)}
    //     </>
    // );

}


export default MoreBoxes;

interface box{
    id:number;
    value:string|null;
}