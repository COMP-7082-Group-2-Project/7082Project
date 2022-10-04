import React, { useState , useEffect } from "react";

const useKeyPress = (targetKey) => {
    // States, references
    const [keyPressed, setKeyPressed] = useState(false);

    const downHandler = ({ key }) => {
        if (key === targetKey) setKeyPressed(true);
    }

    const upHandler = ({ key }) => {
        if (key === targetKey) setKeyPressed(false);
    }

    useEffect(() => {
        document.addEventListener("keydown", downHandler);
        document.addEventListener("keyup", upHandler);

        // Cleanup
        return () => {
            document.removeEventListener("keydown", downHandler);
            document.removeEventListener("keyup", upHandler);
        }
    }, []);

    return keyPressed;
}

export default useKeyPress