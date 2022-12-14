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

    return (
        <div data-testid="output-window">
            <OutputTitle>Output</OutputTitle>
            <OutputScreen data-cy="output-screen">
                {outputDetails ? getOutput() : null}
            </OutputScreen>
        </div>
    )
}

export default OutputWindow
