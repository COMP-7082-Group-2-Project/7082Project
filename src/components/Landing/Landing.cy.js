import Landing from "../Landing";

describe("<Landing />", () => {
    beforeEach(() => {
        cy.viewport(1920, 1080)
    })

    it("mounts", () => {
        cy.mount(<Landing />);
    });

    it("Check if Default theme is loaded", () => {
        cy.mount(<Landing />);
        cy.findByText("Oceanic Next").should("exist");
    });

    it("Check if Submit button renders", () => {
        cy.mount(<Landing />);
        cy.get("img[alt='Submit']").should("exist");
    });

    it("Check if Copy To Clipboard button renders", () => {
        cy.mount(<Landing />);
        cy.get("#clipboard-button").should("exist");
    });

    // TODO: Check if Copy To Clipboard button works
    it("Check if Copy To Clipboard button works", () => {
        cy.mount(<Landing />);

        cy.get("#clipboard-button").realClick();

        // Access clipboard
        cy.window().then((win) => {
            win.navigator.clipboard.readText().then((text) => {
                expect(text).to.contain("Welcome to EdiCode!");
            });
        });
    });

    it.only("Check if Code Compiled", () => {
        cy.mount(<Landing />);

        // Go to last line of editor
        for (let i = 0; i < 11; i++) {
            cy.get("#code-editor textarea").type("{downArrow}");
        }

        // Type in editor
        cy.get("#code-editor textarea").type("console.log('Hello World!')");

        cy.wait(1000);

        // Click on the Compile and Execute button
        cy.get("[data-cy=execute-button]").click();

        // Check if code successfully compiled
        cy.wait(4000).findByText("Hello World!").should("exist");
    })

    it("Check if Solution Button renders", () => {
        cy.mount(<Landing />);
        cy.get("#solution-button").should("exist");
    });

    it("Check if Solution Button brings up Example Solutions", () => {
        cy.mount(<Landing />);

        // Change difficulty so that solution button is enabled
        cy.get("#difficulty-select").type("{enter}");

        // Wait for solution button to be enabled
        cy.get("#solution-button").should("not.be.disabled");

        // Click on solution button
        cy.get("#solution-button").click();

        // Check if example solutions are rendered
        cy.findByText("Example Solutions").should("exist");
    })

    it("Press Ctrl + Enter to submit code", () => {
        cy.mount(<Landing />);
        cy.get("textarea").type("{ctrl}{enter}");

        // Check if Processing... has started
        cy.findByText("Processing...").should("exist");
    });

    it("Check if Submit button submits code", () => {
        cy.mount(<Landing />);

        // Change difficulty so that submit button is enabled
        cy.get("#difficulty-select").type("{enter}");

        cy.get("img[alt='Submit']").click();

        // Check if Submitting... has started
        cy.findByText("Submitting...").should("exist");
    });

    it("Check if Code Editor value changes when going to challenge mode", () => {
        cy.mount(<Landing />);

        // Change difficulty
        cy.get("#difficulty-select").type("{enter}");

        // Check if Code Editor now has "Problem:" in it
        cy.get("textarea").should("contain.value", "Problem:");
    })

    it("Check if Code Editor value changes when going to free mode", () => {
        cy.mount(<Landing />);

        // Change difficulty to enter challenge mode
        cy.get("#difficulty-select").type("{enter}");

        // Wait for switch to be enabled
        cy.get("[data-cy=switch]").should("not.be.disabled");

        // Click on switch
        cy.get("[data-cy=switch]").click();

        // Check if Code Editor now has "Welcome to EdiCode" in it
        cy.get("textarea").should("contain.value", "Welcome to EdiCode");
    })

    it("Check if Code Editor value changes when switching languages", () => {
        cy.mount(<Landing />);

        // Change difficulty to enter challenge mode
        cy.get("#difficulty-select").type("{enter}");

        // Change language
        cy.get("#language-select").type("{downArrow}{downArrow}{downArrow}{downArrow}{enter}");

        // Check if Code Editor now has "#include <stdio.h>" in it
        cy.findByText("#include <stdio.h>").should("exist");
    })
});