import React, { useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import {
    AccordionSection, AccordionContainer, SolutionHeading,
    Wrapper, Heading, Body, Span, Dropdown, CodeImage,
    NavWrapper, DotsWrapper, Dot, ExplanationList
} from "./AccordionStyles";
import { IconContext } from "react-icons";

const Accordion = ({ id, explanations }) => {
    // States, references
    const [clicked, setClicked] = useState(null);

    // Constants
    const headings = ["JavaScript", "Python"]

    // Method to reveal the content
    const toggle = idx => setClicked(clicked === idx ? null : idx);

    return (
        <>
            <IconContext.Provider value={{ color: '#00ffb9', size: '25px' }}>
                <AccordionSection>
                    <AccordionContainer data-testid="accordion">
                        <SolutionHeading>Example Solutions</SolutionHeading>
                        {headings.map((heading, idx) => {
                            return (
                                <React.Fragment key={idx}>
                                    <Wrapper onClick={() => toggle(idx)}>
                                        <Heading>{heading}</Heading>
                                        <Span>
                                            {clicked === idx ? <FiMinus /> : <FiPlus />}
                                        </Span>
                                    </Wrapper>
                                    {clicked === idx ? (
                                        <Dropdown>
                                            <Body>
                                                <NavWrapper>
                                                    <DotsWrapper>
                                                        <Dot />
                                                        <Dot />
                                                        <Dot />
                                                    </DotsWrapper>
                                                </NavWrapper>

                                                <CodeImage
                                                    data-testid="code-image"
                                                    src={require(`../../assets/images/${id}-${heading}.png`)}
                                                    alt={`${heading} Challenge Solution`} />
                                            </Body>

                                            <ExplanationList>
                                                {explanations[heading.toLowerCase()].map((point, idx) => {
                                                    return (
                                                        <li key={idx}>
                                                            {point}
                                                        </li>
                                                    )
                                                })}
                                            </ExplanationList>
                                        </Dropdown>
                                    ) : null}
                                </React.Fragment>
                            )
                        })}
                    </AccordionContainer>
                </AccordionSection>
            </IconContext.Provider>
        </>
    )
}

export default Accordion