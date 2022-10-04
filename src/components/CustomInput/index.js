import React from "react";
import { InputArea } from "./CustomInputStyles";

const CustomInput = ({ customInput, setCustomInput }) => {
    return (
        <>
            {" "}
            <InputArea
                rows="5"
                value={customInput}
                onChange={(e) => setCustomInput(e.target.value)}
                placeholder={`Command Line Arguments`}
            ></InputArea>
        </>
    )
}

export default CustomInput