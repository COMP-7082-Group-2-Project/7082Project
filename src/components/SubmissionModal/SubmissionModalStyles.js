import styled from "styled-components";
import Modal from "react-bootstrap/Modal";

export const SubmitModal = styled(Modal)`
    & > * {
        width: 70vw !important;
        max-width: 1200px !important;
    }
`;

export const Spinner = styled.div``;

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