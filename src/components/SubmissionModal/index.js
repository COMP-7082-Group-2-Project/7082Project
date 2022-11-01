import React, { useState, useEffect } from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import {
    SubmitModal, Wrapper, CheckmarkIcon,
    TestInfo, SpinnerWrapper, CrossIcon,
    NextButton, RedoButton
} from "./SubmissionModalStyles";

import "animate.css";

const SubmissionModal = ({ submitting, setSubmitting, expectedOutput, userSolution }) => {
    const [numPassed, setNumPassed] = useState(null);

    useEffect(() => {
        if (!expectedOutput || !userSolution || !submitting) return;

        // Compare every element in the expected output to the user's solution
        // If the user's solution is correct, add true
        let numCorrect = 0;

        expectedOutput.split("\n").forEach((answer, idx) => {
            if (answer === userSolution[idx]) numCorrect++;
        })

        setNumPassed(numCorrect);
    }, [expectedOutput, userSolution]) // eslint-disable-line react-hooks/exhaustive-deps

    const resetModal = () => {
        setSubmitting(false);
        setNumPassed(null);
    }

    const headerText = numPassed === null ? "Submitting..." : numPassed === 3 ? "Challenge Passed!" : "Challenge Failed. Try Again!";

    return (
        <SubmitModal show={submitting} onHide={resetModal}>
            <SubmitModal.Header>
                <SubmitModal.Title>{headerText}</SubmitModal.Title>
            </SubmitModal.Header>
            <SubmitModal.Body>
                {numPassed !== null ? (
                    <Wrapper>
                        {numPassed === 3 ? (
                            <CheckmarkIcon className="animate__animated animate__flip" />
                        ) : (
                            // If the challenge failed, show a red X
                            <CrossIcon
                                className="animate__animated animate__wobble"
                                viewBox="0 0 200 150">
                                <circle
                                    fill="none"
                                    stroke="#D06079"
                                    strokeWidth="6"
                                    strokeMiterlimit="10"
                                    cx="65.1"
                                    cy="65.1"
                                    r="62.1"
                                />
                                <line
                                    fill="none"
                                    stroke="#D06079"
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                    strokeMiterlimit="10"
                                    x1="34.4"
                                    y1="37.9"
                                    x2="95.8"
                                    y2="92.3"
                                />
                                <line
                                    fill="none"
                                    stroke="#D06079"
                                    strokeWidth="6"
                                    strokeLinecap="round"
                                    strokeMiterlimit="10"
                                    x1="95.8"
                                    y1="38"
                                    x2="34.4"
                                    y2="92.2"
                                />
                            </CrossIcon>
                        )}
                        <TestInfo>{numPassed} / {userSolution.length} Test Cases Passed</TestInfo>
                    </Wrapper>
                ) : (
                    <SpinnerWrapper>
                        <ClimbingBoxLoader color="#36d7b7" size={50} />
                    </SpinnerWrapper>
                )}
            </SubmitModal.Body>
            <SubmitModal.Footer>
            </SubmitModal.Footer>
        </SubmitModal>
    )
}

export default SubmissionModal