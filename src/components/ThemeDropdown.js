import React from "react";
import Select from "react-select";
import monacoThemes from "monaco-themes/themes/themelist";
import { CustomStyles } from "../styles/CustomStyles";

const ThemeDropdown = ({ handleThemeChange, theme }) => {
    return (
        <Select
            id="theme-select"
            placeholder={`Select Theme`}
            options={Object.entries(monacoThemes).map(([themeID, themeName]) => {
                return {
                    label: themeName,
                    value: themeID,
                    key: themeID
                }
            })}
            value={theme}
            styles={CustomStyles}
            onChange={handleThemeChange}
        />
    )
}

export default ThemeDropdown