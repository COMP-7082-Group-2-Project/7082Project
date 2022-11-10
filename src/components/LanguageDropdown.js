import React from "react";
import Select from "react-select";
import { CustomStyles } from "../styles/CustomStyles";
import { LanguageOptions } from "../data/LanguageOptions";

const LanguageDropdown = ({ onSelectChange }) => {
    return (
        <div data-testid="language-dropdown-wrapper">
            <Select
                placeholder={`Filter By Category`}
                options={LanguageOptions}
                styles={CustomStyles}
                defaultValue={LanguageOptions[0]}
                onChange={(selectedOption) => onSelectChange(selectedOption)}
            />
        </div>
    )
}

export default LanguageDropdown