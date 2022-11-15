import InfoSection from "../InfoSection";

describe("<InfoSection />", () => {
    beforeEach(() => {
        cy.viewport(1920, 1080)
    })

    it("mounts", () => {
        cy.mount(<InfoSection />);
    })

    it("Renders the Programming Language Images", () => {
        cy.mount(<InfoSection />);
        cy.get("[data-cy=language-list] svg").should("have.length", 5);
    })
})