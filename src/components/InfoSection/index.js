import React from "react";
import {
    InfoContainer, InfoWrapper, WelcomeHeader,
    CodeIcon, WelcomeHeading, WelcomeText,
    LanguageSection, MainText, LanguageList,
    LanguageItem, JavaScriptIcon, PythonIcon,
    CPlusPlusIcon, JavaIcon, ThemeSection,
    DifficultySection, ButtonInfoWrapper, SkipIcon,
    HintIcon, FreeWrite, CheckBoxWrapper,
    RightArrowIcon, SubmitIcon
} from "./InfoSectionStyles";

import SubmitImage from "../../assets/images/submit.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGolang } from "@fortawesome/free-brands-svg-icons";

import Form from "react-bootstrap/Form";

const InfoSection = () => {
    return (
        <InfoContainer>
            <InfoWrapper data-testid="info-section">
                <WelcomeHeader>
                    <WelcomeHeading>Welcome to EdiCode!</WelcomeHeading>
                    <CodeIcon />
                </WelcomeHeader>
                <WelcomeText>
                    A free, open-source, online code editor for learning and practicing programming. Tired of setting up buggy IDEs? EdiCode is the perfect solution for you! Just select a language, a difficulty level, and
                    start improving your coding skills today!
                </WelcomeText>
                <LanguageSection>
                    <MainText>
                        We support all the popular programming languages, including:
                    </MainText>
                    <LanguageList data-cy="language-list">
                        <LanguageItem>JavaScript<JavaScriptIcon /></LanguageItem>
                        <LanguageItem>Python<PythonIcon /></LanguageItem>
                        <LanguageItem>C++<CPlusPlusIcon /></LanguageItem>
                        <LanguageItem>Java<JavaIcon /></LanguageItem>
                        <LanguageItem>
                            Go <FontAwesomeIcon icon={faGolang} />
                        </LanguageItem>
                    </LanguageList>
                    <MainText>and more!</MainText>
                </LanguageSection>
                <ThemeSection>
                    <MainText>
                        As fellow developers, we know how important the little things are. EdiCode comes with a variety of themes to choose from, so you can code in style!
                        How YOU code is up to you!
                    </MainText>
                </ThemeSection>
                <DifficultySection>
                    <MainText>
                        We know that everyone learns at a different pace. That's why we've included a variety of difficulty levels for you to choose from.
                        Whether you're a beginner or an expert, EdiCode has something for you! And unlike other platforms like LeetCode, we offer
                        coding challenges in a variety of topics.
                    </MainText>
                </DifficultySection>

                <ButtonInfoWrapper>
                    <h3>Want a new challenge? Click</h3>
                    <SkipIcon />
                </ButtonInfoWrapper>
                <ButtonInfoWrapper>
                    <h3>Want to see our example solutions? Click</h3>
                    <HintIcon />
                </ButtonInfoWrapper>
                <ButtonInfoWrapper>
                    <h3>Ready to test your solution? Click</h3>
                    <SubmitIcon src={SubmitImage} alt="Submit HowTo" />
                </ButtonInfoWrapper>

                <FreeWrite>
                    <MainText>
                        Rather code on your own? No problem! EdiCode also offers a free-write mode.
                    </MainText>
                    <CheckBoxWrapper>
                        <Form>
                            <Form.Check type="switch" label="Free Code" disabled/>
                        </Form>
                        <RightArrowIcon />
                        <Form>
                            <Form.Check type="switch" label="Free Code" disabled checked/>
                        </Form>
                    </CheckBoxWrapper>
                </FreeWrite>
            </InfoWrapper>
        </InfoContainer>
    )
}

export default InfoSection