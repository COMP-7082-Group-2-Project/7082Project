/**
End to End Tests to Validate User Story Accpetance Tests.
 */

import '@testing-library/cypress/add-commands'
import { createGlobalStyle } from 'styled-components';

Cypress.on('uncaught:exception', (err, runnable) => {
  return false;
});

const loading_time = 2500;
const welcome_text = "/*Welcome to EdiCode! This is a code editor that allows you to write, compile, and execute code right in your browser.Start coding by typing in the editor below. You can change the language or theme in the dropdown menus above.You can also start a coding challenge by choosing a difficulty level in the dropdown menu above.Happy coding!*/";

describe('Write Code, Compile and Execute, and See Output Test.', () => {
  it('Open Webpage', () => {
    cy.visit('https://transcendent-tarsier-75164d.netlify.app/');
  })

  it('Write Javascript Console Log ("Hello World!") into Code Editor', () => {
    // Reference: https://stackoverflow.com/questions/56617522/testing-monaco-editor-with-cypress

    cy.findByRole('code')
    .click()
    // change subject to currently focused element
    .focused()
    .type('{ctrl}a')
    .type('{rightArrow}')
    .type('console.log("Hello World!");')
    .type('{enter}')
  })
  
  it('click on "Compile and Execute" button', () => {
    const compile_button = cy.findByText(/compile and execute/i);
    compile_button.click();
  })

  it('Test existance / correctness of output in window (Should be "Hello World!\\n")', () => {
    const output_window = cy.findByText(/output/i).next();
    output_window.should('have.text', 'Hello World!\n');
  })
});

describe('Select Different Programming Language Test', () => {
  it('Open Webpage', () => {
    cy.visit('https://transcendent-tarsier-75164d.netlify.app/')
  })

  it('click on Language Dropdown "Javascript" by Default', () => {
    const dropdown = cy.findByText('JavaScript (Node.js 12.14.0)');
    dropdown.click({force: true});
  })

  it('click on C language dropdown option', () => {
    const dropdown_option = cy.findByText('C (Clang 7.0.1)');
    dropdown_option.trigger("onChange").click();
  })

  it('test C langauge selected', () => {
    const dropdown = cy.findByText('C (Clang 7.0.1)');
    dropdown.should('be.visible');
  })

  it('test correct operationablity by running program', () => {
    cy.findByRole('code')
    .click()
    // change subject to currently focused element
    .focused()
    .type('{ctrl}a')
    .type('{rightArrow}')
    .type('{enter}')
    .type('int main() {')
    .type('{enter}')
    .type('printf("Hello World!");')
    .type('{enter}')
    .type('return 0;')
    .type('{enter}')

    const compile_button = cy.findByText(/compile and execute/i);
    compile_button.click();

    cy.wait(loading_time);

    const output_window = cy.findByText(/output/i).next();
    output_window.should('have.text', 'Hello World!');
  })
}); 

describe('Choose Challenge Difficulty Test', () => {
  let previous_problem = "";
  it('Open Webpage', () => {
    cy.visit('https://transcendent-tarsier-75164d.netlify.app/');
  })

  it('Test that text in code editor before selecting challenge problem to after selecting challenge problem changed', () => {
    cy.wait(loading_time);
    cy.get('.view-lines')
    // cy.get('.view-lines:nth-child(2)')
    .invoke('text')
    .then((text1) => {
      expect(text1).to.eq(welcome_text);
      
      // Click on dropdown
      const dropdown = cy.findByText('Select Difficulty');
      dropdown.click({force: true});
      
      // Click on easy dropdown option
      const dropdown_option = cy.findByText('Easy');
      dropdown_option.trigger("onChange").click();

      // Compare problem text to welcome text
      cy.get('.view-lines')
      .invoke('text')
      .should((text2) => {
        expect(text1).not.to.eq(text2)
      });
    })
  })
});

describe('Change UI Theme Test', () => {
  it('Open Webpage', () => {
    cy.visit('https://transcendent-tarsier-75164d.netlify.app/');
    
  })

  it('click on Theme Dropdown', () => {
    const dropdown = cy.contains('Oceanic');;
    dropdown.click({force: true});
  })

  it('click on "Blackboard" dropdown option', () => {
    const dropdown_option = cy.findByText('Blackboard');
    dropdown_option.trigger("onChange").click();
  })

  it('test Blackboard theme selected', () => {
    cy.wait(loading_time);
    const dropdown = cy.findByText('Blackboard');
    dropdown.should('be.visible');
  })
});

describe('Skip Challenge Problem Test', () => {
  it('Open Webpage', () => {
    cy.visit('https://transcendent-tarsier-75164d.netlify.app/');
  })

  it('switch to an easy challenge problem', () => {
    cy.wait(loading_time);
    cy.get('.view-lines')
    .invoke('text')
    .then((text1) => {
      expect(text1).to.eq(welcome_text);
      
      // Click on dropdown
      const dropdown = cy.get('#react-select-4-placeholder').contains('Select Difficulty');
      dropdown.click({force: true});
      
      // Click on easy dropdown option
      const dropdown_option = cy.get("#react-select-4-listbox").contains('Easy');
      dropdown_option.trigger("onChange").click();

      // Compare problem text to welcome text
      cy.get('.view-lines')
      .invoke('text')
      .should((text2) => {
        expect(text1).not.to.eq(text2)
      });
    })
  })

  it('test that skip button shows a new question', () => {
    let skip_svg_class = "sc-cabOPr";
    
    cy.get('.view-lines')
    .invoke('text')
    .then((text1) => {
      
      // Click skip button
      cy.get("svg." + skip_svg_class).click({force: true});
      cy.wait(loading_time);

      // Compare new problem text to old problem text and assert that it is different
      cy.get('.view-lines')
      .invoke('text')
      .should((text2) => {
        expect(text1).not.to.eq(text2);
      });
    })
  })
});

describe('Get Challenge Example Solutions Test', () => {
  it('Open Webpage', () => {
    cy.visit('https://transcendent-tarsier-75164d.netlify.app/');
  })

  it('switch to an easy challenge problem', () => {
    cy.wait(loading_time);
    cy.get('.view-lines')
    .invoke('text')
    .then((text1) => {
      expect(text1).to.eq(welcome_text);
      
      // Click on dropdown
      const dropdown = cy.get('#react-select-4-placeholder').contains('Select Difficulty');
      dropdown.click({force: true});
      
      // Click on easy dropdown option
      const dropdown_option = cy.get("#react-select-4-listbox").contains('Easy');
      dropdown_option.trigger("onChange").click();

      // Compare problem text to welcome text
      cy.get('.view-lines')
      .invoke('text')
      .should((text2) => {
        expect(text1).not.to.eq(text2)
      });
    })
  })

  it('test that the example soluton button shows at least one example solution', () => {
    let hints_svg_class = "sc-iTFTee";
    let example_solution_tab_class = "sc-ipEyDJ";

    cy.get("svg." + hints_svg_class).click();

    cy.findByRole('dialog').findByText(/Example Solutions/i).next().should('have.class', example_solution_tab_class);
  })
});