import { useEffect, useRef, useState } from "react"
import { addDoc,collection,onSnapshot,doc,deleteDoc,setDoc} from "firebase/firestore";
import { db } from "./firebaseconfig";

export const TodoApp =()=>{

    const[todo,setTodo] =useState([]);
    const textRef =useRef();
    const dateRef =useRef();


    useEffect(()=>{

        const unsub = onSnapshot(collection(db, "todos"), (doc) => {
            const data = doc.docs.map((col)=>{
                return {id:col.id,
                        ...col.data()}
            })
            data.sort((todo1,todo2)=>todo2.createdOn - todo1.createdOn);
            setTodo(data);
            console.log(data);
        });

        
    },[])

    const handleAdd = async()=>{

        if(textRef.current.value && dateRef.current.value){

             await addDoc(collection(db, "todos"), {
                todo: textRef.current.value,
                date:dateRef.current.value,
                createdOn:new Date(),
                status:"pending"
              });

              console.log("this is todo",todo);

              textRef.current.value="";
              dateRef.current.value="";

        }

    }

    const handleDelete =async(todoo)=>{
        await deleteDoc(doc(db, "todos", todoo.id));
    }

    const handleMarkdone =async(todoo)=>{

        await setDoc(doc(db, "todos", todoo.id), {
            status:"Completed",
            completedOn:new Date()
          },{merge:true});

    }

    
    
    return<>

    <div className="mainApp">
    <h1>Todo App</h1>
    <div className="options">
        <input className="inputtext" ref={textRef} type="text" placeholder="Enter the text"></input>
        <input className="inputdate" ref={dateRef} type="date"></input>
        <button className="addbutton" onClick={handleAdd}>ADD</button>
    </div>
    <div>
        <ul>

            {todo.map((tod)=><>
                
                <li>
                <p>{tod.todo}</p>
                <small>{tod.date}</small>
                <div className="listendoptions">
                    {tod.status==="pending"?<button className="donebutton" onClick={()=>{handleMarkdone(tod);}}>DONE</button>:<img src="https://cdn-icons-png.flaticon.com/128/5290/5290058.png" alt="completed"></img>}
                    <button className="deletebutton" onClick={()=>{handleDelete(tod);}}>DELETE</button>
                </div>
            </li>
            </>)}
            

        </ul>
    </div>

    </div>
        
    </>

}