import { loader } from "@monaco-editor/react";
import { ThemeOptions } from "../data/ThemeOptions";

export const getThemeJson = (theme) => {
    return new Promise((res) => {
        Promise.all([
            loader.init(),
            import(`monaco-themes/themes/${ThemeOptions[theme]}.json`),
        ]).then(([monaco, themeData]) => {
            monaco.editor.defineTheme(theme, themeData);
            res();
        });
    });
};

export const classNames = (...args) => {
    return args.join(" ");
}