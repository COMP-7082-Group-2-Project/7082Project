import React from "react";
import { render, fireevent , screen } from "@testing-library/react";
import Accordian from "./index.js";


  const explanation = {"test1":"Hello", "test2":"There"};


//on render
test("accordian on render", () => {
    render(<Accordian id={2} explanations={explanation}/>);
    expect(screen.getByText(/Example Solutions/i));
});

// //Toggle
test("accordian on toggle", () => {
    render(<Accordian id={2} explanations={explanation}/>);
    expect(screen.getByText(/Example Solutions/i));
});

// //becomes what it should be toggled to
// test("accordian toggle expected"), () => {
//     render(<Accordian />);


// }