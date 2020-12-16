import React, { useState } from "react";
import { InputField, Textarea } from "./components/FormElements/FormElements";


export default function () {
    const [testInput, setInput] = useState<string>("");
    const [testTextarea, setTextarea] = useState<string>("");

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
        </>
    )
}