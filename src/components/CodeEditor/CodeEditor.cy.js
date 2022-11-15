import CodeEditor from "../CodeEditor";

describe("<CodeEditor />", () => {
    it("mounts", () => {
        cy.mount(<CodeEditor />);
    });

    it("Code Editor has Welcome Message", () => {
        cy.mount(<CodeEditor mode="free" />);
        cy.get("textarea").should("contain.value", "Welcome to EdiCode!");
    });
});