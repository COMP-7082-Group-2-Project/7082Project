import styled from "styled-components";

export const LandingNav = styled.div`
    background-image: linear-gradient(to right, #ec4899, #ef4444, #f59e0b);
    width: 100%;
    height: 1rem;
`

export const DropdownContainer = styled.div`
    display: flex;
    max-width: 1750px;
`

export const DropdownWrapper = styled.div`
    padding: 1rem;
`

export const LandingContainer = styled.div`
    width: 98%;
    margin: 0 auto;
`

export const MainContainer = styled.div`
    display: flex;
    gap: 2rem;
`

export const CodeWrapper = styled.div`
    width: 70%;
`

export const OutputContainer = styled.div`
    width: 30%;
    margin-top: 3.5rem;
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

export const FreeCodeWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    margin: 0.75rem 2rem 0 auto;
    font-size: 1.2rem;
`;