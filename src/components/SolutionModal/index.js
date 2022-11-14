import React from "react";
import Accordion from "../Accordion";
import { SolutionModal, CloseIcon } from "./SolutionModalStyles";

const HintModal = ({ showHint, setShowHint, currentProblem }) => {
    return (
        <div data-testid="solution-modal">
            {currentProblem && (
                <SolutionModal show={showHint} onHide={() => setShowHint(false)}>
                    <SolutionModal.Header>
                        <SolutionModal.Title>{currentProblem.title}</SolutionModal.Title>
                    </SolutionModal.Header>
                    <SolutionModal.Body>
                        <Accordion id={currentProblem.id} explanations={currentProblem.explanations} />
                    </SolutionModal.Body>
                    <SolutionModal.Footer>
                        <CloseIcon onClick={() => setShowHint(false)} />
                    </SolutionModal.Footer>
                </SolutionModal>
            )}
        </div>
    )
}

export default HintModal