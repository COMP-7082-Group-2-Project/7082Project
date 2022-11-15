import OutputWindow from "../OutputWindow";

describe("<OutputWindow />", () => {
    it("mounts", () => {
        cy.mount(<OutputWindow />);
    })

    it("Displays Code Output", () => {
        cy.mount(
            <OutputWindow outputDetails={
                {
                    "status": {
                        "id": 3,
                        "description": "Accepted",
                        "category": "Accepted"
                    },
                    "stdout": "SGVsbG8gV29ybGQh",
                    "stderr": "",
                    "compile_output": "",
                    "message": null,
                    "time": "0.000",
                    "memory": "0"
                }
            } />
        );

        cy.findByText("Output").should("exist");
    })
})