import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    /* Reset box-sizing and default margin/padding */
    *, *::before, *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    body {
        min-height: 100vh;
        font-family: "Share Tech Mono", monospace;
    }
`