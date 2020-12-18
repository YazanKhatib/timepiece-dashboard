import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Checkbox, InputField, Textarea } from "./components/FormElements/FormElements";
import { testSlice } from "./services/store";


export default function () {
    
    const dispatch = useDispatch()

    const [testInput, setInput] = useState<string>("");
    const [testTextarea, setTextarea] = useState<string>("");

    const num: number = useSelector( ( state: {test: number} ) => state.test )

    return(
        <>
        <InputField 
            value={testInput}
            type="text"
            placeholder="Email address"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setInput(e.currentTarget.value) } } />

        <Textarea 
            value={testTextarea}
            placeholder="Bio"
            rows={5}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setTextarea(e.currentTarget.value) } } />

        <Checkbox label="Remember me" />

        {num}
        
        <div className="text-center"><button className="button bg-gold color-white round" style={{ width: 200 }} onClick={() => dispatch( testSlice.actions.changeValue({ n: 5}) ) }>Login</button></div>
        </>

    )
}