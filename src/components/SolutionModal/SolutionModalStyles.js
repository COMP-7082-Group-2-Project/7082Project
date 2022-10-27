import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import { FaRegWindowClose } from "react-icons/fa";

export const SolutionModal = styled(Modal)`
    & > * {
        width: 70vw !important;
        max-width: 900px !important;
    }
`;

export const CloseIcon = styled(FaRegWindowClose)`
    font-size: 2rem;
    cursor: pointer;
`;