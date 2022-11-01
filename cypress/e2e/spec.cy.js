import '@testing-library/cypress/add-commands'

describe('My First Test', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
    expect(true).not.to.equal(false);
  })
})

describe('Sample E2E Testing', () => {
  it('click on "Compile and Execute" button', () => {
    cy.visit('https://transcendent-tarsier-75164d.netlify.app/')

    const compile_button = cy.findByText(/compile and execute/i);
    compile_button.click();
  })
})

