export const languageSeparators = {
    "javascript": ["/*", "*/"],
    "assembly": ["%if 0", "%endif ; 0"],
    "bash": [": '", "'"],
    "c": ["/*", "*/"],
    "cpp": ["/*", "*/"],
    "csharp": ["/*", "*/"],
    "clojure": ["(comment ", ")"],
    "lisp": ["#|", "|#"],
    "elixir": ['@docp """', '"""'],
    "fsharp": ["(*", "*)"],
    "go": ["/*", "*/"],
    "groovy": ["/*", "*/"],
    "haskell": ["{-", "-}"],
    "java": ["/*", "*/"],
    "kotlin": ["/*", "*/"],
    "lua": ["--[[", "]]"],
    "objectivec": ["/*", "*/"],
    "ocaml": ["(*", "*)"],
    "octave": ["%{", "%}"],
    "pascal": ["{", "}"],
    "perl": ["=pod", "=cut"],
    "php": ["<?php\n/*", "*/\n?>"],
    "text": ["", ""],
    "python": ["'''", "'''"],
    "ruby": ["=begin", "=end"],
    "rust": ["/*", "*/"],
    "scala": ["/*", "*/"],
    "sql": ["/*", "*/"],
    "swift": ["/*", "*/"],
    "typescript": ["/*", "*/"]
}

export const initialCode = `
Welcome to EdiCode! 

This is a code editor that allows you to write, compile, and execute code right in your browser.
Start coding by typing in the editor below. You can change the language or theme in the dropdown menus above.
You can also start a coding challenge by choosing a difficulty level in the dropdown menu above.

Happy coding!
`;