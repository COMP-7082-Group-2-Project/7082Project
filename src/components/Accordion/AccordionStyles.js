import styled from "styled-components";
import { FaCode } from "react-icons/fa";

export const AccordionSection = styled.div`
    display: flex;
    flex-direction: column;
`;

export const AccordionContainer = styled.div`
    box-shadow: 2px 10px 35px 1px rgba(153, 153, 153, 0.3);
`;

export const SolutionHeading = styled.h3`
    background: #272727;
    color: #00ffb9;
    margin: 0;
    padding: 1rem 2rem;
    border-radius: 10px 10px 0 0;
`;

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #272727;
    width: 100%;
    text-align: center;
    color: #fff;
    cursor: pointer;
    user-select: none;

    &:last-child {
        border-radius: 0 0 10px 10px;
    }
`;

export const Heading = styled.h1`
    font-size: 1.75rem;
    padding: 2rem;
`;

export const Span = styled.span`
    margin-right: 1.5rem;
`;

export const Dropdown = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100px;
    background: #1c1c1c;
    color: #00ffb9;
    border-bottom: 1px solid #00ffb9;
    border-top: 1px solid #00ffb9;
    padding: 2rem 1rem;
`;

// Dropdown content
export const Body = styled.div`
    display: flex;
    flex-direction: column;
    width: 95%;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 10px;
    -webkit-box-shadow: -1px 1px 3px -1px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: -1px 1px 3px -1px rgba(0, 0, 0, 0.75);
    box-shadow: -1px 1px 3px -1px rgba(0, 0, 0, 0.75);
`;

export const CodeImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 0 0 10px 10px;
`;

export const NavWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #eaeaea;
    border-radius: 10px 10px 0 0;
    border-bottom: 1px solid #c1c1c1;
`;

export const DotsWrapper = styled.div`
    display: flex;
    padding: 10px;
`;

export const Dot = styled.div`
    width: 15px;
    height: 15px;
    margin: 5px;
    border-radius: 50%;
    -webkit-box-shadow: -1px 1px 3px -1px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: -1px 1px 3px -1px rgba(0, 0, 0, 0.75);
    box-shadow: -1px 1px 3px -1px rgba(0, 0, 0, 0.75);

    &:nth-child(1) {
        background-color: #fc6058;
    }

    &:nth-child(2) {
        background-color: #fec02f;
    }

    &:nth-child(3) {
        background-color: #2aca3e;
    }
`;

export const ExplanationList = styled.ul`
    background-color: #fff;
    color: #37373c;
    padding: 1rem 2rem;
    margin-top: 1rem;
    border-radius: 10px;
    font-size: 1.2rem;

    li:not(:last-child) {
        margin-bottom: 1rem;
    }
`;