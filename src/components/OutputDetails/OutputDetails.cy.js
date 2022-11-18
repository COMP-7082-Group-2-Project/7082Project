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

    it("Renders Status, Memory, and Time with correct values and format", () => {
        cy.mount(<OutputDetails outputDetails={{
            "status": {
                description: "Accepted",
                id: 3
            },
            "memory": 8532,
            "time": "0.032"
        }} />);
        
        cy.findByText("Accepted").should("exist");
        cy.findByText("8532").should("exist");
        cy.findByText("0.032").should("exist");
    })
})