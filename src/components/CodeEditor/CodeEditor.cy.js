import CodeEditor from "../CodeEditor";

describe("<CodeEditor />", () => {
    it("mounts", () => {
        cy.mount(<CodeEditor />);
    });

    it("Code Editor has Welcome Message", () => {
        cy.mount(<CodeEditor mode="free" />);
        cy.get("textarea").should("contain.value", "Welcome to EdiCode!");
    });

    it("Changes Code Editor content after typing", () => {
        cy.mount(<CodeEditor mode="free" />);
        cy.get("textarea")
        .click()
        .focused()
        .type('{ctrl}a')
        .type('{rightArrow}')
        .type("console.log('Hello World!')");
        cy.get("textarea").should("contain.value", "console.log('Hello World!')");
    })

    it("Check if Code Editor loads default language", () => {
        cy.mount(<CodeEditor mode="free" />);

        // Check if label's text is "javascript"
        cy.get("[data-cy=language-label]").should("contain.text", "javascript");
    });
});