import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import { motion, useMotionValue, useTransform } from "framer-motion";
import {
    SubmitModal, Wrapper, CountWrapper,
    CountInfo, SpinnerWrapper
} from "./SubmissionModalStyles";

const SubmissionModal = ({ submitting, setSubmitting, expectedOutput, userSolution }) => {
    const [isChecked, setIsChecked] = useState(false);
    const [numPassed, setNumPassed] = useState(null);
    const pathLength = useMotionValue(0);
    const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

    useEffect(() => {
        if (!expectedOutput || !userSolution) return;

        // Compare every element in the expected output to the user's solution
        // If the user's solution is correct, increment numPassed
        let numCorrect = 0;

        expectedOutput.split("\n").forEach((answer, idx) => {
            if (answer === userSolution[idx]) numCorrect++;
        })

        setNumPassed(numCorrect);
    }, [expectedOutput, userSolution])

    useEffect(() => {
        if (!submitting) return;
        if (numPassed === null) return;

        // Wait 2 seconds then set isChecked to true
        setTimeout(() => {
            setIsChecked(true);
        }, 2000);
    }, [submitting, numPassed])


    const tickVariants = {
        pressed: (isChecked) => ({ pathLength: isChecked ? 0.85 : 0.2 }),
        checked: { pathLength: 1 },
        unchecked: { pathLength: 0 },
    };

    const boxVariants = {
        hover: { scale: 1.05, strokeWidth: 60 },
        pressed: { scale: 0.95, strokeWidth: 35 },
        checked: { stroke: "#07d410" },
        unchecked: { stroke: "#ddd", strokeWidth: 50 }
    };

    const resetModal = () => {
        setSubmitting(false);
        setIsChecked(false);
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
                        <motion.svg
                            initial={false}
                            animate={isChecked ? "checked" : "unchecked"}
                            whileHover="hover"
                            whileTap="pressed"
                            width="440"
                            height="440"
                            style={{ transform: "scale(0.3)" }}>
                            <motion.path
                                d="M 72 136 C 72 100.654 100.654 72 136 72 L 304 72 C 339.346 72 368 100.654 368 136 L 368 304 C 368 339.346 339.346 368 304 368 L 136 368 C 100.654 368 72 339.346 72 304 Z"
                                fill="transparent"
                                strokeWidth="50"
                                stroke="#FF008C"
                                variants={boxVariants}
                            />
                            <motion.path
                                d="M 0 128.666 L 128.658 257.373 L 341.808 0"
                                transform="translate(54.917 88.332) rotate(-4 170.904 128.687)"
                                fill="transparent"
                                strokeWidth="65"
                                stroke="hsl(0, 0%, 100%)"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                variants={tickVariants}
                                style={{ pathLength, opacity }}
                                custom={isChecked}
                            />
                            <motion.path
                                d="M 0 128.666 L 128.658 257.373 L 341.808 0"
                                transform="translate(54.917 68.947) rotate(-4 170.904 128.687)"
                                fill="transparent"
                                strokeWidth="65"
                                stroke="#7700FF"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                variants={tickVariants}
                                style={{ pathLength, opacity }}
                                custom={isChecked}
                            />
                        </motion.svg>
                        <CountWrapper>
                            <CountUp end={numPassed} duration={2} />
                            <CountInfo>/ {userSolution.length} Test Cases Passed</CountInfo>
                        </CountWrapper>
                    </Wrapper>
                ) : (
                    <SpinnerWrapper>
                        <ClimbingBoxLoader color="#36d7b7" size={50} />
                    </SpinnerWrapper>
                )}
            </SubmitModal.Body>
        </SubmitModal>
    )
}

export default SubmissionModal