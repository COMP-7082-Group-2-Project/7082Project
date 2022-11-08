import styled from "styled-components";
import { MdShuffleOn } from "react-icons/md";
import { HiOutlineLightBulb } from "react-icons/hi";
import { FaRegClipboard } from "react-icons/fa";

export const LandingNav = styled.div`
    background-image: linear-gradient(to right, #ec4899, #ef4444, #f59e0b);
    width: 100%;
    height: 1rem;
`

export const DropdownContainer = styled.div`
    display: flex;
    max-width: 1750px;
`

export const DropdownWrapper = styled.div`
    padding: 1rem;
`

export const LandingContainer = styled.div`
    width: 98%;
    margin: 0 auto;
`

export const MainContainer = styled.div`
    display: flex;
    gap: 2rem;
`

export const CodeWrapper = styled.div`
    width: 70%;

    .editor-tab {
        position: relative;
    }
`

export const OutputContainer = styled.div`
    width: 30%;
    margin-top: 3.5rem;
`

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

export const ExecuteButton = styled.button`
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #fff;
    border: 2px solid #000000;
    border-radius: 0.375rem;
    /* margin-top: 1rem; */
    box-shadow: 5px 5px 0px 0px rgba(0, 0, 0);
    z-index: 10;
    transition: all 0.2s;
    flex-shrink: 0;
    opacity: ${({ code }) => code ? "0.5" : "1"};

    &:hover {
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
                    0px 1px 2px 0px rgba(0, 0, 0, 0.06);
    }
`

export const FreeCodeWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    margin: 0.75rem 2rem 0 auto;
    font-size: 1.2rem;
`;

export const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;
    gap: 2rem;

    & > svg {
        min-width: 50px;
    }

    @media screen and (min-width: 1600px) {
        width: 100%;
        justify-content: space-around;
        gap: 0;
    }
`;

export const SkipButton = styled(MdShuffleOn)`
    font-size: 3rem;
    color: #00b0ff;
    cursor: ${({ disabled }) => !disabled && "pointer"};
    opacity: ${({ disabled }) => disabled && "0.5"};
    user-select: none;
`;

export const HintButton = styled(HiOutlineLightBulb)`
    font-size: 3rem;
    color: #ffeb3b;
    cursor: ${({ disabled }) => !disabled && "pointer"};
    opacity: ${({ disabled }) => disabled && "0.5"};
    user-select: none;
`;

export const SubmitButton = styled.img`
    width: 3rem;
    height: 3rem;
    cursor: ${({ disabled }) => !disabled && "pointer"};
    opacity: ${({ disabled }) => disabled && "0.5"};
    user-select: none;
`

export const ClipboardIcon = styled(FaRegClipboard)`
    font-size: 3rem;
    z-index: 1;
`;

export const Circle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0.5rem;
    right: 1.5rem;
    background-color: #f3f3f3;
    padding: 0.5rem;
    border-radius: 50%;
    cursor: pointer;
`;