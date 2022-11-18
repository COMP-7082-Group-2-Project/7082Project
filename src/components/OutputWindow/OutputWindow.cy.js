import OutputWindow from "../OutputWindow";
import { runtimeBase64 } from "../../data/errorTest";

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
        cy.findByText("Hello World!").should("exist");
    })

    it("Displays Compilation Error", () => {
        cy.mount(
            <OutputWindow outputDetails={
                {
                    "status": {
                        "id": 6,
                        "description": "Compilation Error",
                    },
                    "stdout": "",
                    "stderr": "",
                    "compile_output": "Q29tcGlsYXRpb24gRXJyb3I=",
                    "message": null,
                    "time": "0.000",
                    "memory": "0"
                }
            } />
        );

        cy.findByText("Compilation Error").should("exist");
        cy.findByText("Compilation Error").should("have.css", "color", "rgb(239, 68, 68)");
    })

    it("Displays Accepted", () => {
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

        cy.findByText("Hello World!").should("exist");
        cy.findByText("Hello World!").should("have.css", "color", "rgb(16, 185, 129)");
    })

    it("Displays Time Limit Exceeded", () => {
        cy.mount(
            <OutputWindow outputDetails={
                {
                    "status": {
                        "id": 5,
                        "description": "Time Limit Exceeded",
                    },
                    "stdout": "",
                    "stderr": "",
                    "compile_output": "",
                    "message": null,
                    "time": "0.000",
                    "memory": "0"
                }
            } />
        );

        cy.findByText("Time Limit Exceeded").should("exist");
        cy.findByText("Time Limit Exceeded").should("have.css", "color", "rgb(239, 68, 68)");
    })

    it("Displays Runtime Error", () => {
        cy.mount(
            <OutputWindow outputDetails={
                {
                    "status": {
                        "id": 11,
                        "description": "Runtime Error (NZEC)",
                    },
                    "stdout": null,
                    "stderr": runtimeBase64,
                    "compile_output": null,
                    "message": "RXhpdGVkIHdpdGggZXJyb3Igc3RhdHVzIDE=",
                    "time": "0.037",
                    "memory": "13868"
                }
            } />
        );

        cy.get("[data-cy=output-screen]").should("contain.text", "ReferenceError: a is not defined");
        cy.get("[data-cy=output-screen] pre").should("have.css", "color", "rgb(239, 68, 68)");
    })
})