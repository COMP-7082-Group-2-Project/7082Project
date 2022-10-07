import React from "react";
import {
    OutputError, OutputSuccess, OutputTitle,
    OutputScreen
} from "./OutputWindowStyles";

const OutputWindow = ({ outputDetails }) => {
    const getOutput = () => {
        let statusId = outputDetails?.status?.id;

        switch (statusId) {
            case 6: // compilation error
                return <OutputError>{atob(outputDetails?.compile_output)}</OutputError>
            case 3: // accepted
                return (
                    <OutputSuccess>
                        {`${atob(outputDetails?.stdout)}` || null}
                    </OutputSuccess>
                )
            case 5: // time limit exceeded
                return <OutputError>{`Time Limit Exceeded`}</OutputError>
            default:
                return <OutputError>{atob(outputDetails?.stderr)}</OutputError>
        }
    }

    // Test
    return (
        <>
            <OutputTitle>Output</OutputTitle>
            <OutputScreen>
                {outputDetails ? getOutput() : null}
            </OutputScreen>
        </>
    )
}

export default OutputWindow
