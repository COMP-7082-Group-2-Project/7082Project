import OutputDetails from "../OutputDetails";

describe("<OutputDetails />", () => {
    it("mounts", () => {
        cy.mount(<OutputDetails />);
    })

    it("Renders the Status, Memory, and Time", () => {
        cy.mount(<OutputDetails />);
        
        cy.findByText("Status:").should("exist");
        cy.findByText("Memory:").should("exist");
        cy.findByText("Time:").should("exist");
    })
})