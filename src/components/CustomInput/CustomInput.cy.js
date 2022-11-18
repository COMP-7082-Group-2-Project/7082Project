import CustomInput from "../CustomInput";

describe("<CustomInput />", () => {
    it("mounts", () => {
        cy.mount(<CustomInput />);
    })

    it("Check that value passed to CustomInput is displayed", () => {
        cy.mount(<CustomInput customInput="Hello World" />);
        cy.get("textarea").should("have.value", "Hello World");
    })

    it("Check that typing in CustomInput changes value", () => {
        cy.mount(<CustomInput />);
        cy.get("textarea").type("Hello World");
        cy.get("textarea").should("have.value", "Hello World");
    })
})