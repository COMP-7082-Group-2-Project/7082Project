import React from "react";
import Select from "react-select";
import monacoThemes from "monaco-themes/themes/themelist";
import { CustomStyles } from "../styles/CustomStyles";

const ThemeDropdown = ({ handleThemeChange, theme }) => {
    return (
        <div data-testid="theme-dropdown-wrapper">
            <Select
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
        </div>
    )
}

export default ThemeDropdown