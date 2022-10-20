import React, { useState, useEffect, useCallback } from "react";
import { defineTheme } from "../../lib/defineTheme";
import { LanguageOptions } from "../../data/LanguageOptions";
import { javascriptDefault } from "../../lib/initialCode";

import CodeEditor from "../CodeEditor";
import useKeyPress from "../../hooks/useKeyPress";
import LanguageDropdown from "../LanguageDropdown";
import ThemeDropdown from "../ThemeDropdown";
import DifficultyDropdown from "../DifficultyDropdown";
import OutputWindow from "../OutputWindow";
import CustomInput from "../CustomInput";
import OutputDetails from "../OutputDetails";

import {
    LandingNav, LandingContainer, DropdownContainer,
    DropdownWrapper, MainContainer, CodeWrapper,
    OutputContainer, InputWrapper, ExecuteButton,
    FreeCodeWrapper
} from "./LandingStyles";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import InfoSection from "../InfoSection";
import Form from "react-bootstrap/Form";

const oldDefault = `/**
* Problem: Binary Search: Search a sorted array for a target value.
*/

// Time: O(log n)
const binarySearch = (arr, target) => {
    return binarySearchHelper(arr, target, 0, arr.length - 1);
}

const binarySearchHelper = (arr, target, start, end) => {
    if (start > end) {
        return false;
    }

    let mid = Math.floor((start + end) / 2);

    if (arr[mid] === target) {
        return mid;
    }

    if (arr[mid] < target) {
        return binarySearchHelper(arr, target, mid + 1, end);
    }

    if (arr[mid] > target) {
        return binarySearchHelper(arr, target, start, mid - 1);
    }
};

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const target = 5;
console.log(binarySearch(arr, target));`;

const Landing = () => {
    // States, references (dev branch)
    const [code, setCode] = useState(javascriptDefault);
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState(null);
    const [theme, setTheme] = useState("cobalt");
    const [language, setLanguage] = useState(LanguageOptions[0]);
    const [expectedOutput, setExpectedOutput] = useState("");
    const [freeMode, setFreeMode] = useState(true);
    const [challengeProblems, setChallengeProblems] = useState([]);
    const [startComments, setStartComments] = useState({});
    const [endComments, setEndComments] = useState({});
    const [currentProblem, setCurrentProblem] = useState(null);
    const [difficulty, setDifficulty] = useState(null);

    // Get challenge problems from backend on page load
    useEffect(() => {
        axios.get("https://alkarimj1997.github.io/data/challenge_problems.json").then((res) => {
            setChallengeProblems(res.data.problems);
            setStartComments(res.data.start_comment);
            setEndComments(res.data.end_comment);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    // Compare output of user's code to expected output
    useEffect(() => {
        if (!outputDetails) return;
        if (!expectedOutput) return;

        // Regex to remove only newlines at the start and end of a string
        const regex = /^\s+|\s+$/g;

        if (atob(outputDetails.stdout).replace(regex, "") === expectedOutput) {
            console.log("Correct!");
        }
    }, [outputDetails, expectedOutput]);

    // Key presses
    const enterPress = useKeyPress("Enter");
    const ctrlPress = useKeyPress("Control");

    const onSelectChange = async (sl) => {
        console.log("Selected Option...", sl);
        setLanguage(sl);

        // If user is not in challenge mode, do nothing
        if (freeMode) return;

        const start = startComments[sl.value];
        const end = endComments[sl.value];

        // Change code to provided code for new language
        const { problem_statement, body } = currentProblem;

        setCode(`${start}\n${problem_statement.join("\n")}\n${end}\n\n${body[sl.value].join("\n")}`);
    }

    const onChange = (action, data) => {
        switch (action) {
            case "code":
                setCode(data);
                break;
            default:
                console.error("Case not handled!", action, data);
                break;
        }
    }

    const onDifficultyChange = (sd) => {
        console.log("Selected Difficulty...", sd);
        setDifficulty(sd.value);

        // Set free mode to false and enable checkbox
        setFreeMode(false);

        const start = startComments[language.value];
        const end = endComments[language.value];

        // Filter by language and difficulty (without mutating original array)
        const filteredProblems = challengeProblems.filter(p => {
            return p.languages.includes(language.value) && p.difficulty.toLowerCase() === sd.value
        });

        // Select random problem
        const randomProblem = filteredProblems[Math.floor(Math.random() * filteredProblems.length)];

        // Set current problem
        setCurrentProblem(randomProblem);

        // Set code to random problem, and answer to expected output
        const { problem_statement, body } = randomProblem;

        setCode(`${start}\n${problem_statement.join("\n")}\n${end}\n\n${body[language.value].join("\n")}`);
        setExpectedOutput(randomProblem.answer.join("\n"));
    }

    const checkStatus = useCallback(async (token) => {
        const options = {
            method: "GET",
            url: "https://judge0-ce.p.rapidapi.com/submissions/" + token,
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY
            }
        }

        try {
            let response = await axios.request(options);
            let statusId = response.data.status?.id;

            // Check for status
            if (statusId === 1 || statusId === 2) {
                // Still processing (try again)
                setTimeout(() => {
                    checkStatus(token);
                }, 2000)

                return;
            } else {
                setProcessing(false);
                setOutputDetails(response.data);
                showSuccessToast("Compiled Successfully!");
                console.log("response.data", response.data);
                return;
            }
        } catch (error) {
            console.log("err", error);
            setProcessing(false);
            showErrorToast();
        }
    }, []);

    const handleCompile = useCallback(async () => {
        setProcessing(true);

        console.log(code);

        // Form data to send
        const formData = {
            language_id: language.id,
            source_code: btoa(unescape(encodeURIComponent(code))),
            command_line_arguments: customInput,
        }

        const options = {
            method: "POST",
            url: "https://judge0-ce.p.rapidapi.com/submissions",
            params: { base64_encoded: "true", fields: "*" },
            headers: {
                "content-type": "application/json",
                "Content-Type": "application/json",
                "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
                "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY
            },
            data: formData
        }

        axios.request(options).then((response) => {
            console.log("res.data", response.data);

            // Response received (check status)
            const token = response.data.token;
            checkStatus(token);
        }).catch((error) => {
            console.log(error.response ? error.response.data : error);
            console.log("status", error.response.status);

            // Check requests quota
            if (error.response.status === 429) {
                console.log("Quota exceeded!");
            }

            setProcessing(false);
        })
    }, [language, code, customInput, checkStatus]);

    // Key press handlers
    useEffect(() => {
        if (enterPress && ctrlPress) {
            console.log("enterPress", enterPress);
            console.log("ctrlPress", ctrlPress);
            handleCompile();
        }
    }, [ctrlPress, enterPress, handleCompile]);

    function handleThemeChange(th) {
        const theme = th;

        console.log("theme...", theme);

        // If theme is a default theme, set it
        if (["light", "vs-dark"].includes(theme.value)) {
            setTheme(theme);
            return;
        }

        defineTheme(theme.value).then((_) => setTheme(theme));
    }

    // Set default theme when page loads
    useEffect(() => {
        defineTheme("oceanic-next").then((_) => {
            setTheme({ value: "oceanic-next", label: "Oceanic Next" });
        });
    }, []);

    // Toasts
    const showSuccessToast = (msg) => {
        toast.success(msg || `Compiled successfully!`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const showErrorToast = (msg) => {
        toast.error(msg || `Something went wrong! Please try again`, {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <LandingNav></LandingNav>
            <LandingContainer>
                <DropdownContainer>
                    <DropdownWrapper>
                        <LanguageDropdown onSelectChange={onSelectChange} />
                    </DropdownWrapper>
                    <DropdownWrapper>
                        <ThemeDropdown
                            handleThemeChange={handleThemeChange}
                            theme={theme}
                        />
                    </DropdownWrapper>
                    <DropdownWrapper>
                        <DifficultyDropdown onDifficultyChange={onDifficultyChange} language={language?.value} freeMode={() => freeMode ? true : false} />
                    </DropdownWrapper>

                    <FreeCodeWrapper>
                        <Form.Check type="switch" label="Free Code" value={freeMode} onChange={() => !freeMode && setFreeMode(!freeMode)} checked={freeMode} disabled={freeMode} />
                    </FreeCodeWrapper>
                </DropdownContainer>

                <MainContainer>
                    <CodeWrapper>
                        <Tabs defaultActiveKey="editor" className="mb-3" justify>
                            <Tab eventKey="editor" title="Editor">
                                <CodeEditor
                                    key={`editor-${difficulty}-${language.value}`}
                                    code={code}
                                    onChange={onChange}
                                    language={language?.value}
                                    theme={theme.value}
                                    mode={freeMode ? "free" : "challenge"}
                                />
                            </Tab>
                            <Tab eventKey="manual" title="How To">
                                <InfoSection />
                            </Tab>
                        </Tabs>
                    </CodeWrapper>

                    <OutputContainer>
                        <OutputWindow outputDetails={outputDetails} />
                        <InputWrapper>
                            <CustomInput
                                customInput={customInput}
                                setCustomInput={setCustomInput}
                            />
                            <ExecuteButton onClick={handleCompile} disabled={!code}>
                                {processing ? "Processing..." : "Compile and Execute"}
                            </ExecuteButton>
                        </InputWrapper>
                        {outputDetails &&
                            <OutputDetails outputDetails={outputDetails} />}
                    </OutputContainer>
                </MainContainer>
            </LandingContainer>
        </>
    )
}

export default Landing