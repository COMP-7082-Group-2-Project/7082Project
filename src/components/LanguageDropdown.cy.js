import LanguageDropdown from "./LanguageDropdown";
import Landing from "./Landing";

describe("<LanguageDropdown />", () => {
    it("mounts", () => {
        cy.mount(
            <LanguageDropdown />
        );
    })

    it("Changes language", () => {
        cy.mount(
            <Landing />
        );

        cy.get("#language-select").type("{downArrow}{enter}");

        // Check if language is set to Assembly
        cy.findByText("Assembly (NASM 2.14.02)").should("exist");
    })
})