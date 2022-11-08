import '@testing-library/cypress/add-commands'

describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
    expect(true).not.to.equal(false);
  })
})

describe('Default Compile and Execute Test', () => {
  it('click on "Compile and Execute" button', () => {
    cy.visit('https://transcendent-tarsier-75164d.netlify.app/')

    const compile_button = cy.findByText(/compile and execute/i);
    compile_button.click();
  })

  it('Check existance of output in window', () => {
    const output_window = cy.findByText(/output/i).next();
    output_window.should('have.text', 'ée');
  })
})

// describe('Write Code, Compile and Execute, and See Output Test.', () => {
//   it('Open Webpage', () => {
//     cy.visit('https://transcendent-tarsier-75164d.netlify.app/')
//   })

//   it('Write Javascript Console Log ("Hello World") into Code Editor', () => {
//     // Reference: https://stackoverflow.com/questions/56617522/testing-monaco-editor-with-cypress

//     cy.get('#editor')
//     .click()
//     // change subject to currently focused element
//     .focused()
//     .type('{ctrl}a')
//     .type('{rightArrow}')
//     .type('console.log("Hello World!");')
//     .type('{enter}')
//   })
  
//   it('click on "Compile and Execute" button', () => {
//     const compile_button = cy.findByText(/compile and execute/i);
//     compile_button.click();
//   })

//   it('Check existance / correctness of output in window', () => {
//     const output_window = cy.findByText(/output/i).next();
//     output_window.should('have.text', 'Hello World!');
//   })
// })