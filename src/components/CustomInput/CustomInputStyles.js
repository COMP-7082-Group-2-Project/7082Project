import styled from "styled-components";

export const InputArea = styled.textarea`
    border: 2px solid #000000;
    border-radius: 0.375rem;
    width: 100%;
    z-index: 10;
    outline: none;
    box-shadow: 5px 5px 0px 0px rgba(0, 0, 0);
    padding: 0.5rem 1rem;
    margin-top: 0.5rem;
    background-color: #fff;
    transition: all 0.2s;
    resize: none;

    &:hover {
        box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.1),
                    0px 1px 2px 0px rgba(0, 0, 0, 0.06);
    }
`