import styled from "styled-components";
import { HiCode, HiOutlineLightBulb } from "react-icons/hi";
import { IoLogoJavascript, IoLogoPython } from "react-icons/io";
import { SiCplusplus, SiJava } from "react-icons/si";
import { MdShuffleOn } from "react-icons/md";
import { FaLongArrowAltRight } from "react-icons/fa";

export const InfoContainer = styled.div`
    min-height: 80vh;
    background-color: #232323;
    color: #fff;
    border-radius: 5px;
`;

export const InfoWrapper = styled.div`
    min-height: 80vh;
    padding-top: 1rem;
    width: 90%;
    margin: 0 auto;
`;

export const WelcomeHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
`;

export const CodeIcon = styled(HiCode)`
    font-size: 3rem;
`;

export const WelcomeHeading = styled.h1``;

export const WelcomeText = styled.p`
    font-size: 1.2rem;
`;

export const LanguageSection = styled.div`
    margin: 3rem 0;
`;

export const MainText = styled.p`
    font-size: clamp(1rem, 1vw, 1.3rem);
`;

export const LanguageList = styled.ul`
    display: flex;
    margin: 1rem 0;
    list-style: none;
    gap: 2rem;
`;

export const LanguageItem = styled.li`
    display: flex;
    align-items: center;

    & > svg {
        margin-left: 0.5rem;
        font-size: 2.5rem;
    }

    &:last-child > svg {
        margin-left: 1rem;
        margin-top: 0.4rem;
    }
`;

export const JavaScriptIcon = styled(IoLogoJavascript)``;

export const PythonIcon = styled(IoLogoPython)``;

export const CPlusPlusIcon = styled(SiCplusplus)``;

export const JavaIcon = styled(SiJava)``;

export const ThemeSection = styled.div`
    margin-bottom: 2rem;
`;

export const DifficultySection = styled.div`
    margin-bottom: 4rem;
`;

export const ButtonInfoWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
`;

export const SkipIcon = styled(MdShuffleOn)`
    font-size: 3rem;
    color: #00b0ff;
`;

export const HintIcon = styled(HiOutlineLightBulb)`
    font-size: 3rem;
    color: #ffeb3b;
`;

export const FreeWrite = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    background-color: #f1f1f1;
    color: #000;
    margin-top: 3rem;
    padding: 1rem;
    border-radius: 5px;
    box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.2);
`;

export const CheckBoxWrapper = styled.div`
    display: flex;
    align-items: center;

    & form {
        font-size: 1.5rem;
    }
`;

export const RightArrowIcon = styled(FaLongArrowAltRight)`
    font-size: 3rem;
    margin: 0 2rem;
    color: rgba(0, 0, 0, 0.8);
`;