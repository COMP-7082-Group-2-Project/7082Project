import styled from "styled-components";

export const LandingNav = styled.div`
    background-image: linear-gradient(to right, #ec4899, #ef4444, #f59e0b);
    width: 100%;
    height: 1rem;
`

export const DropdownContainer = styled.div`
    display: flex;
`

export const DropdownWrapper = styled.div`
    padding: 0.5rem 1rem;
`

export const LandingContainer = styled.div`
    display: flex;
    align-items: flex-start;
    padding: 1rem;
    margin-left: 1rem;
`

export const CodeWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-end;
    width: 100%;
    height: 100%;
`

export const OutputContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    width: 30%;
`

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`

export const ExecuteButton = styled.button`
    padding: 0.5rem 1rem;
    background-color: #fff;
    border: 2px solid #000000;
    border-radius: 0.375rem;
    margin-top: 1rem;
    box-shadow: 5px 5px 0px 0px rgba(0, 0, 0);
    z-index: 10;
    transition: all 0.2s;
    flex-shrink: 0;
    opacity: ${({ code }) => code ? "0.5" : "1"};

    &:hover {
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
                    0px 1px 2px 0px rgba(0, 0, 0, 0.06);
    }
`