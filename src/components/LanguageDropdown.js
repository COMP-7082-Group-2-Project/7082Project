import React from "react";
import Select from "react-select";
import { CustomStyles } from "../styles/CustomStyles";
import { LanguageOptions } from "../data/LanguageOptions";

const LanguageDropdown = ({ onSelectChange }) => {
    return (
        <Select
            placeholder={`Filter By Category`}
            options={LanguageOptions}
            styles={CustomStyles}
            defaultValue={LanguageOptions[0]}
            onChange={(selectedOption) => onSelectChange(selectedOption)}
        />
    ) 
}

export default LanguageDropdown