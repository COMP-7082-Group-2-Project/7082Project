/**
 * As a programmer, I want to be able to write and execute code without setting up a local environment, so that I can follow tutorials and practice coding with ease.
 * As a programmer, I would like to practice different programming languages, so that I can diversify my skill set.
 * As a programmer, I want to be able to choose a challenge difficulty that suits my skill level so that I can challenge myself appropriately.
 * As a programmer, I want to be able to change the UI theme of my editor so that it suits my preferences
 * As a programmer, I want to be able to skip a specific coding challenge so that I can attempt a new problem
 * As a beginner programmer, I want to be able to ask for small hints to solve a specific challenge so that I can get on the right track.
 */

import '@testing-library/cypress/add-commands'

describe('Default Compile and Execute Test', () => {
  it('Open Webpage', () => {
    cy.visit('https://transcendent-tarsier-75164d.netlify.app/');
  })
  
  it('click on "Compile and Execute" button', () => {
    const compile_button = cy.findByText(/compile and execute/i);
    compile_button.click();
  })

  it('Check existance of output in window', () => {
    const output_window = cy.findByText(/output/i).next();
    output_window.should('have.text', 'ée');
  })
});

describe('Write Code, Compile and Execute, and See Output Test.', () => {
  it('Open Webpage', () => {
    cy.visit('https://transcendent-tarsier-75164d.netlify.app/');
  })

  // it('Write Javascript Console Log ("Hello World") into Code Editor', () => {
  //   // Reference: https://stackoverflow.com/questions/56617522/testing-monaco-editor-with-cypress

  //   cy.get('#editor')
  //   .click()
  //   // change subject to currently focused element
  //   .focused()
  //   .type('{ctrl}a')
  //   .type('{rightArrow}')
  //   .type('console.log("Hello World!");')
  //   .type('{enter}')
  // })
  
  // it('click on "Compile and Execute" button', () => {
  //   const compile_button = cy.findByText(/compile and execute/i);
  //   compile_button.click();
  // })

  // it('Check existance / correctness of output in window', () => {
  //   const output_window = cy.findByText(/output/i).next();
  //   output_window.should('have.text', 'Hello World!');
  // })
});

describe('Select Different Programming Language Test', () => {
  it('Open Webpage', () => {
    cy.visit('https://transcendent-tarsier-75164d.netlify.app/')
  })

  it('click on Language Dropdown "Javascript" by Default', () => {
    const dropdown = cy.get('.css-fjipxn-control').contains('JavaScript');
    dropdown.click({force: true});
  })

  it('click on Bash dropdown option', () => {
    const dropdown_option = cy.get("#react-select-2-listbox").contains('Bash');
    dropdown_option.trigger("onChange").click();
  })

  it('test Bash langauge selected', () => {
    const dropdown = cy.get('.css-qc6sy-singleValue').contains('Bash');
    dropdown.should('be.visible');
  })
}); 

describe('Choose Challenge Difficulty Test', () => {
  it('Open Webpage', () => {
    cy.visit('https://transcendent-tarsier-75164d.netlify.app/');
  })

  it('test that submit button is diabled', () => {
    cy.get('[alt="Submit"]').should('not.be.enabled');
  })

  it('click on Challenge Dropdown "Select Difficulty" by Default', () => {
    const dropdown = cy.get('#react-select-4-placeholder').contains('Select Difficulty');
    dropdown.click({force: true});
  })

  it('click on "Easy" dropdown option', () => {
    const dropdown_option = cy.get("#react-select-4-listbox").contains('Easy');
    dropdown_option.trigger("onChange").click();
  })

  it('test that submit button is enabled', () => {
    cy.get('[alt="Submit"]').should('not.be.disabled');
  })
});

describe('Change UI Theme Test', () => {
  it('Open Webpage', () => {
    cy.visit('https://transcendent-tarsier-75164d.netlify.app/');
  })

  it('click on Theme Dropdown "Oceanic Next" by Default', () => {
    const dropdown = cy.get('.css-fjipxn-control').contains('Oceanic');;
    dropdown.click({force: true});
  })

  it('click on "Blackboard" dropdown option', () => {
    const dropdown_option = cy.get("#react-select-3-listbox").contains('Blackboard');
    dropdown_option.trigger("onChange").click();
  })

  it('test Blackboard theme selected', () => {
    const dropdown = cy.get('.css-qc6sy-singleValue').contains('Blackboard');
    dropdown.should('be.visible');
  })
});

describe('Skip Challenge Problem Test', () => {
  it('Open Webpage', () => {
    cy.visit('https://transcendent-tarsier-75164d.netlify.app/');
  })

  // it('test that skip button is diabled', () => {
  //   cy.get('.sc-cabOPr kHQtFW');
  //   // cy.get('svg').get('.sc-cabOPr kHQtFW').should('be.disabled');
  // })

  // it('click on Challenge Dropdown "Select Difficulty" by Default', () => {
  //   const dropdown = cy.get('#react-select-4-placeholder').contains('Select Difficulty');
  //   dropdown.click({force: true});
  // })

  // it('click on "Easy" dropdown option', () => {
  //   const dropdown_option = cy.get("#react-select-4-listbox").contains('Easy');
  //   dropdown_option.trigger("onChange").click();
  // })

  // it('test that skip button is enabled', () => {
  //   cy.get('svg').get('.sc-cabOPr kHQtFW').should('not.be.disabled');
  // })

  // it('click skip button', () => {
  //   cy.get('svg').get('.sc-cabOPr kHQtFW').click();
  // })
});

describe('Get Challenge Hints Test', () => {
  it('Open Webpage', () => {
    cy.visit('https://transcendent-tarsier-75164d.netlify.app/');
  })

  it('click on "Compile and Execute" button', () => {
    const compile_button = cy.findByText(/compile and execute/i);
    compile_button.click();
  })

  it('Check existance of output in window', () => {
    const output_window = cy.findByText(/output/i).next();
    output_window.should('have.text', 'ée');
  })
});