import styled from "styled-components";
import Modal from "react-bootstrap/Modal";

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
`;

export const CountWrapper = styled.div`
    font-size: 2rem;
    font-weight: 700;
`;

export const CountInfo = styled.span`
    margin-left: 1rem;
`;

export const SpinnerWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
`;