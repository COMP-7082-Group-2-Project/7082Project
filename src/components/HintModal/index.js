import React from "react";
import Modal from "react-bootstrap/Modal";

const HintModal = ({ showHint, setShowHint, currentProblem }) => {
    console.log(currentProblem);

    return (
        <>
            {currentProblem && (
                <Modal size="lg" show={showHint} onHide={() => setShowHint(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>{currentProblem.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Try using a for loop!</Modal.Body>
                    <Modal.Footer>
                        <button variant="secondary" onClick={() => setShowHint(false)}>
                            Close
                        </button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    )
}

export default HintModal