import React from "react";
import Select from "react-select";
import { CustomStyles } from "../styles/CustomStyles";
import { DifficultyOptions } from "../data/DifficultyOptions";

const DifficultyDropdown = ({ onDifficultyChange, language }) => {
    // Constants
    const supportedLanguages = ["javascript", "python","java","c", "cpp", "csharp", "ruby", "swift","php"]

    return (
        <Select
            placeholder={`Select Difficulty`}
            options={DifficultyOptions}
            styles={CustomStyles}
            defaultValue={DifficultyOptions[0]}
            onChange={(selectedOption) => {
                // Enable all options that are disabled
                DifficultyOptions.forEach((option) => {
                    option.isDisabled = false;
                });

                // Disable the selected option
                selectedOption.isDisabled = true;

                onDifficultyChange(selectedOption)
            }}
            isDisabled={!supportedLanguages.includes(language)}
        />
    )
}

export default DifficultyDropdown