import Accordion from "../Accordion";

describe("<Accordion />", () => {
    it("mounts", () => {
        cy.mount(<Accordion />);
    });

    it("Renders at least one Accordion item", () => {
        cy.mount(<Accordion />);

        // Check if Accordion has at least one child
        cy.get("#accordion").children().should("have.length.greaterThan", 1);
    })

    it("Toggle accordion displays correct image and text", () => {
        cy.mount(
            <Accordion id={1} explanations={
                {
                    "javascript": [
                        "The addition operator (+) adds two numbers together",
                        "ES6 Arrow Syntax is used to define the function",
                        "The return keyword can be omitted for single line arrow functions"
                    ],
                    "python": [
                        "The addition operator (+) adds two numbers together",
                        "The return keyword is used to return the result of the function"
                    ]
                }
            } />
        );

        // Click the toggle (second child of accordion)
        cy.get("#accordion").children().eq(1).click();

        // Select the code image from the expanded toggle
        const codeImage = cy.get("#code-image");

        // Check if the image and explanation is correct based on the alt text and text content
        codeImage.should("have.attr", "alt", "JavaScript Challenge Solution");

        // Check if the explanation list has the correct text
        cy.findByText("The addition operator (+) adds two numbers together").should("exist");
    })
});