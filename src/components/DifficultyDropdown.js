import React from "react";
import Select from "react-select";
import { CustomStyles } from "../styles/CustomStyles";
import { DifficultyOptions } from "../data/DifficultyOptions";

const DifficultyDropdown = ({ onDifficultyChange }) => {
    return (
        <Select
            placeholder={`Select Difficulty`}
            options={DifficultyOptions}
            styles={CustomStyles}
            defaultValue={DifficultyOptions[0]}
            onChange={(selectedOption) => onDifficultyChange(selectedOption)}
        />
    )
}

export default DifficultyDropdown