import React, { useState, useEffect } from "react";
import Select from "react-select";
import { CustomStyles } from "../styles/CustomStyles";
import { DifficultyOptions } from "../data/DifficultyOptions";

const DifficultyDropdown = ({ onDifficultyChange, language, freeMode }) => {
    // States, references
    const [selectedOption, setSelectedOption] = useState(null);

    // Constants
    const supportedLanguages = ["javascript", "python", "java", "c", "cpp", "csharp", "go", "ruby", "swift", "php"]

    const handleChange = (e) => {
        setSelectedOption(e);
        onDifficultyChange(e);
    }

    // Enable all difficulty options if free mode is selected
    useEffect(() => {
        if (freeMode) {
            setSelectedOption(null);

            DifficultyOptions.forEach(option => {
                option.isDisabled = false;
            })
        }
    }, [freeMode])

    return (
        <Select
            id="difficulty-select"
            placeholder={`Select Difficulty`}
            value={selectedOption}
            options={DifficultyOptions}
            styles={CustomStyles}
            defaultValue={DifficultyOptions[0]}
            onChange={handleChange}
            isDisabled={!supportedLanguages.includes(language)}
            isOptionDisabled={(option) => option === selectedOption}
        />
    )
}

export default DifficultyDropdown