import React, { useState, useEffect } from "react";
import { defineTheme } from "../../lib/defineTheme";
import { LanguageOptions } from "../../data/LanguageOptions";

import CodeEditor from "../CodeEditor";
import useKeyPress from "../../hooks/useKeyPress";
import LanguageDropdown from "../LanguageDropdown";
import ThemeDropdown from "../ThemeDropdown";
import OutputWindow from "../OutputWindow";
import CustomInput from "../CustomInput";
import OutputDetails from "../OutputDetails";

import {
    LandingNav, DropdownContainer, DropdownWrapper,
    LandingContainer, CodeWrapper, OutputContainer,
    InputWrapper, ExecuteButton
} from "./LandingStyles";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

const Landing = () => {
    // States, references
    const [code, setCode] = useState("// some comment");
    const [customInput, setCustomInput] = useState("");
    const [outputDetails, setOutputDetails] = useState(null);
    const [processing, setProcessing] = useState(null);
    const [theme, setTheme] = useState("cobalt");
    const [language, setLanguage] = useState(LanguageOptions[0]);

    // Key presses
    const enterPress = useKeyPress("Enter");
    const ctrlPress = useKeyPress("Control");

    const onSelectChange = (sl) => {
        console.log("Selected Option...", sl);
        setLanguage(sl);
    }

    // Key press handlers
    useEffect(() => {
        if (enterPress && ctrlPress) {
            console.log("enterPress", enterPress);
            console.log("ctrlPress", ctrlPress);
            handleCompile();
        }
    }, [ctrlPress, enterPress]);

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

    const handleCompile = () => {
        setProcessing(true);

        console.log(customInput);

        // Form data to send
        const formData = {
            language_id: language.id,
            source_code: btoa(code),
            command_line_arguments: customInput,
        }

        const options = {
            method: "POST",
            url: 'https://judge0-ce.p.rapidapi.com/submissions',
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
            setProcessing(false);
        })
    }

    const checkStatus = async (token) => {
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
    }

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
        console.log("Hello");
        console.log(theme);
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
            </DropdownContainer>
            <LandingContainer>
                <CodeWrapper>
                    <CodeEditor
                        code={code}
                        onChange={onChange}
                        language={language?.value}
                        theme={theme.value}
                    />
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
                    {outputDetails && <OutputDetails outputDetails={outputDetails} />}
                </OutputContainer>
            </LandingContainer>
        </>
    )
}

export default Landing