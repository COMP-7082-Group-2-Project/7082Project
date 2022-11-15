import SubmissionModal from "../SubmissionModal";

// Test variables
const expectedOutput = "1\n2\n3";
const correctUserSolution = ["1", "2", "3"];
const incorrectUserSolution = [1, 2, 4];

describe("<SubmissionModal />", () => {
    beforeEach(() => {
        cy.viewport(1920, 1080);
    })

    it("mounts", () => {
        cy.mount(
            <SubmissionModal submitting={true} />
        );
    });

    it("Renders the Spinner", () => {
        cy.mount(
            <SubmissionModal submitting={true} />
        );

        cy.get("[data-cy=spinner]").should("exist");
    })

    it("Renders the Checkmark when the user passes all tests", () => {
        cy.mount(
            <SubmissionModal
                submitting={true}
                expectedOutput={expectedOutput}
                userSolution={correctUserSolution} />
        );

        cy.get("[data-cy=checkmark]").should("exist");
    })

    it("Renders the Cross when the user fails one or more tests", () => {
        cy.mount(
            <SubmissionModal
                submitting={true}
                expectedOutput={expectedOutput}
                userSolution={incorrectUserSolution} />
        );

        cy.get("[data-cy=cross]").should("exist");
    })

    it("Shows Submitting... when the Spinner is displayed", () => {
        cy.mount(
            <SubmissionModal submitting={true} />
        );

        cy.findByText("Submitting...").should("exist");
    })

    it("Shows Challenge Passed! when the Checkmark is displayed", () => {
        cy.mount(
            <SubmissionModal
                submitting={true}
                expectedOutput={expectedOutput}
                userSolution={correctUserSolution} />
        );

        cy.findByText("Challenge Passed!").should("exist");
    })

    it("Shows Challenge Failed. Try Again! when the Cross is displayed", () => {
        cy.mount(
            <SubmissionModal
                submitting={true}
                expectedOutput={expectedOutput}
                userSolution={incorrectUserSolution} />
        );

        cy.findByText("Challenge Failed. Try Again!").should("exist");
    })

    it("All elements are animated", () => {
        cy.mount(
            <SubmissionModal
                submitting={true}
                expectedOutput={expectedOutput}
                userSolution={incorrectUserSolution} />
        );

        cy.get("[data-cy=cross]").should("have.class", "animate__animated");
        cy.get("button").should("have.class", "animate__animated");
    })
});