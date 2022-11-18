import React from "react";
import Select from "react-select";
import { CustomStyles } from "../styles/CustomStyles";
import { LanguageOptions } from "../data/LanguageOptions";

const LanguageDropdown = ({ filteredLanguages, onSelectChange }) => {
    return (
        <Select
            id="language-select"
            placeholder={`Filter By Category`}
            options={filteredLanguages || LanguageOptions}
            styles={CustomStyles}
            defaultValue={LanguageOptions[0]}
            onChange={(selectedOption) => onSelectChange(selectedOption)}
        />
    )
}

export default LanguageDropdown