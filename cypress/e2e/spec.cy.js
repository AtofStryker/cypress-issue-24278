describe('E2E: Radio stream & Playouts', () => {
  it('Can play radio station from player', () => {
    Cypress.on('uncaught:exception', (err) => !err.message.includes('ResizeObserver loop'))
    cy.intercept({
      url: 'https://energyzuerich.mp3.energy.ch/energyzuerich-high.mp3?ua=energy+website+desktop',
    }).as('audioStream');

    cy.visit('https://energy.ch');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(5000);

    // Play music
    cy.get('button.flex-shrink-0.w-12.h-12.p-2.cursor-pointer')
      .filter(':visible')
      .click();

    // This makes request hang and never fulfill. Later time-outs after 30s. Why?
    cy.wait('@audioStream').its('response.statusCode').should('eq', 200);

    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
  });
});