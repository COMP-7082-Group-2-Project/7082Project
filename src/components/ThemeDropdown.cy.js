import ThemeDropdown from "./ThemeDropdown";
import Landing from "./Landing";

describe("<ThemeDropdown />", () => {
    it("mounts", () => {
        cy.mount(
            <ThemeDropdown />
        );
    })

    it("Changes theme", () => {
        cy.mount(
            <Landing />
        );

        cy.get("#theme-select").type("{enter}");

        // Check if theme is set to Active4D
        cy.findByText("Active4D").should("exist");
    })
})