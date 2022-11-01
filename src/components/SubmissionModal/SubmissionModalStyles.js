import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import { BsCheck2Circle } from "react-icons/bs";

export const SubmitModal = styled(Modal)`
    & > * {
        width: 70vw !important;
        max-width: 1200px !important;
    }

    .modal-content {
        background-color: #232323;
        color: #f3f3f3;
    }
`;

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    /* gap: 5rem; */
    min-height: 440px;
`;

export const CheckmarkIcon = styled(BsCheck2Circle)`
    font-size: 10rem;
    color: #36d7b7;
    margin-right: 5rem;
`

export const TestInfo = styled.p`
    font-size: 2rem;
    font-weight: 600;
    color: #f3f3f3;
`;

export const SpinnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
`;

export const CrossIcon = styled.svg`
    width: 15rem;
`;

export const NextButton = styled.button`
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #36d7b7;
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
`;

export const RedoButton = styled.button`
    display: inline-block;
    padding: 0.5rem 1rem;
    /* Red background color */
    background-color: #d06079;
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
`;