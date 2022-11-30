import React, { useState, useEffect, useCallback } from "react";
import { defineTheme } from "../../lib/defineTheme";
import { LanguageOptions } from "../../data/LanguageOptions";
import { languageSeparators, initialCode } from "../../lib/initialCode";

import CodeEditor from "../CodeEditor";
import useKeyPress from "../../hooks/useKeyPress";
import LanguageDropdown from "../LanguageDropdown";
import ThemeDropdown from "../ThemeDropdown";
import DifficultyDropdown from "../DifficultyDropdown";
import OutputWindow from "../OutputWindow";
import CustomInput from "../CustomInput";
import OutputDetails from "../OutputDetails";
import SolutionModal from "../SolutionModal";
import SubmissionModal from "../SubmissionModal";

import SubmitImage from "../../assets/images/submit.png";

import {
    LandingNav, LandingContainer, DropdownContainer,
    DropdownWrapper, MainContainer, CodeWrapper,
    OutputContainer, InputWrapper, ExecuteButton,
    FreeCodeWrapper, ButtonWrapper, SkipButton,
    HintButton, SubmitButton, Circle, ClipboardIcon
} from "./LandingStyles";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import InfoSection from "../InfoSection";
import Form from "react-bootstrap/Form";

// API functions
import { getCodeOutput, getCodeToken } from "../../api/ApiActions";

const Landing = () => {
    // States, references (dev branch)
    const [code, setCode] = useState(languageSeparators["javascript"][0] + initialCode + languageSeparators["javascript"][1]);
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState(null);
    const [theme, setTheme] = useState("cobalt");
    const [language, setLanguage] = useState(LanguageOptions[0]);
    const [filteredLanguages, setFilteredLanguages] = useState(null);
    const [expectedOutput, setExpectedOutput] = useState("");
    const [freeMode, setFreeMode] = useState(true);
    const [challengeProblems, setChallengeProblems] = useState([]);
    const [startComments, setStartComments] = useState({});
    const [endComments, setEndComments] = useState({});
    const [currentProblem, setCurrentProblem] = useState(null);
    const [difficulty, setDifficulty] = useState(null);
    const [userSolution, setUserSolution] = useState(null);
    const [showError, setShowError] = useState(false);

    // Conditional Rendering
    const [showHint, setShowHint] = useState(false);
    const [submitting, setSubmitting] = useState(false);

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

    // Set supported languages based on current problem
    useEffect(() => {
        if (!currentProblem) return;

        // Disable languages that are not supported by the problem
        const filteredLanguages = LanguageOptions.filter(l => {
            return currentProblem.languages.includes(l.value);
        });

        setFilteredLanguages(filteredLanguages);
    }, [currentProblem])

    // Show toast for successful compile
    useEffect(() => {
        if (!outputDetails) return;
        if (processing) return;
        if (submitting) return;

        showSuccessToast();
    }, [processing, outputDetails, submitting]);

    // Show error toast for failed compile
    useEffect(() => {
        if (submitting) return;
        if (!showError) return;

        showErrorToast();
    }, [submitting, showError])

    // Key presses
    const enterPress = useKeyPress("Enter");
    const ctrlPress = useKeyPress("Control");

    const onSelectChange = async (sl) => {
        console.log("Selected Option...", sl);
        setLanguage(sl);

        // If user is not in challenge mode, change code to default code
        if (freeMode) {
            if (!languageSeparators[sl.value]) {
                setCode(initialCode);
                return;
            }

            setCode(languageSeparators[sl.value][0] + initialCode + languageSeparators[sl.value][1]);
            return
        }

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

    const randomizeProblem = (start, end, difficulty) => {
        // Filter by language and difficulty (without mutating original array), don't include current problem
        const filteredProblems = challengeProblems.filter(p => {
            return p.languages.includes(language.value) && p.difficulty.toLowerCase() === difficulty && p.id !== currentProblem?.id;
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

    const onDifficultyChange = (sd) => {
        console.log("Selected Difficulty...", sd);
        setDifficulty(sd.value);

        // Set free mode to false and enable checkbox
        setFreeMode(false);

        const start = startComments[language.value];
        const end = endComments[language.value];

        // Set random coding challenge problem
        randomizeProblem(start, end, sd.value);
    }

    const checkStatus = useCallback(async (token) => {
        getCodeOutput(token).then((res) => {
            let statusId = res.status?.id;

            if (statusId === 1 || statusId === 2) {
                // Still processing (try again)
                setTimeout(() => {
                    checkStatus(token);
                }, 2000)

                return;
            }

            setProcessing(false);
            setOutputDetails(res);

            // Regex to remove only newlines at the start and end of a string
            const regex = /^\s+|\s+$/g;

            // Remove new lines, convert to ASCII, and split into test cases
            setUserSolution(atob(res.stdout).replace(regex, "").split("\n"));
        }).catch(err => {
            console.log("err", err);
            setProcessing(false);
            setSubmitting(false);
            setShowError(true);
        })
    }, []);

    const handleCompile = useCallback(async () => {
        // If user is already processing, do nothing
        if (processing) return;

        setProcessing(true);

        // Form data to send
        const formData = {
            language_id: language.id,
            source_code: btoa(unescape(encodeURIComponent(code))),
            command_line_arguments: customInput,
        }

        getCodeToken(formData).then((token) => {
            checkStatus(token);
        }).catch(err => {
            console.log(err);
            setProcessing(false);
        })
    }, [language, code, customInput, checkStatus, processing]);

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

    const handleSubmit = async () => {
        setSubmitting(true);

        // Form data to send
        const formData = {
            language_id: language.id,
            source_code: btoa(unescape(encodeURIComponent(code))),
            command_line_arguments: customInput,
        }

        getCodeToken(formData).then((token) => {
            checkStatus(token);
        }).catch(err => {
            console.log(err);
            setSubmitting(false);
        })
    }

    // Handle copying of code to clipboard
    const handleCopy = () => {
        navigator.clipboard.writeText(code).then(() => {
            showSuccessToast("Copied to Clipboard!");
        }).catch(err => {
            console.log(err);
            showErrorToast();
        })
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

    // Modal
    const showHintModal = () => {
        if (freeMode) return;

        setShowHint(true);
    }

    return (
        <div data-testid="landing-container">
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

            {/* Solution Modal */}
            <SolutionModal
                showHint={showHint}
                setShowHint={setShowHint}
                currentProblem={currentProblem} />

            {/* Submission Modal */}
            <SubmissionModal
                submitting={submitting}
                setSubmitting={setSubmitting}
                expectedOutput={expectedOutput}
                userSolution={userSolution}
                randomizeProblem={randomizeProblem}
                comments={{
                    start: startComments[language.value],
                    end: endComments[language.value]
                }}
                difficulty={difficulty}
                setOutputDetails={setOutputDetails} />

            <LandingNav></LandingNav>
            <LandingContainer>
                <DropdownContainer>
                    <DropdownWrapper>
                        <LanguageDropdown filteredLanguages={filteredLanguages} onSelectChange={onSelectChange} />
                    </DropdownWrapper>
                    <DropdownWrapper>
                        <ThemeDropdown
                            handleThemeChange={handleThemeChange}
                            theme={theme}
                        />
                    </DropdownWrapper>
                    <DropdownWrapper>
                        <DifficultyDropdown
                            onDifficultyChange={onDifficultyChange}
                            language={language?.value}
                            freeMode={freeMode} />
                    </DropdownWrapper>

                    <FreeCodeWrapper>
                        <Form.Check
                            data-cy="switch"
                            type="switch"
                            label="Free Code"
                            value={freeMode}
                            onChange={() => {
                                !freeMode && setFreeMode(!freeMode)
                                setFilteredLanguages(null);
                            }}
                            checked={freeMode}
                            disabled={freeMode} />
                    </FreeCodeWrapper>
                </DropdownContainer>

                <MainContainer>
                    <CodeWrapper>
                        <Tabs defaultActiveKey="editor" className="mb-3" justify>
                            <Tab eventKey="editor" title="Editor" className="editor-tab">
                                <CodeEditor
                                    key={`editor-${difficulty}-${language.value}-${freeMode}-${expectedOutput}`}
                                    code={code}
                                    onChange={onChange}
                                    language={language?.value}
                                    theme={theme.value}
                                    mode={freeMode ? "free" : "challenge"}
                                />
                                <Circle onClick={handleCopy} id="clipboard-button">
                                    <ClipboardIcon />
                                </Circle>
                            </Tab>
                            <Tab eventKey="manual" title="How To" className="howto-tab">
                                <InfoSection />
                            </Tab>
                        </Tabs>
                    </CodeWrapper>

                    <OutputContainer>
                        <OutputWindow processing={processing} outputDetails={outputDetails} />
                        <InputWrapper>
                            <CustomInput
                                customInput={customInput}
                                setCustomInput={setCustomInput}
                            />
                            <ButtonWrapper>
                                <SkipButton
                                    disabled={freeMode}
                                    onClick={() => randomizeProblem(startComments[language.value], endComments[language.value], difficulty)} />
                                <HintButton
                                    id="solution-button"
                                    disabled={freeMode}
                                    onClick={showHintModal}
                                />
                                <ExecuteButton
                                    data-testid="execute-button"
                                    data-cy="execute-button"
                                    onClick={handleCompile}
                                    disabled={!code}>
                                    {processing ? "Processing..." : "Compile and Execute"}
                                </ExecuteButton>
                                <SubmitButton src={SubmitImage} alt="Submit" disabled={freeMode} onClick={handleSubmit} />
                            </ButtonWrapper>
                        </InputWrapper>
                        {outputDetails &&
                            <OutputDetails outputDetails={outputDetails} />}
                    </OutputContainer>
                </MainContainer>
            </LandingContainer>
        </div>
    )
}

export default Landing