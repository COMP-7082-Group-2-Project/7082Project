import styled from "styled-components";

export const OutputError = styled.pre`
    padding: 0.25rem 0.5rem;
    color: #ef4444;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 400;
`

export const OutputSuccess = styled.pre`
    padding: 0.25rem 0.5rem;
    color: #10B981;
    font-size: 0.75rem;
    line-height: 1rem;
    font-weight: 400;
`

export const OutputTitle = styled.h1`
    --tw-gradient-from: #0f172a;
    --tw-gradient-to: #334155;

    --tw-gradient-stops: var(--tw-gradient-from),var(--tw-gradient-to,rgba(15,23,42,0));

    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 700;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    margin-bottom: 0.5rem;
    background-image: linear-gradient(to right,var(--tw-gradient-stops));
`

export const OutputScreen = styled.div`
    background: #1e293b;
    border-radius: 0.375rem;
    height: 14rem;
    width: 100%;
    font-weight: 400;
    line-height: 1.25rem;
    font-size: 0.875rem;
    color: #fff;
    overflow-y: auto;
`