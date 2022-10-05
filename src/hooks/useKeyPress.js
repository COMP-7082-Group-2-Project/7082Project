import { useState , useEffect, useCallback } from "react";

const useKeyPress = (targetKey) => {
    // States, references
    const [keyPressed, setKeyPressed] = useState(false);

    const downHandler = useCallback(({ key }) => {
        if (key === targetKey) setKeyPressed(true);
    }, [targetKey]);

    const upHandler = useCallback(({ key }) => {
        if (key === targetKey) setKeyPressed(false);
    }, [targetKey]);

    useEffect(() => {
        document.addEventListener("keydown", downHandler);
        document.addEventListener("keyup", upHandler);

        // Cleanup
        return () => {
            document.removeEventListener("keydown", downHandler);
            document.removeEventListener("keyup", upHandler);
        }
    }, [downHandler, upHandler]);

    return keyPressed;
}

export default useKeyPress