import SolutionModal from "../SolutionModal";

const currentProblem = {
    "id": 1,
    "title": "Add Two Numbers",
    "explanations": {
        "javascript": [
            "The addition operator (+) adds two numbers together",
            "ES6 Arrow Syntax is used to define the function",
            "The return keyword can be omitted for single line arrow functions"
        ],
        "python": [
            "The addition operator (+) adds two numbers together",
            "The return keyword is used to return the result of the function"
        ]
    },
}

describe("<SolutionModal />", () => {
    it("mounts", () => {
        cy.mount(<SolutionModal showHint={true} currentProblem={currentProblem} />);
    })

    it("Renders the Problem Title", () => {
        cy.mount(<SolutionModal showHint={true} currentProblem={currentProblem} />);
        cy.findByText("Add Two Numbers").should("exist");
    })
})